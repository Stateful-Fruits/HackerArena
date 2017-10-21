import React from 'react';

const GameRoomPreview = ({ 
  dispatch, 
  gameRoom, 
  navigate
}) => {
  let { spectators, playerCapacity } = gameRoom;
  let players = gameRoom.players || {};
  let playerNames = Object.keys(players);
  let playerSpans = [];
  for (let i = 0; i < playerCapacity; i++) {
    playerSpans.push(
      <li className='list-group-item' key={(playerNames[i] || "OPEN") + i}>
        <h4>
          Player {i} -> { playerNames[i] ? playerNames[i] : <span style={{color: 'darkgreen'}}>OPEN</span> }
        </h4>
      </li>);
  }
  return (
    <div className='list-group-item' style={{ color: 'black', border: '3px solid #222', margin: '1%', marginLeft: '20%', marginRight: '20%'}}>
      <ul className='list-group'>
        { playerSpans }
      </ul>
      <div>
        Spectators: {(spectators ? spectators.filter((spectatorName, i) => spectators.indexOf(spectatorName) === i).join(', ') : '')}
      </div>
      <button onClick={ () => navigate(`GameRoom/${gameRoom.key}`) } disabled={playerCapacity === playerNames.length}>
        <h3>Join Game</h3> 
      </button>
      <button onClick={ () => navigate(`Spectate/${gameRoom.key}`) }>
        <h3>Spectate Game  <span className="badge badge-default badge-pill">{spectators ? spectators.length : 0}</span>
        </h3>
      </button>
    </div>
  );
};

export default GameRoomPreview;