import React from 'react';
import {connect} from 'react-redux';
import fire from '../../Firebase/firebase';

class GameRoom extends React.Component {
  constructor (props) {
    super (props);
    this.handleLeave = this.handleLeave.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }
  componentDidMount() {
    this.handleEnter();
  }
  
  componentWillUnmount () {
    this.handleLeave();
  }
  
  handleEnter () {
    let room = this.props.room;
    let user = this.props.user;
    if (room) {
      window.addEventListener('beforeunload', this.handleLeave);
      let notFull = room.players.length < 4;
      let notAlreadyIn = room.players.indexOf(user) === -1;
      if (notFull && notAlreadyIn) {
        room.players.push(user);
        fire.database().ref('BoardRooms/' + room.key).set(room);
      }
    }
  }

  handleLeave () {
    if (this.props.room !== undefined) {
      let user = this.props.user;
      let room = this.props.room;
      room.players = room.players.filter(player => player !== user);
      console.log('room after filter ', room);
      
      if (room.players.length > 0) {
        fire.database().ref('BoardRooms/' + this.props.room.key).set(room);
      } else if (room.players.length === 0) {
        fire.database().ref('BoardRooms/' + this.props.room.key).remove();
      }
    }
  }

  startGame (e) {
    e.preventDefault();
    fire.database().ref('BoardRooms/' + e.target.value + '/gameStarted').set(true);
  }

  render () {
    let notExist = this.props.room === undefined;
    if (notExist) {
      return <div>
        <div>Run run run your code hastily down the board</div>
        <div> Please wait as we prepare your board </div>
      </div>
    } else {
      return <div>
      <div>Run run run your code hastily down the board</div>
      <button value={this.props.room.key} onClick={this.startGame}>Start Game</button>
      <div>{this.props.room.players.join(' ')}</div>
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
