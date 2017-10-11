import React from 'react';
import { connect } from 'react-redux';
import CodeEditor from '../CodeEditor'; //From Simon
import Submit from '../Submit.js'; //From Simon

const GameRoom = (props) => {

  var message, editor, submit, testpassed;
  var players = props.players || 1;
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

const mapStateToProps = (state) => ({
  players: state.gameRoom.players,
  challengerTestPassed: state.gameRoom.challengerTestPassed,
  challengerName: state.gameRoom.challengerName,
  creatorTestPassed: state.gameRoom.creatorTestPassed,
  creatorName: state.gameRoom.creatorName
  
});

export default connect(mapStateToProps)(GameRoom);