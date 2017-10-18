import React from 'react';
import fire from '../../Firebase/firebase';
import {connect} from 'react-redux';
import Rooms from './Rooms';
import CreateRoom from './CreateRoom';

class Lobby extends React.Component {
  componentDidMount() {
    // fire.database().ref('BoardRooms').push({
    //   test: `holder`
    // });
  }
  render () {
    let rooms = this.props.rooms;
    let roomsArr = [];
    console.log('rooms',rooms);
    for (var key in rooms) {
      console.log('key',key,rooms[key])
      roomsArr.push(rooms[key]);
    }
    return (
      <div>
        <div>Code Run</div>
        <CreateRoom />
        <div>Games</div>
        <Rooms rooms={roomsArr}/>        
      </div>
    )
  }
}

const mapStoP = (state) => {
  console.log('state is ', state);
  return {
    rooms: state.boardRooms
  }
} 

export default connect(mapStoP)(Lobby);