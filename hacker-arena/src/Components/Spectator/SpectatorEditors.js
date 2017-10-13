import React, { Component } from 'react';
import SpectatorEditor from './SpectatorEditor';

class SpectatorEditors extends Component {
  render() {
    let { gameRoom } = this.props;
    return (
      <div>
        { 
          gameRoom ? (
            <div>
              { [gameRoom.creatorName, gameRoom.challengerName].map((player, i) => (
                <SpectatorEditor 
                  playerName={player}
                  key={player+i}
                />
              )) }
            </div>
          ) : (
            <h1 style={{color: 'red'}}>Enter a Game Room Warning</h1>
          )
        }
      </div>
    );
  }
}

export default SpectatorEditors;