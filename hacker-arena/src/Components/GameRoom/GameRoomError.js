import React from 'react';

const GameRoomError = ({ errorMessage }) => (
  <div style={{ color: 'red' }}>
  <h1>
    {
      errorMessage || 'An Unknown Error Occured'
    }
  </h1>
</div>
);

export default GameRoomError;