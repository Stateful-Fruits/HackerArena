import React from 'react';

const Rooms = (props) => {
  return <div>
    {
      props.rooms.map((room,i)=> {
        return <div key={i}>
          <div>Players: {room.players.join(' ')}</div>
          <button value={room.key} onClick={(e) => {
            e.preventDefault();
            props.navigate('CodeRun/' + e.target.value);
          }}>JOIN</button>
          <button value={room.key} onClick={(e) => {
            e.preventDefault();
            props.deleteRoom(e.target.value);
          }}> Delete </button>
        </div>
      })
    }
  </div>
}

export default Rooms;