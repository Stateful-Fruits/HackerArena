import React from 'react';
import { connect } from 'react-redux';
import CodeEditor from './CodeEditor.js'; //From Simon
import TestSuite from '../Components/TestSuite.js'; //From Simon
//import updateCurrentGameRoom from '../Actions/updateCurrentGameRoom';
import updateSpecificRoom from '../Actions/updateSpecificRoom';
import fire from '../Firebase/firebase';
import swal from 'sweetalert2';
import '../Styles/GameRoom.css';

import '../Styles/GameRoom.css';

class GameRoom extends React.Component {
  componentWillMount () {
    // fire.database().ref('rooms/' + this.props.Key).once('value').then(snapshot => {
    //   let gameRoom = snapshot.val();
    //   gameRoom.key = this.props.Key;
    //   console.log('snapshot of gameroom ',gameRoom, this.props.Key);
    
    // });
    var gameRoom = Object.assign({}, this.props.room);
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

  componentWillUnmount () {
    var gameRoom = Object.assign({}, this.props.room);
    let username = this.props.username;
    if (gameRoom.players === 2) {
      if (gameRoom.challengerName === username) {
        console.log('challenger left');
        gameRoom.challengerName = '';
        gameRoom.players--;
        fire.database().ref('rooms/' + gameRoom.key).set(gameRoom);
      } else if (gameRoom.creatorName === username) {
        console.log('creator left');
        gameRoom.creatorName = '';
        gameRoom.players--;
        fire.database().ref('rooms/' + gameRoom.key).set(gameRoom);
      }
    } else if (gameRoom.players === 1) {
      console.log(`room ${gameRoom.key} about to be destroyed`);
      fire.database().ref('rooms/' + gameRoom.key).remove();
    }
  }

  
  render () {
    let props = this.props;
    console.log(this.props);
    let message, editor, testSuite, testpassed;
    let players = this.props.room.players || 1;
    if (players === 2) {
      message = 'COMPETE';
      editor = <CodeEditor currentRoom={props.room}/>;
      testSuite = <TestSuite currentRoom={props.room}/>; //creatorTestStatus challengerTestStatus problem
      testpassed = (
        <div>
          <div>Challenger: {props.room.challengerName} | Passed: {props.challengerTestPassed}</div>
          <div>Creator: {props.room.creatorName} | Passed: {props.creatorTestPassed}</div>
        </div>
      )
    } else {
      message = 'Waiting for one more player';
      editor = null;
      testSuite = null;
      testpassed = null;
    }

    return <div>
      <div>{message}</div>
      {testpassed}
      <div id="editorAndTestSuite">
      {editor}
      {testSuite}
      </div>
    </div>
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
    updateSpecificRoom: (room) => {dispatch(updateSpecificRoom(room))}
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(GameRoom);