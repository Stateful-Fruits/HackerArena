import React from 'react';
import {connect} from 'react-redux';
import fire from '../../Firebase/firebase';

class GameRoom extends React.Component {
  constructor (props) {
    super (props);
    this.handleLeave = this.handleLeave.bind(this);
  }
  componentDidMount() { 
    if (this.props.room) {
      window.addEventListener('beforeunload', this.handleLeave);
    }
    this.handleEnter();
  }
  
  componentWillUnmount () {
    this.handleLeave();
  }
  
  handleEnter () {

  }

  handleLeave () {
    if (this.props.room !== undefined) {
      let user = this.props.user;
      let room = this.props.room;
      room.players = room.players.filter(player => player !== user);
      if (room.players > 0) {
        fire.database().ref('BoardRooms/' + this.props.room.key).set(room);
      } else {
        fire.database().ref('BoardRooms/' + this.props.room.key).remove();
      }
    }
  }

  render () {
    let exist = this.props.room !== undefined;
    if (exist) {
      return <div>
        <div>Run run run your code hastily down the board</div>
        {JSON.stringify(this.props.room.players)}
      </div>
    } else {
      return <div>
          <div>Run run run your code hastily down the board</div>
          <div> Please wait as we prepare your board </div>
        </div>
    }
  }
}

const mapStoP = (state) => {
  return {
    user: fire.auth().currentUser.email.split('@')[0],
    room: state.boardRooms ? state.boardRooms[state.router.location.pathname.split('/')[2]] : undefined,
  }
}

const mapDtoP = (dispatch) => {
  return {
  }
}

export default connect(mapStoP,mapDtoP)(GameRoom);
