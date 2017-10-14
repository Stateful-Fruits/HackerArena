import React, { Component } from 'react';

class SpectatorGameDescription extends Component {
  render() {
    let { gameRoom } = this.props;
    let { challengerName, creatorName } = gameRoom;
    return (
      <div>
        <h2>{ creatorName } VS { challengerName }</h2>
        <div>
          [ THIS IS A PLACEHOLDER FOR THE TOY PROBLEM DESCRIPTION ]
        </div>
      </div>
    )
  }
}

export default SpectatorGameDescription;