import React, { Component } from 'react';

class CodeRunSpectatorPlayerInfo extends Component {
  render() {
    let { boardRoom } = this.props;
    return (
      <div>
        {Object.keys(boardRoom.playerInfo).map((playerName) => (
            <div style={{ display: 'inline-block', margin: '3%' }}>
              <h2>{ playerName }</h2>
              <h4>Attack:</h4>
              { boardRoom.playerInfo[playerName].attack }
              <h4>Moves:</h4>
              { boardRoom.playerInfo[playerName].diceResult }
              <h4>Credits:</h4>
              { boardRoom.playerInfo[playerName].credits }
            </div>
          ))}
      </div>
    )
  }
}

export default CodeRunSpectatorPlayerInfo;