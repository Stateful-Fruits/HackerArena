import React from 'react';
import fire from '../../Firebase/firebase';
import {connect} from 'react-redux';
import Rooms from './Rooms';
import CreateRoom from './CreateRoom';
import { push } from 'react-router-redux';

class Lobby extends React.Component {
  constructor (props) {
    super (props);
    this.deleteRoom = this.deleteRoom.bind(this);
  }
  deleteRoom (id) {
    fire.database().ref('BoardRooms/' + id).remove();
  }
  render () {
    let rooms = this.props.rooms;
    let roomsArr = [];
    for (var key in rooms) {
      roomsArr.push(rooms[key]);
    }
    return (
      <div>
        <div>Code Run</div>
        <CreateRoom/>
        <Rooms rooms={roomsArr} 
          deleteRoom={this.deleteRoom}
          navigate={this.props.navigate}/>        
      </div>
    )
  }
}

const mapStoP = (state) => {
  return {
    rooms: state.boardRooms
  }
} 

const mapDtoP = (dispatch) => {
  return {
    navigate: (route) => dispatch(push(route))
  }
}

export default connect(mapStoP, mapDtoP)(Lobby);