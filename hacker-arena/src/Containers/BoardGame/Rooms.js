import React from 'react';

const Rooms = (props) => {
  return <div>
    {
      props.rooms.map((room,i)=> {
        return <div key={i}>
          <div>Room Name: </div>
          {JSON.stringify(room.players)}
        </div>
      })
    }
  </div>
}

export default Rooms;