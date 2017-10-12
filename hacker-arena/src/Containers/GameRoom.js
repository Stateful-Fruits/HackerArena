import React from 'react';
import { connect } from 'react-redux';
import CodeEditor from '../CodeEditor'; //From Simon
import Submit from '../Submit.js'; //From Simon

class GameRoom extends React.Component {
  render () {
    var props = this.props;
    var message, editor, submit, testpassed;
    var players = this.props.players || 1;
    if (players === 2) {
      message = 'COMPETE';
      editor = <CodeEditor/>;
      submit = <Submit/>;
      testpassed = (
        <div>
          <div>Challenger {props.challengerName} Passed {props.challengerTestPassed}</div>
          <div>Creator {props.creatorName} Passed {props.creatorTestPassed}</div>
        </div>
      )
    } else {
      message = 'Waiting for one more player';
      editor = null;
      submit = null;
      testpassed = null;
    }

    return <div>
      <div>{message}</div>
      {testpassed}
      {editor}
      {submit}
    </div>
  }
}
const mapStateToProps = (state) => ({
  challengerName: state.gameRoom.challengerName,
  challengerTestsPassed: state.gameRoom.challengerTestsPassed,
  creatorName: state.gameRoom.creatorName,
  creatorTestsPassed: state.gameRoom.creatorTestsPassed,
  gameStarted: state.gameRoom.gameStarted,
  players: state.gameRoom.players,
  problemID: state.gameRoom.problemID,
  spectators: state.gameRoom.spectators
})

export default connect(mapStateToProps)(GameRoom);