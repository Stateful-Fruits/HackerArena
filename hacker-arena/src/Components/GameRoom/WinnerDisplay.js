import React, { Component } from 'react';

class WinnerDisplay extends Component {
  render() {
    let { champions, resultsByPlayer, isPairRoom } = this.props;

    let winnerDisplay = ``;
    let resultsDisplay = [];

    if (isPairRoom) {
      winnerDisplay = `The winners are ${champions.driver} and ${champions.navigator}!!`
      
      for (let player in resultsByPlayer) {
        let result = resultsByPlayer[player];
        let role = result.role;
        let wins = result.wins;
        resultsDisplay.push(<div key={player+role}>{player} received {wins} wins as a {role}</div>)
      }

    } else {
      winnerDisplay = `The winner is ${champions.hacker}!!`
      for (let player in resultsByPlayer) {
        let result = resultsByPlayer[player];
        let wins = result.wins;
        resultsDisplay.push(<div key={player+result}>{player}: {wins} wins </div>)
      }
    }

    return (
      <div>
        {winnerDisplay}
        {resultsDisplay}
    </div>
    )
  }
}

export default WinnerDisplay;