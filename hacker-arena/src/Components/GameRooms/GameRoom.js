import React from 'react';
import CodeEditor from '../CodeEditor';
import Submit from '../Submit.js';

const GameRoom = () => {
  if (this.props.players === 2) {
    var message = 'COMPETE';
  }
  return <div>
    <div>{message}</div>
    <CodeEditor/>
    <Submit/>
  </div>
}

export default GameRoom;