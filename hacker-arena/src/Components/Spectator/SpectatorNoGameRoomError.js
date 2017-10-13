import React, { Component } from 'react';

class SpectatorNoGameRoomError extends Component {
  render() {
    return (
      <div style={{ color: 'red' }}>
        <h1>
          You need to enter a game room first!
        </h1>
      </div>
    )
  }
}

export default SpectatorNoGameRoomError;