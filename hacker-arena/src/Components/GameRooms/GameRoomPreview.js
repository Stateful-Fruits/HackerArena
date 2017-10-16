import React from 'react';

const GameRoomPreview = ({ 
  dispatch, 
  gameRoom, 
  navigate
}) => {
  let { spectators, creatorName, challengerName } = gameRoom;
  return (
    <div className='list-group-item' style={{ color: 'black' }}>
      <h4>Host: { creatorName || (<span style={{color: 'darkgreen'}}>OPEN</span>) }</h4>
      <h4>Opponent: { challengerName || (<span style={{color: 'darkgreen'}}>OPEN</span>) }</h4>
      <div>
        Spectators: {(spectators ? spectators.join(', ') : '')}
      </div>
      <button onClick={ () => navigate(`/GameRoom/${gameRoom.key}`) }>
        <h3>Join Game</h3> 
      </button>
      <button onClick={ () => navigate(`/Spectate/${gameRoom.key}`) }>
        <h3>Spectate Game  <span className="badge badge-default badge-pill">{spectators ? spectators.length : 0}</span>
        </h3>
      </button>
    </div>
  );
};

export default GameRoomPreview;