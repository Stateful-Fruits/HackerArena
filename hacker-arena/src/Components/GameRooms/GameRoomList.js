import React, { Component } from 'react';

import GameRoomPreview from './GameRoomPreview';

class GameRoomList extends Component {
  render() {
    let { gameRooms, navigate} = this.props;
    const roomKeys = Object.keys(gameRooms);
    const rooms = roomKeys.map((roomKey) => {
      const roomData = gameRooms[roomKey];
      roomData.key = roomKey;
      return roomData;
    });
    return (
     <ul className='list-group'>
      { rooms.map((room, inx) => (
        <GameRoomPreview 
          gameRoom={room}
          key={room.key + inx}
          navigate={navigate}
        />
      ))}
    </ul>
  );

  }
}

export default GameRoomList;