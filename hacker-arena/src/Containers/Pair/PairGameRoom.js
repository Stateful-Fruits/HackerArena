import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import fire from '../../Firebase/firebase';

//import CodeEditor from '../../Components/CodeEditor/CodeEditor.js'; //From Simon
//import TestSuite from '../../Components/TestSuite.js'; //From Simon
//import ProgressBar from '../../Components/GameRoom/ProgressBar';
import GameRoomLoading from '../../Components/GameRoom/GameRoomLoading';
import WaitingForPlayer from '../../Components/GameRoom/WaitingForPlayer';
import GameRoomError from '../../Components/GameRoom/GameRoomError';
import WinnerDisplay from '../../Components/GameRoom/WinnerDisplay'

import NavigatorRoom from './NavigatorRoom';
import DriverRoom from './DriverRoom';

import eventHandler from './../EventHandler/eventHandler';

import { calculateResultsByPlayer, calculateMostTotalWins } from './../../Helpers/resultsHelpers';
import { getRoleFromUsername, getPartnerName, getPartnerRole } from './../../Helpers/pairHelpers';

import '../../Styles/GameRoom.css';

class PairGameRoom extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      allowEnter: true
    }
    this.handleLeave = this.handleLeave.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleIncomingEvents = this.handleIncomingEvents.bind(this);
  }
  
  componentDidMount () {
    console.log('pairgameRoom mounted')
    window.addEventListener('beforeunload', this.handleLeave);
    this.handleEnter();
  }

  componentWillUpdate() {
    // see if user is entering the room and if room needs to be updated as a result
    this.handleEnter();

    // processing incoming events from db
    this.handleIncomingEvents()
  }

  componentWillUnmount () {
    this.handleLeave();
    // window.removeEventListener('beforeunload', this.handleLeave);
  }

  handleLeave () {
    // handles leaving the gameroom should only be called when gameRooms 
    // has been retrieved from Firebase, the room exists, and you are a member
    if (this.props.gameRooms 
        && this.props.gameRooms[this.props.roomId] 
        && this.props.gameRooms[this.props.roomId].players
        && this.props.gameRooms[this.props.roomId].players[this.props.username]) {
      let { gameRooms, roomId, username } = this.props;
      let room = gameRooms[roomId];
      let playerNames = Object.keys(room.players);
      // when you're the last player inside, leaving deletes the gameroom
      if (playerNames.length <= 1) {
        fire.database().ref(`/rooms/${roomId}`).remove();
      } else {
        let gameRoom = Object.assign({}, room);
        // otherwise, just remove the user from the players array
        delete gameRoom.players[username];
        // find this user's team and role
        gameRoom.teams = gameRoom.teams.reduce((acc, team) => {
          if (team.navigator === username) return (team.driver ? [...acc, {driver: team.driver}] : acc);
          if (team.driver === username) return (team.navigator ? [...acc, {navigator: team.navigator}] : acc);
          return [...acc, team];
        }, []);
        // see if the game needs to switch to standby
        if (playerNames.length - 1 < gameRoom.playerCapacity 
            && gameRoom.roomStatus !== 'completed') gameRoom.roomStatus = 'standby';
        // don't allow handle enter to run again 
        this.setState({ allowEnter: false });
        fire.database().ref(`/rooms/${roomId}`).set(gameRoom);
      }
    } 
  }

  handleEnter() {
    // handles entering the gameroom: should only be called when gameRooms
    // has been retrieved from Firebase and the room you are in exists 
    // TODO and that game room is open for you to join
    if (this.props.gameRooms && this.props.gameRooms[this.props.roomId] && this.state.allowEnter) {
      let { gameRooms, roomId, username, navigate } = this.props;
      let room = gameRooms[roomId];
      
      // if the players object is undefined (you're creating the room) set it to an empty object
      if (!room.players) room.players = {};
      let players = room.players;      
      let playerNames = Object.keys(players);
      console.log('playernames.length', playerNames.length)
      console.log('room.playerCapacity', room.playerCapacity) 
      // if you're already in the game room, do nothing
      if (playerNames.includes(username)) {
        return;
      } else if (playerNames.length >= room.playerCapacity || (room.roomStatus !== 'standby' && room.roomStatus !== 'completed')) {
        // if the gameRoom is full or closed, redirect the user to spectate the game
        navigate(`/Spectate/${roomId}`);
      } else {
        let gameRoom = Object.assign({}, room);
        // if you're the first one in, start the game timer
        if (playerNames.length === 0) {
          gameRoom.timerStarted = true;
          gameRoom.timeStart = Date.now();
        } else if (playerNames.length + 1 === gameRoom.playerCapacity 
                   && gameRoom.gameStatus !== 'completed') {
            gameRoom.roomStatus = room.roomStatus === 'completed' ? 'completed' : 'playing';
        }
        // add you username to the gameroom
        gameRoom.players[username] = {
          disruptions: [''],
          testStatus: {},
          credits: room.startingCredits || 0,
          liveInput: ''
        };
        // and update the database
        fire.database().ref(`/rooms/${roomId}`).set(gameRoom);
      }
      // TODO if you are the last user joining, change the gameroom status to 'closed'
    }
  }

  handleIncomingEvents() {
    if (this.props.gameRooms && this.props.gameRooms[this.props.roomId]) {
      console.log('this.props in handleevents', this.props);
      let roomId = this.props.roomId;
      let room = this.props.gameRooms[roomId];
      let problems = this.props.problems;      
      let username = fire.auth().currentUser.email.split('@')[0];
      let player = room.players[username];
      let events = player.events;
      if (events !== '' && room.roomStatus === 'playing') {
        fire.database().ref(`rooms/${roomId}/players/${username}/events`).set('')
        .then(() => {
          // NOTE THAT IF THERE ARE MULTIPLE EVENTS
          // I ASSUME THEY WILL NOT CURRENTLY 'SEE' EACH OTHER'S RESULTS IN THE DB (under this implementation)
          if (events) {
            events.forEach(event => {
              eventHandler[event.eventName](room, roomId, username, event.value, problems);
            })
          }
        })
      }
    }
  }

  
  render () {
    // show loading screen while waiting for gameRooms from Firebase (no obj or empty obj)
    // TODO if there are no game rooms, this message will always show until one is created
    // after retrieving gamerooms from firebase, if this room is not in that obj, let the user know

    if (this.props.gameRooms 
        && Object.keys(this.props.gameRooms).length 
        && !this.props.gameRooms[this.props.roomId]) return (<GameRoomError errorMessage="This Game Room No Longer Exists!" />);
    // If we have retrieved gameRooms from firebase and our room exists
    if (!this.props.gameRooms 
        || !Object.keys(this.props.gameRooms).length 
        || !this.props.gameRooms[this.props.roomId]
        || !this.props.gameRooms[this.props.roomId].players
        || !this.props.gameRooms[this.props.roomId].players[this.props.username]) return (<GameRoomLoading />);

    let { gameRooms, roomId } = this.props;
    let room = gameRooms[roomId];
    let roomStatus = room.roomStatus;
    console.log('roomStatus is currently', roomStatus);
    let results = room.results;
    let resultsByPlayer = results ? calculateResultsByPlayer(results) : null;
    let mostTotalWins = results ? calculateMostTotalWins(resultsByPlayer) : null;
    let champions = mostTotalWins ? mostTotalWins.winners : null;
    let isPairRoom = room.isPairRoom;

    let username = this.props.username;

    let role = getRoleFromUsername(room, username);
    let partnerName = getPartnerName(room, username);
    let partnerRole = getPartnerRole(room, username);
    let teams = room.teams;

    let navigatorRoom = <NavigatorRoom
      roomId={roomId}
      room={room}
      username={username} 
      partnerName ={partnerName}
      partnerRole={partnerRole}
    />

    let driverRoom = <DriverRoom
      roomId={roomId}
      room={room}
      username={username} 
      partnerName ={partnerName}
      partnerRole={partnerRole}
    />

    if (roomStatus === 'standby' || roomStatus === 'intermission') {
      return (
        <div className="completeWaiting">
          <WaitingForPlayer
            roomId={roomId}
            room={room}
            username={username} 
            partnerName ={partnerName}
            partnerRole={partnerRole}
            teams={teams}
          />
        </div>
      );
    } else if (roomStatus === 'completed') {
      return (<WinnerDisplay champions={champions} resultsByPlayer={resultsByPlayer} isPairRoom={isPairRoom} />)
    } else if (roomStatus === 'playing') {
      if (role === 'navigator') {
        return navigatorRoom;
      } else if (role === 'driver') {
        return driverRoom;
      } else {
        return <div>Error - role does not seem to be navigator or driver. Fatal error.</div>
      }
    } else {
      return (
        <div>
          THIS ROOM HAS NO STATUS?
        </div>
      )
    } 
  }
}

const mapStateToProps = (state) => ({
  roomId: state.router.location.pathname.split('/')[3],
  username: fire.auth().currentUser.email.split('@')[0],
  gameRooms: state.gameRooms,
  problems: state.problems
});

const mapDispatcherToProps = (dispatch) => ({
  navigate: (route) => dispatch(push(route))
});

export default connect(mapStateToProps, mapDispatcherToProps)(PairGameRoom);