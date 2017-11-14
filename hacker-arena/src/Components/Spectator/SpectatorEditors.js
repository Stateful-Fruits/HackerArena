import React, { Component } from 'react';
import SpectatorEditor from './SpectatorEditor';

class SpectatorEditors extends Component {
  render() {
    let { gameRoom, partnerName, activityLog, isPairRoom, colors } = this.props;
    let players = Object.keys(gameRoom.players)
    let partner = players.filter(playerName => playerName === partnerName) 
    let playersToShow = partner.length ? partner : players;
    if (gameRoom.isPairRoom) {
      let teams = gameRoom.teams;
      let navigators = teams.reduce((acc, team) => team.navigator ? [...acc, team.navigator] : [...acc], []);
      playersToShow = playersToShow.filter((player) => !navigators.includes(player));
    }
    return (
      <div className={'spectator-editors' + (isPairRoom ? ' pair-spectator-editor' : '')}>
        { playersToShow.map((playerName, i) => (
          <SpectatorEditor
            color={colors ? colors[i] : 'blue'}
            playerName={playerName}
            playerInput={gameRoom.players[playerName].liveInput}
            key={String(playerName)+i}
          />
        )) }
        {
          isPairRoom ? 
          <div className={"console-container"}>
            <button className={'btn consoleHeader'  + (isPairRoom ? ' consoleHeaderPair' : '')} color="secondary" size="lg" >
              <span>Console</span>
              <span className="clearConsole" onClick={this.handleClear}>X</span>
            </button>
            <ul id='aceConsole' className={(isPairRoom ? 'aceConsolePair' : '')}>}
              {activityLog.map((message, i) => <li id="log" className="activity-message" key={message.slice(0, 3) + i}>{message}</li>).reverse()}
            </ul>
          </div>
          :
          null
        }
      </div>
    );
  }
}

export default SpectatorEditors;