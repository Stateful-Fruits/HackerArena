import React, { Component } from 'react';

import SpectatorChatMessage from './SpectatorChatMessage.js';

class SpectatorChat extends Component {
  render() {
    return (
      <div>
        <h2>Chat Here!</h2>
        <input type="text" />
        <div>
          { [1,2,3].map((i) => <SpectatorChatMessage key={i}/>) }
        </div>
      </div>
    );
  }
}

export default SpectatorChat;