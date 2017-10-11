import React from 'react';
import { connect } from 'react-router-redux';

const GameRoomPreview = ({ gameRoom }) => (
  <div>
    <h4>{ gameRoom.roomName }</h4>
    This is a game room preview!!!
    <button>Join Game</button>
  </div>
);

export default GameRoomPreview;