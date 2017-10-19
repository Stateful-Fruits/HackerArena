import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import fire from '../Firebase/firebase';

import CodeEditor from '../Components/CodeEditor/CodeEditor.js'; //From Simon
import TestSuite from '../Components/TestSuite.js'; //From Simon
//import ProgressBar from '../Components/GameRoom/ProgressBar';
import GameRoomLoading from '../Components/GameRoom/GameRoomLoading';
import WaitingForPlayer from '../Components/GameRoom/WaitingForPlayer';
import GameRoomError from '../Components/GameRoom/GameRoomError';

import '../Styles/GameRoom.css';

class GameRoom extends React.Component {
  constructor (props) {
    super (props);
    this.handleLeave = this.handleLeave.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }
  
  componentDidMount () {
    window.addEventListener('beforeunload', this.handleLeave);
    this.handleEnter();
  }

  componentWillUpdate() {
    this.handleEnter();
  }

  componentWillUnmount () {
    this.handleLeave();
  }

  handleLeave () {
    // handles leaving the gameroom should only be called when gameRooms 
    // has been retrieved from Firebase, the room exists, and you are a member
    console.log('props before leave:\n\n', this.props);
    if (this.props && this.props.gameRooms 
        && this.props.gameRooms[this.props.roomId] 
        && this.props.gameRooms[this.props.roomId].players
        && this.props.gameRooms[this.props.roomId].players[this.props.username]) {
      let { gameRooms, roomId, username } = this.props;
      let room = gameRooms[roomId];
      // when you're the last player inside, leaving deletes the gameroom
      if (room.players.length <= 1) {
        fire.database().ref('/rooms/' + roomId).remove();
      } else {
        let gameRoom = Object.assign({}, room);
        // otherwise, just remove the user from the players array
        delete gameRoom.players[username];
        fire.database().ref('/rooms/' + roomId).set(gameRoom);
      }
    } 
  }

  handleEnter() {
    // handles entering the gameroom: should only be called when gameRooms
    // has been retrieved from Firebase and the room you are in exists 
    // TODO and that game room is open for you to join
    if (this.props.gameRooms && this.props.gameRooms[this.props.roomId]) {
      console.log('handleEnter running')
      let { gameRooms, roomId, username, navigate } = this.props;
      let room = gameRooms[roomId];
      // if the players object is undefined (you're creating the room) set it to an empty object
      if (!room.players) room.players = {};
      let players = room.players;      

      let playerNames = Object.keys(players);
      // if you're already in the game room, do nothing
      if (playerNames.includes(username)) {
        console.log('player found in room, this is over')
        return;
      } else if (room.roomStatus !== 'standby') {
        console.log('room is already full, navigating to spectate')
        // if the gameRoom is full or closed, redirect the user to spectate the game
        navigate(`/Spectate/${roomId}`);
      } else {
        console.log('the game room is open and user want to join, add user to room in db')
        let gameRoom = Object.assign({}, room);
        // if you're the first one in, start the game timer
        if (playerNames.length === 0) {
          gameRoom.timerStarted = true;
          gameRoom.timeStart = performance.now();
        } else if (playerNames.length + 1 === gameRoom.playerCapacity) {
          console.log('about to update roomStatus!!')
          gameRoom.roomStatus = 'playing';
        }
        // add you username to the gameroom
        gameRoom.players[username] = {
          disruptions: [''],
          testStatus: {},
          credits: 0,
          liveInput: ''
        };
        // and update the database
        console.log('gameroom before database', gameRoom);
        fire.database().ref('/rooms/' + roomId).set(gameRoom);
      }
      // TODO if you are the last user joining, change the gameroom status to 'closed'
    }
  } 
  
  render () {
    console.log('props: \n', this.props);
    // show loading screen while waiting for gameRooms from Firebase (no obj or empty obj)
    // TODO if there are no game rooms, this message will always show until one is created
    if (!this.props.gameRooms 
        || !Object.keys(this.props.gameRooms).length 
        || !this.props.gameRooms[this.props.roomId].players
        || !this.props.gameRooms[this.props.roomId].players[this.props.username]) return (<GameRoomLoading />);
    // after retrieving gamerooms from firebase, if this room is not in that obj, let the user know
    if (!this.props.gameRooms[this.props.roomId]) return (<GameRoomError errorMessage="This Game Room No Longer Exists!" />);
    // We have retrieved gameRooms from firebase and our room exists
    let { gameRooms, roomId } = this.props;
    let room = gameRooms[roomId];
    let { roomStatus, winner } = room;
    if (roomStatus === 'standby' || roomStatus === 'intermission') return (<div className="completeWaiting" ><WaitingForPlayer /></div>);
    else if (roomStatus === 'playing') {
      return (
        <div>
            {/* <ProgressBar room={ room }/> */}
          <div id="editorAndTestSuite">
            <CodeEditor currentRoom={room}/>
            {/* <TestSuite currentRoom={ room }/> */}
          </div>
        </div>
      );
    } else if (roomStatus === 'completed') {
      return (
        <div>
          The winner is {winner}!
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  roomId: state.router.location.pathname.split('/')[2],
  username: fire.auth().currentUser.email.split('@')[0],
  gameRooms: state.gameRooms
});

const mapDispatcherToProps = (dispatch) => ({
  navigate: (route) => dispatch(push(route))
});

export default connect(mapStateToProps, mapDispatcherToProps)(GameRoom);