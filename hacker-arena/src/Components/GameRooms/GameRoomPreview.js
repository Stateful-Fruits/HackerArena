import React from 'react';

const GameRoomPreview = ({ dispatch, gameRoom, navigateToAbout }) => (
  <div>
    <h4>{ gameRoom.roomName }</h4>
    <span> This is a game room preview!!! </span>
    <button onClick={ navigateToAbout }>
      <h3>Join Game</h3>
    </button>
  </div>
);

export default GameRoomPreview;