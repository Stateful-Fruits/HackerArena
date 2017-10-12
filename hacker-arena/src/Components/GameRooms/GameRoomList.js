import React from 'react';

import GameRoomPreview from './GameRoomPreview';

const GameRoomList = ({ gameRooms, navigateToAbout }) => (
  <div>
    { gameRooms.map((room, inx) => (
      <GameRoomPreview 
        gameRoom={room}
        key={room.key + inx}
        navigateToAbout={navigateToAbout}
      />
    ))}
  </div>
);

export default GameRoomList;