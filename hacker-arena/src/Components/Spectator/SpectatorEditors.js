import React, { Component } from 'react';
import SpectatorEditor from './SpectatorEditor';

class SpectatorEditors extends Component {
  render() {
    let { gameRoom } = this.props;
    return (
            <div>
              { Object.keys(gameRoom.players).map((playerName, i) => (
                <SpectatorEditor 
                  playerName={playerName}
                  playerInput={gameRoom.players[playerName].liveInput}
                  key={String(playerName)+i}
                />
              )) }
            </div>
    );
  }
}

export default SpectatorEditors;