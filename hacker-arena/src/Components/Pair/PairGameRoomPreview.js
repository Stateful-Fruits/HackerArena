<<<<<<< HEAD
import React from 'react';

const GameRoomPreview = ({ 
  dispatch, 
  gameRoom, 
  navigate
}) => {
  let { spectators, playerCapacity, maxPairs } = gameRoom;
  let players = gameRoom.players || {};
  let teams = gameRoom.teams || {};
  let playerNames = Object.keys(players);
  let teamSpans = [];
  for (let i = 0; i < maxPairs; i++) {
    teamSpans.push(
      <li className='list-group-item' key={'team' + i}>
        <h4>
          Player {i} -> { playerNames[i] ? playerNames[i] : <span style={{color: 'darkgreen'}}>OPEN</span> }
        </h4>
      </li>);
  }
  return (
    <div className='list-group-item' style={{ color: 'black', border: '3px solid #222', margin: '1%', marginLeft: '20%', marginRight: '20%'}}>
      <ul className='list-group'>
      </ul>
      <div>
        Spectators: {(spectators ? spectators.filter((spectatorName, i) => spectators.indexOf(spectatorName) === i).join(', ') : '')}
      </div>
      <button onClick={ () => navigate(`/GameRoom/${gameRoom.key}`) } disabled={playerCapacity === playerNames.length}>
        <h3>Join Game</h3> 
      </button>
      <button onClick={ () => navigate(`/Spectate/${gameRoom.key}`) }>
        <h3>Spectate Game  <span className="badge badge-default badge-pill">{spectators ? spectators.length : 0}</span>
        </h3>
      </button>
    </div>
  );
=======
import React, { Component } from 'react';
import fire from './../../Firebase/firebase';

class GameRoomPreview extends Component {
  constructor (props) {
    super (props);

    this.joinTeam = this.joinTeam.bind(this);
  }

  joinTeam(teamIndex, role, username, roomId) {
    let { navigate } = this.props;
    fire.database().ref(`/rooms/${roomId}/teams/${teamIndex}/${role}`).set(username)
    .then(() => navigate(`Pair/GameRoom/${roomId}`));
  }

  render() {
    let { gameRoom } = this.props;

    let username = fire.auth().currentUser.email.split('@')[0];   

    let roomId = gameRoom.key;
    let maxPairs = gameRoom.maxPairs
    let players = gameRoom.players || {};
    let teams = gameRoom.teams || {};

    let playerNames = Object.keys(players);
    let teamSpans = [];

    for (let i = 0; i < maxPairs; i++) {
      teamSpans.push(
        <li className='list-group-item' key={'team' + i}>
          <h4>
            Team {i} -> {
              <div>
                <div>
                  Driver: {
                    teams[i] && teams[i].driver ? 
                      teams[i].driver
                      : 
                      <button onClick={() => this.joinTeam(i, 'driver', username, roomId)}  style={{color: 'darkgreen'}}>
                        OPEN
                      </button>
                  }
                </div>
                <div>
                  Navigator: {
                    teams[i] && teams[i].navigator ? 
                      teams[i].navigator 
                      :
                      <button onClick={() => this.joinTeam(i, 'navigator', username, roomId)}  style={{color: 'darkgreen'}}>
                      OPEN
                      </button>                  
                  }
                </div>
              </div>
            }
          </h4>
        </li>
      );
    }
    
    return (
      <div className='list-group-item' style={{ color: 'black', border: '3px solid #222', margin: '1%', marginLeft: '20%', marginRight: '20%'}}>
        <ul className='list-group'>
          {teamSpans}
        </ul>
        {/* <div>
          Spectators: {(spectators ? spectators.filter((spectatorName, i) => spectators.indexOf(spectatorName) === i).join(', ') : '')}
        </div> */}
        {/* <button onClick={ () => navigate(`Pair/GameRoom/${gameRoom.key}`) } disabled={playerCapacity === playerNames.length}>
          <h3>Join Game</h3> 
        </button> */}
        {/* <button onClick={ () => navigate(`Pair/Spectate/${gameRoom.key}`) }>
          <h3>Spectate Game  <span className="badge badge-default badge-pill">{spectators ? spectators.length : 0}</span>
          </h3>
        </button> */}
      </div>
    );
  }
>>>>>>> dev
};

export default GameRoomPreview;