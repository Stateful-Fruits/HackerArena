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
import GameRoomError from '../Components/GameRoom/GameRoomError';

import '../Styles/GameRoom.css';

class GameRoom extends React.Component {
  constructor (props) {
    super (props);
    this.handleLeave = this.handleLeave.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }
  
  componentDidMount () {
    if (this.props.room) window.addEventListener('beforeunload', this.handleLeave);
    this.handleEnter();
  }

  // componentWillUpdate() {
  //   this.handleEnter();
  // }

  componentWillUnmount () {
    if (this.props.room) this.handleLeave();
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
    } else if (gameRoom.players === 1 || username === gameRoom.creatorName) {
      console.log(`room ${gameRoom.key} about to be destroyed`);
      fire.database().ref('rooms/' + gameRoom.key).remove();
    }
  }

  handleEnter() {
    if (this.props.room) {
      var gameRoom = Object.assign({}, this.props.room);
      if (gameRoom.players === 2 
        && gameRoom.creatorName !== this.props.username 
        && gameRoom.creatorName !== this.props.challengerName 
        && gameRoom.challengerName !== this.props.username) this.props.navigate(`/Spectate/${this.props.id}`);
      else if (!(gameRoom.players === 2)) {
        let creatorName = gameRoom.creatorName;
        let challengerName = gameRoom.challengerName;
        let username = this.props.username;
        if (gameRoom.creatorName === '') {
          gameRoom.creatorName = username;
          gameRoom.players++;
          fire.database().ref('rooms/' + gameRoom.key).set(gameRoom);
        } else if (creatorName.length > 0 
          && creatorName !==  username
          && challengerName.length === 0) {
          gameRoom.challengerName = username;
          gameRoom.players++;
          fire.database().ref('rooms/' + gameRoom.key).set(gameRoom);
        }
      }
    }
  } 
  
  render () {
    let { room, gameRooms } = this.props;
    if (Object.keys(gameRooms).length === 0 && !room) return (<GameRoomLoading />);
    if (!room) return (<GameRoomError errorMessage="This Game Room No Longer Exists!" />);
    this.handleEnter();
    let players = room.players || 1;
    let isRoomFull = players === 2;
    console.log('current gameroom: ', room);
    return (
      <div>
        <div className="completeWaiting" >{isRoomFull ? 'COMPLETE' : <WaitingForPlayer />}</div>
          {isRoomFull ? <ProgressBar room={ room }/> : null}
        <div id="editorAndTestSuite">
          {isRoomFull ? <CodeEditor currentRoom={room}/> : null}
          {isRoomFull ? <TestSuite currentRoom={room}/> : null}
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  id: state.router.location.pathname.split('/')[2],
  room: state.gameRooms[state.router.location.pathname.split('/')[2]],
  username: fire.auth().currentUser.email.split('@')[0],
  gameRooms: state.gameRooms
});

const mapDispatcherToProps = (dispatch) => ({
  updateSpecificRoom: (room) => dispatch(updateSpecificRoom(room)),
  navigate: (route) => dispatch(push(route))
});

export default connect(mapStateToProps, mapDispatcherToProps)(GameRoom);