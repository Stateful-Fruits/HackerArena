import React from 'react';
import { connect } from 'react-redux';
import CodeEditor from './CodeEditor.js'; //From Simon
import TestSuite from '../Components/TestSuite.js'; //From Simon
import updateCurrentGameRoom from '../Actions/updateCurrentGameRoom';
import fire from '../Firebase/firebase';

import '../Styles/GameRoom.css';

import '../Styles/GameRoom.css';

class GameRoom extends React.Component {
  componentWillMount () {
    fire.database().ref('rooms/' + this.props.Key).once('value').then(snapshot => {
      let gameRoom = snapshot.val();
      gameRoom.key = this.props.Key;
      console.log('snapshot of gameroom ',gameRoom, this.props.Key);
      if (gameRoom.creatorName === '') {
        gameRoom.creatorName = 'kai brown zsy';
        gameRoom.players++;
        fire.database().ref('rooms/' + this.props.Key).set(gameRoom);
        this.props.updateCurrentGameRoom(gameRoom);
      } else if (gameRoom.creatorName.length > 0 && gameRoom.challengerName.length === 0) {
        gameRoom.challengerName = 'colin zheng';
        gameRoom.players++;
        fire.database().ref('rooms/' + this.props.Key).set(gameRoom);
        this.props.updateCurrentGameRoom(gameRoom);
      } else {
        this.props.updateCurrentGameRoom(gameRoom);
      }
    });
  } 

  render () {
    let props = this.props;
    console.log(this.props);
    let message, editor, testSuite, testpassed;
    let players = this.props.players || 1;
    if (players === 2) {
      message = 'COMPETE';
      editor = <CodeEditor currentRoom={props}/>;
      testSuite = <TestSuite currentRoom={props}/>; //creatorTestStatus challengerTestStatus problem
      testpassed = (
        <div>
          <div>Challenger {props.challengerName} Passed {props.challengerTestPassed}</div>
          <div>Creator {props.creatorName} Passed {props.creatorTestPassed}</div>
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
  console.log(`state passed to GameRoom: `, state);
  let id = state.router.location.pathname.split('/')[2];
  let newRoom = Object.assign(state.currentRoom, {Key: id});
  console.log('newRoom ', newRoom);
  return newRoom;
};

const mapDispatcherToProps = (dispatch) => {
  return {
    updateCurrentGameRoom: (room) => {dispatch(updateCurrentGameRoom(room))},
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(GameRoom);