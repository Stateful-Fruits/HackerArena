import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import fire from '../../Firebase/firebase';
import SoloEditor from './SoloEditor.js'
import TestSuite from '../../Components/TestSuite.js'; //From Simon
import GameRoomLoading from '../../Components/GameRoom/GameRoomLoading';
// import WaitingForPlayer from '../../Components/GameRoom/WaitingForPlayer';
import GameRoomError from '../../Components/GameRoom/GameRoomError';
// import WinnerDisplay from '../../Components/GameRoom/WinnerDisplay';
import eventHandler from './../EventHandler/eventHandler';

import '../../Styles/GameRoom.css';

class SoloRoom extends React.Component {
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
  }

  handleLeave () {
    // handles leaving the gameroom should only be called when gameRooms 
    // has been retrieved from Firebase, the room exists, and you are a member
    if (this.props.gameRooms 
        && this.props.gameRooms[this.props.roomId] 
        && this.props.gameRooms[this.props.roomId].players
        && this.props.gameRooms[this.props.roomId].players[this.props.currentUser.username]) {
      let { gameRooms, roomId, currentUser } = this.props;
      let username = currentUser.username;
      let room = gameRooms[roomId];
      let playerNames = Object.keys(room.players);
      // when you're the last player inside, leaving deletes the gameroom
      if (playerNames.length <= 1) {
        fire.database().ref(`/rooms/${roomId}`).remove();
      } else {
        let gameRoom = Object.assign({}, room);
        // otherwise, just remove the user from the players array
        delete gameRoom.players[username];
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
      let { gameRooms, roomId, currentUser, navigate } = this.props;
      let username = currentUser.username;
      let room = gameRooms[roomId];
      // if the players object is undefined (you're creating the room) set it to an empty object
      if (!room.players) room.players = {};
      let playerNames = Object.keys(room.players);
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
        } else if (playerNames.length + 2 === Number(gameRoom.playerCapacity) && gameRoom.gameStatus !== 'completed') {
            gameRoom.roomStatus = room.roomStatus === 'completed' ? 'completed' : 'playing';
        }

        // to make writing database rules easier
        gameRoom[currentUser.uid] = true;    

        // add you username to the gameroom
        gameRoom.players[username] = {
          disruptions: [''],
          testStatus: {},
          credits: room.startingCredits || 0,
          liveInput: ''
        };
        // and update the database
        fire.database().ref(`/rooms/${roomId}/${currentUser.uid}`).set(true)
        .then(() => {
          return fire.database().ref(`/rooms/${roomId}`).set(gameRoom)
        })
        .then(() => console.log('wooo! set gameroom'))
        .catch(err => console.log(err));
      }
    }
    
  }

  handleIncomingEvents() {
    if (this.props.gameRooms && this.props.gameRooms[this.props.roomId]) {
      let roomId = this.props.roomId;
      let room = this.props.gameRooms[roomId];
      let problems = this.props.problems;
      let username = this.props.currentUser.username;
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
    // after retrieving gamerooms from firebase, if this room is not in that obj, let the user know
    if (this.props.gameRooms 
        && Object.keys(this.props.gameRooms).length 
        && !this.props.gameRooms[this.props.roomId]) return (<GameRoomError errorMessage="This Game Room No Longer Exists!" />);
    // If we haven't retrieved gameRooms from firebase or our room doesn't exist
    if (!this.props.gameRooms[this.props.roomId]
        || !this.props.gameRooms[this.props.roomId].players
        || !this.props.gameRooms[this.props.roomId].players[this.props.currentUser.username]) return (<GameRoomLoading />);
    let { gameRooms, roomId, currentUser } = this.props;
    let room = gameRooms[roomId];
    room.key = roomId;
    let { roomStatus } = room;

    if (roomStatus === 'standby' || roomStatus === 'intermission') {
      return (
        <div>
          <div id="editorAndTestSuite">
            <SoloEditor currentRoom={room} currentUser={currentUser}/>
            <TestSuite currentRoom={room} currentUser={currentUser}/>
          </div>
        </div>
      );
    } 
  }
  
}

const mapStateToProps = (state) => ({
  roomId: state.router.location.pathname.split('/')[3],
  gameRooms: state.gameRooms,
  problems: state.problems,
  currentUser: state.currentUser
});

const mapDispatcherToProps = (dispatch) => ({
  navigate: (route) => dispatch(push(route))
});

export default connect(mapStateToProps, mapDispatcherToProps)(SoloRoom);