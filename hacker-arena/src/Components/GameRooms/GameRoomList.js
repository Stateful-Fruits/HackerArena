import React from 'react';

import GameRoomPreview from './GameRoomPreview';

const GameRoomList = ({ gameRooms, navigateToAbout }) => (
  <div>
    { gameRooms.map((room, inx) => (
      <GameRoomPreview 
        gameRoom={room}
        key={room.roomName + inx}
        navigateToAbout={navigateToAbout}
      />
    ))}
  </div>
);

export default GameRoomList;