import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import updatePendingEvents from '../../Actions/updatePendingEvents';

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
import { getRoleFromUsername, getTeamIndex, getPartnerName, getPartnerRole } from './../../Helpers/pairHelpers';

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
    this.addPendingEvent = this.addPendingEvent.bind(this);
    this.removePendingEvent = this.removePendingEvent.bind(this);
  }
  
  // ~~~~~~~~~~~ LIFECYCLE FUNCTIONS ~~~~~~~~~~ //

  componentDidMount () {
    console.log('pairgameRoom mounted')
    window.addEventListener('beforeunload', this.handleLeave);
    this.handleEnter();
  }

  componentWillUpdate() {
    let navigate = this.props.navigate;
    // if (this.props.username 
    //   && this.props.gameRooms
    //   && this.props.gameRooms[this.props.roomId]
    //   && this.props.gameRooms[this.props.roomId].roomStatus === 'standby'
    //   && !getRoleFromUsername(this.props.gameRooms[this.props.roomId], this.props.username)) {
    //     navigate(`/Pair`);
    //     window.swal('You can join this room, but please choose a role from the preview page first!');
    // } else {
      // see if user is entering the room and if room needs to be updated as a result
      this.handleEnter();
    
      // processing incoming events from db
      this.handleIncomingEvents()
   // }

  }

  componentWillUnmount () {
    this.handleLeave();
    // window.removeEventListener('beforeunload', this.handleLeave);
  }

  // ~~~~~~~~~~~ LIFECYCLE HELPERS ~~~~~~~~~~ //

  handleLeave () {
    console.log('handleleave')
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
        let userRole = getRoleFromUsername(room, username);
        let userTeam = getTeamIndex(room, username);

        // add to a historical record in case they try to come back quickly
        gameRoom.recentTeams = gameRoom.teams.slice().map(team => Object.assign({}, team));
        gameRoom.departedPlayers = gameRoom.departedPlayers || {}
        
        gameRoom.departedPlayers[username] = gameRoom.players[username];
        
        // otherwise, just remove the user from the players array
        delete gameRoom.players[username];
        // find this user's team and role
        gameRoom.teams[userTeam][userRole] = null;
        // see if the game needs to switch to standby
        if (playerNames.length - 1 < gameRoom.playerCapacity && gameRoom.roomStatus !== 'completed') {
          gameRoom.roomStatus = 'standby'; 
        }
        // don't allow handle enter to run again 
        fire.database().ref(`/rooms/${roomId}`).set(gameRoom);
        this.setState({ allowEnter: false });
      }
    } 
  }

  handleEnter() {
    console.log('handleenter')
    // handles entering the gameroom: should only be called when gameRooms
    // has been retrieved from Firebase and the room you are in exists 
    // TODO and that game room is open for you to join
    if (this.props.gameRooms && this.props.gameRooms[this.props.roomId] && this.state.allowEnter) {
      console.log('handleenter allowed')      
      let { gameRooms, roomId, username, navigate, currentUser } = this.props;
      let room = gameRooms[roomId];

      let recentRoom = {teams: room.recentTeams}
      
      // if the players object is undefined (you're creating the room) set it to an empty object
      if (!room.players) room.players = {};
      let players = room.players;      
      let playerNames = Object.keys(players);

      // if you're already in the game room, do nothing
      if (playerNames.includes(username)) {
        return;
      } else if (playerNames.length >= room.playerCapacity || room.roomStatus !== 'standby') {
        // if the gameRoom is full or closed, or if the player has not selected a role on the preview component redirect the user to spectate the game
        navigate(`/Spectate/${roomId}`);
      } else if (!getRoleFromUsername(room, username) && getRoleFromUsername(recentRoom, username)) {
        console.log('putting player right back in where they left')
        // if the player just left, restore their old situation
        room.players[username] = room.departedPlayers[username];
        let oldTeam = getTeamIndex(recentRoom, username)
        let oldRole = getRoleFromUsername(recentRoom, username)
        room.teams[oldTeam] = room.teams[oldTeam] || {};
        room.teams[oldTeam][oldRole] = username;

        if (playerNames.length + 1 === room.playerCapacity 
          && room.gameStatus !== 'completed') {
          room.roomStatus = room.roomStatus === 'completed' ? 'completed' : 'playing';
        }

        fire.database().ref(`/rooms/${roomId}/players/${username}`).set(room.players[username])
        .then(() => {
          console.log('re-added user, about the add the other stuff to the room');
          return fire.database().ref(`/rooms/${roomId}`).set(room)
        })
        .then(() => console.log('wooo! re-set gameroom'))
        .catch(err => console.log(err));
      } else if (!getRoleFromUsername(room, username)) {
        // player does not have a role but did not just leave
        navigate(`/Pair`);
        window.swal('You can join this room, but please choose a role from the preview page first!');
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

        // to make writing database rules easier
        gameRoom[currentUser.uid] = true;        

        // add you username to the gameroom
        gameRoom.players[username] = {
          disruptions: [''],
          testStatus: {},
          credits: room.startingCredits || 0,
          liveInput: '',
          uid: currentUser.uid
        };
        // and update the database
        fire.database().ref(`/rooms/${roomId}/${currentUser.uid}`).set(true)
        .then(() => {
          console.log('added user, about the add the other stuff to the room');
          return fire.database().ref(`/rooms/${roomId}`).set(gameRoom)
        })
        .then(() => console.log('wooo! set gameroom'))
        .catch(err => console.log(err));
      }
      // TODO if you are the last user joining, change the gameroom status to 'closed'
    }
  }

  handleIncomingEvents() {
    if (this.props.gameRooms && this.props.gameRooms[this.props.roomId]) {
      let roomId = this.props.roomId;
      let room = this.props.gameRooms[roomId];
      let problems = this.props.problems;      
      let username = this.props.currentUser ? this.props.currentUser.username : null;
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

  // ~~~~~~~~~~~ REDUX HELPERS ~~~~~~~~~~ //

  addPendingEvent(eventName, codeToClear, otherIdentifiers) {
    let { pendingEvents } = this.props;
    const { updatePendingEvents } = this.props;

    let event = {
      eventName,
      codeToClear,
    }

    otherIdentifiers ? event.otherIdentifiers = otherIdentifiers : null;

    pendingEvents = pendingEvents.slice()
    
    pendingEvents.push(event);

    updatePendingEvents(pendingEvents);
  }

  removePendingEvent(eventName, shouldClearTimeout, otherIdentifiers) {
    let { pendingEvents } = this.props;
    const { updatePendingEvents } = this.props;
    let indOfEventToClear = pendingEvents.findIndex(event => {
      if (otherIdentifiers) {
        return Object.keys(otherIdentifiers).every(key => event[key] === otherIdentifiers[key]);
      } else {
        return event.eventName === eventName;
      }
    });

    if (indOfEventToClear >= 0) {
      let eventToClear = pendingEvents.splice(indOfEventToClear, 1)[0];

      updatePendingEvents(pendingEvents);
      
      if (shouldClearTimeout) {
        let codeToClear = eventToClear.codeToClear;
        clearTimeout(codeToClear);
        return true;
      }
    }

    return false;
  }

  // ~~~~~~~~~~~ RENDER ~~~~~~~~~~ //
  
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

    let { gameRooms, roomId, currentUser } = this.props;
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
      addPendingEvent={this.addPendingEvent}
      removePendingEvent={this.removePendingEvent}
      currentUser={currentUser}
    />

    let driverRoom = <DriverRoom
      roomId={roomId}
      room={room}
      username={username} 
      partnerName ={partnerName}
      partnerRole={partnerRole}
      addPendingEvent={this.addPendingEvent}
      removePendingEvent={this.removePendingEvent}
      currentUser={currentUser}
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
            currentUser={currentUser}
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
  gameRooms: state.gameRooms,
  problems: state.problems,
  pendingEvents: state.pendingEvents,
  currentUser: state.currentUser
});

const mapDispatcherToProps = (dispatch) => ({
  navigate: (route) => dispatch(push(route)),
  updatePendingEvents: (events) => dispatch(updatePendingEvents(events))
});

export default connect(mapStateToProps, mapDispatcherToProps)(PairGameRoom);