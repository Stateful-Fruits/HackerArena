import React, { Component } from 'react';
import SpectatorEditor from './SpectatorEditor';

class SpectatorEditors extends Component {
  render() {
    let { gameRoom } = this.props;
    return (
            <div>
              { [{name: gameRoom.creatorName, input: gameRoom.creatorLiveInput},
                 {name: gameRoom.challengerName, input: gameRoom.challengerLiveInput}].map((player, i) => (
                <SpectatorEditor 
                  playerName={player.name}
                  playerInput={player.input}
                  key={String(player.name)+i}
                />
              )) }
            </div>
    );
  }
}

export default SpectatorEditors;