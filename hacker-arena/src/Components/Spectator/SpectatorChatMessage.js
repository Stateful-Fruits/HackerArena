import React from 'react';

const SpectatorChatMessage = ({ chatMessage }) => (
  <div style={{ border: "1px solid black", padding: "3px" }}>
     <h4>{ chatMessage.username }</h4>
     <p>{ chatMessage.msg }</p>
  </div>
);

export default SpectatorChatMessage;