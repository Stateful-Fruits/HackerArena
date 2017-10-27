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
      <li className='list-group-item' style={{ textAlign: 'left'}} key={(playerNames[i] || "OPEN") + i}>
        <h4>
          { playerNames[i] ? <span style={{ fontSize: '1.5em' }}><img alt='player present' style={{ width: '50px', height: '50px' }} src='data:image/png;base64,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'/>
          { '   ' + playerNames[i] }</span> : <span style={{color: 'darkgreen', fontSize: '1.5em'}}><img alt='player not present' style={{ width: '50px', height: '50px' }} src='http://1.bp.blogspot.com/-ztQMI-PgiOQ/Ud8_CPcNn1I/AAAAAAAApE0/sjeNZYuemmg/s1600/Question_mark_(black_on_white).png'/>
          {'   '} OPEN</span> }
        </h4>
      </li>);
  }
  return (
    <div className='list-group-item' style={{ color: 'black', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)', margin: '1%', marginLeft: '20%', marginRight: '20%'}}>
      <ul className='list-group'>
        { playerSpans }
      </ul>
      <button className="btn gamePreviewButton" 
              onClick={ () => navigate(`GameRoom/${gameRoom.key}`) } 
              disabled={playerCapacity === playerNames.length}>
        <h5>Join Game</h5> 
      </button>
      <button className="btn gamePreviewButton" 
              onClick={ () => navigate(`Spectate/${gameRoom.key}`) }>
        <h5>Spectate Game  <span className="badge badge-default badge-pill">{spectators ? spectators.length : 0}</span>
        </h5>
      </button>
    </div>
  );
};

export default GameRoomPreview;

//     <div className='list-group-item' style={{ color: 'black', border: '3px solid #222', margin: '1%', marginLeft: '20%', marginRight: '20%'}}>
//         <div>
//         <ul className='list-group' style={{ width: '100%' }}>
//           { playerSpans }
//         </ul>
//       </div>
//       <div className='btn-group'>
//         <button 
//           className='btn btn-info'
//           onClick={ () => navigate(`GameRoom/${gameRoom.key}`) } 
//           disabled={playerCapacity === playerNames.length}>
//           <h3>Join Game</h3>
//         </button>
//         <button 
//           className='btn btn-warning'
//           onClick={ () => navigate(`Spectate/${gameRoom.key}`) }>
//           <h3>Spectate Game  <span className="badge badge-default badge-pill">{spectators ? spectators.length : 0}</span>
//           </h3>
//         </button>
//       </div>
// =======