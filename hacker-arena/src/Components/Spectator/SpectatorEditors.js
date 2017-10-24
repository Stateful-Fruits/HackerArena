import React, { Component } from 'react';
import SpectatorEditor from './SpectatorEditor';
import helpers from '../../Helpers/helpers'

class SpectatorEditors extends Component {
  render() {
    let { gameRoom, roomId, username, partnerName, partnerRole } = this.props;
    let players = Object.keys(gameRoom.players)
    let partner = players.filter(playerName => playerName === partnerName) 
    let playersToShow = partner.length ? partner : players;
    if (gameRoom.isPairRoom) {
      let teams = gameRoom.teams;
      let navigators = teams.reduce((acc, team) => team.navigator ? [...acc, team.navigator] : [...acc], []);
      playersToShow = playersToShow.filter((player) => !navigators.includes(player));
    }
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