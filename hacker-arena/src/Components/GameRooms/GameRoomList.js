import React from 'react';

import GameRoomPreview from './GameRoomPreview';

const GameRoomList = ({ gameRooms, navigateToAbout, navigateToGameRoom }) => (
  <div>
    { gameRooms.map((room, inx) => (
      <GameRoomPreview 
        gameRoom={room}
        key={room.key + inx}
        navigateToAbout={navigateToAbout}
        navigateToGameRoom={navigateToGameRoom}
      />
    ))}
  </div>
);

export default GameRoomList;