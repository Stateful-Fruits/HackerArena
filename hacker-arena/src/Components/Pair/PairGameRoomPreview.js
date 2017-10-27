import React, { Component } from 'react';
import fire from './../../Firebase/firebase';

class GameRoomPreview extends Component {
  constructor (props) {
    super (props);

    this.joinTeam = this.joinTeam.bind(this);
  }

  joinTeam(teamIndex, role, username, roomId) {
    let { navigate, gameRoom } = this.props;

    if (gameRoom.players[username]) {
      navigate(`Pair/GameRoom/${roomId}`);
    } else {
      fire.database().ref(`/rooms/${roomId}/teams/${teamIndex}/${role}`).set(username)
        .then(() => navigate(`Pair/GameRoom/${roomId}`));
    }
  }

  render() {
    let { gameRoom } = this.props;

    let username = fire.auth().currentUser.email.split('@')[0];   

    let roomId = gameRoom.key;
    let maxPairs = gameRoom.maxPairs
    // let players = gameRoom.players || {};
    let teams = gameRoom.teams || {};

    // let playerNames = Object.keys(players);
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
        <button onClick={() => this.props.navigate(`/Spectate/${roomId}`)}><h4>Spectate</h4></button>
      </div>
    );
  }
};

export default GameRoomPreview;