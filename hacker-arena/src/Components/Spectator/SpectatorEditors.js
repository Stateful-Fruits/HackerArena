import React, { Component } from 'react';
import SpectatorEditor from './SpectatorEditor';

class SpectatorEditors extends Component {
  render() {
    let { gameRoom } = this.props;
    return (
            <div>
              { [gameRoom.creatorName, gameRoom.challengerName].map((player, i) => (
                <SpectatorEditor 
                  playerName={player}
                  key={String(player)+i}
                />
              )) }
            </div>
    );
  }
}

export default SpectatorEditors;