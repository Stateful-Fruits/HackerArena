import React, { Component } from 'react';

class WinnerDisplay extends Component {
  render() {
    let { champion, resultsByPlayer } = this.props;
    return (
      <div>
        The grand champion is {champion}!
        {
          (() => {
            for (let player in resultsByPlayer) {
              let result = resultsByPlayer[player];
              return <div>{player}: {result} wins </div>
            }
          })()
        }
    </div>
    )
  }
}

export default WinnerDisplay;