import React from 'react';

const GameRoomPreview = ({ 
  dispatch, 
  gameRoom, 
  navigateToAbout, 
  navigateToGameRoom 
}) => (
  <div>
    <h4>Host: { gameRoom.creatorName }</h4>
    <div>
      Spectators: { gameRoom.spectators }
    </div>
    <button onClick={ navigateToGameRoom }>
      <h3>Join Game</h3>
    </button>
  </div>
);

export default GameRoomPreview;