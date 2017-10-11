import React from 'react';

import GameRoomPreview from './GameRoomPreview';

const GameRoomList = ({ gameRooms }) => (
  <div>
    { gameRooms.map((room, inx) => (
      <GameRoomPreview 
        gameRoom={room}
        key={room.roomName + inx}
      />
    ))}
  </div>
);

export default GameRoomList;