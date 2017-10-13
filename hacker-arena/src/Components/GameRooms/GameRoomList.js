import React from 'react';

import GameRoomPreview from './GameRoomPreview';

const GameRoomList = ({ gameRooms, navigate}) => (
  <div>
    { gameRooms.map((room, inx) => (
      <GameRoomPreview 
        gameRoom={room}
        key={room.key + inx}
        navigate={navigate}
      />
    ))}
  </div>
);

export default GameRoomList;