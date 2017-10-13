import React from 'react';
import { connect } from 'react-redux';
import CodeEditor from './CodeEditor.js'; //From Simon
import TestSuite from '../Components/TestSuite.js'; //From Simon

import '../Styles/GameRoom.css';

class GameRoom extends React.Component {
  render () {
    var props = this.props;
    var message, editor, testSuite, testpassed;
    var players = this.props.players || 1;
    // if (players === 2) {
    if (true) {
      message = 'COMPETE';
      editor = <CodeEditor/>;
      testSuite = <TestSuite/>;
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
  console.log(`
    state passed to GameRoom: `, state);
  let current = state.currentRoom;
  return ({
  challengerName: current.challengerName,
  challengerTestsPassed: current.challengerTestsPassed,
  creatorName: current.creatorName,
  creatorTestsPassed: current.creatorTestsPassed,
  gameStarted: current.gameStarted,
  players: current.players,
  problemID: current.problemID,
  spectators: current.spectators
});
};
export default connect(mapStateToProps)(GameRoom);