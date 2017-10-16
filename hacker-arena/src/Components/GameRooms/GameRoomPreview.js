import React from 'react';

const GameRoomPreview = ({ 
  dispatch, 
  gameRoom, 
  navigate
}) => (
  <div>
    <h4>Host: { gameRoom.creatorName }</h4>
    <div>
      Spectators: { gameRoom.spectators }
    </div>
    <button onClick={ () => navigate(`/GameRoom/${gameRoom.key}`) }>
      <h3>Join Game</h3> 
    </button>
    <button onClick={ () => navigate(`/Spectate/${gameRoom.key}`) }>
      <h3>Spectate Game</h3>
    </button>
  </div>
);

export default GameRoomPreview;