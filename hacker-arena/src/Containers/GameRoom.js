import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import swal from 'sweetalert2';

import fire from '../Firebase/firebase';
import updateSpecificRoom from '../Actions/updateSpecificRoom';

import CodeEditor from './CodeEditor.js'; //From Simon
import TestSuite from '../Components/TestSuite.js'; //From Simon
import ProgressBar from '../Components/GameRoom/ProgressBar';
import GameRoomLoading from '../Components/GameRoom/GameRoomLoading';
import WaitingForPlayer from '../Components/GameRoom/WaitingForPlayer';

import '../Styles/GameRoom.css';

class GameRoom extends React.Component {
  constructor (props) {
    super (props);
    this.handleLeave = this.handleLeave.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  componentWillReceiveProps() {
    if (this.props.room) this.handleEnter();
  }

  componentDidMount () {
    if (this.props.room) window.addEventListener('beforeunload', this.handleLeave);
  }

  componentWillUnmount () {
<<<<<<< HEAD
    if (this.props.room) this.handleLeave();
=======
    this.handleLeave();
>>>>>>> changes
  }

  handleLeave () {
    var gameRoom = Object.assign({}, this.props.room);
    let username = this.props.username;
    if (gameRoom.players === 2) {
      if (gameRoom.challengerName === username) {
        gameRoom.challengerName = '';
        gameRoom.players--;
        console.log('challenger left', gameRoom.players);
        fire.database().ref('rooms/' + gameRoom.key).set(gameRoom);
      } else if (gameRoom.creatorName === username) {
        gameRoom.creatorName = '';
        gameRoom.players--;
        console.log('creator left', gameRoom.players);
        fire.database().ref('rooms/' + gameRoom.key).set(gameRoom);
      }
    } else if (gameRoom.players === 1) {
      console.log(`room ${gameRoom.key} about to be destroyed`);
      fire.database().ref('rooms/' + gameRoom.key).remove();
    }
  }

  handleEnter() {
    // fire.database().ref('rooms/' + this.props.Key).once('value').then(snapshot => {
    //   let gameRoom = snapshot.val();
    //   gameRoom.key = this.props.Key;
    //   console.log('snapshot of gameroom ',gameRoom, this.props.Key);
    // });
    var gameRoom = Object.assign({}, this.props.room);
    if (gameRoom.players === 2) this.props.navigate(`/Spectate/${this.props.id}`);
    else {
      let creatorName = gameRoom.creatorName;
      let challengerName = gameRoom.challengerName;
      let username = this.props.username;
      if (gameRoom.creatorName === '') {
        gameRoom.creatorName = username;
        gameRoom.players++;
        fire.database().ref('rooms/' + gameRoom.key).set(gameRoom);
        this.props.updateSpecificRoom(gameRoom);
      } else if (creatorName.length > 0 
        && creatorName !==  username
        && challengerName.length === 0) {
        gameRoom.challengerName = username;
        gameRoom.players++;
        fire.database().ref('rooms/' + gameRoom.key).set(gameRoom);
        this.props.updateSpecificRoom(gameRoom);
      } else {
        this.props.updateSpecificRoom(gameRoom);
      } 
    }
  } 
  
  render () {
    let { room } = this.props;
    if (!room) return (<GameRoomLoading />);
    let players = room.players || 1;
    let isRoomFull = players === 2;
    return (
      <div>
        <div>{isRoomFull ? 'COMPLETE' : <WaitingForPlayer />}</div>
        {isRoomFull ? <ProgressBar room={ room }/> : null}
        <div id="editorAndTestSuite">
        {isRoomFull ? <CodeEditor currentRoom={room}/> : null}
        {isRoomFull ? <TestSuite currentRoom={room}/> : null}
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  console.log(`state passed to GameRoom: `, state, fire.auth().currentUser);
  let id = state.router.location.pathname.split('/')[2];
  let room = state.gameRooms[id];
  let username = fire.auth().currentUser.email.split('@')[0];
  console.log('state is',state);
  console.log('Room ', room);
  return {room, username};
};

const mapDispatcherToProps = (dispatch) => {
  return {
    updateSpecificRoom: (room) => dispatch(updateSpecificRoom(room)),
    navigate: (route) => dispatch(push(route))
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(GameRoom);