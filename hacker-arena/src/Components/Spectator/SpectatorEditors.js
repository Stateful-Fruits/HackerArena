import React, { Component } from 'react';
import SpectatorEditor from './SpectatorEditor';

class SpectatorEditors extends Component {
  render() {
    let { gameRoom, partnerName, colors } = this.props;
    let players = Object.keys(gameRoom.players)
    let partner = players.filter(playerName => playerName === partnerName) 
    let playersToShow = partner.length ? partner : players;
    if (gameRoom.isPairRoom) {
      let teams = gameRoom.teams;
      let navigators = teams.reduce((acc, team) => team.navigator ? [...acc, team.navigator] : [...acc], []);
      playersToShow = playersToShow.filter((player) => !navigators.includes(player));
    }
    return (
            <div className="spectator-editors">
              { playersToShow.map((playerName, i) => (
                <SpectatorEditor
                  color={colors[i] || 'blue'} 
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