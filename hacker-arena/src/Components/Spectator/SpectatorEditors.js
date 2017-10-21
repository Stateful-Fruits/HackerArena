import React, { Component } from 'react';
import SpectatorEditor from './SpectatorEditor';
import helpers from '../../Helpers/helpers'

class SpectatorEditors extends Component {
  render() {
    let { gameRoom, roomId, username, partnerName, partnerRole } = this.props;
    let players = Object.keys(gameRoom.players)
    let partner = players.filter(playerName => playerName === partnerName) 
    let playersToShow = partner.length ? partner : players;
    
    return (
            <div>
              { playersToShow.map((playerName, i) => (
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