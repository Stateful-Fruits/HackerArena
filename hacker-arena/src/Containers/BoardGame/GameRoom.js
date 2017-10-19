import React from 'react';
import { connect } from 'react-redux';
import fire from '../../Firebase/firebase';
import { push } from 'react-router-redux';
import Board from './Board';

class GameRoom extends React.Component {
  constructor (props) {
    super (props);
    this.handleLeave = this.handleLeave.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.startGame = this.startGame.bind(this);
  }
  componentDidMount() {
    this.handleEnter();
  }
  
  componentWillUnmount () {
    this.handleLeave();
  }
  
  handleEnter () {
    let {room, user, navigate} = this.props;
    if (room) {
      window.addEventListener('beforeunload', this.handleLeave);
      let notFull = room.players.length < 4 && !room.gameStarted;
      let notAlreadyIn = room.players.indexOf(user) === -1;
      if (notFull && notAlreadyIn) {
        room.players.push(user);
        fire.database().ref('BoardRooms/' + room.key).set(room);
      } else if (!notFull && notAlreadyIn) {
        navigate('/CodeRunLobby');
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
    let room = this.props.room;
    room.gameStarted = true;
    fire.database().ref('BoardRooms/' + e.target.value).set(room);
  }

  render () {
    let room = this.props.room;
    if (room === undefined) {
      return <div>
        <div> Please wait as we prepare your board </div>
      </div>
    } else {
      let message, startButton;
      if (room.gameStarted) {
        startButton = null;
        message = 'Run run run your code hastily down the board'
      } else {
        startButton = <button value={this.props.room.key} onClick={this.startGame}>Start Game</button>;
        message = `Waiting for victims`;
      }
      

      return <div>
      <div></div>
      <div>{this.props.room.players.join(' ')}</div>
      {start}
      <Board board={room.board}/>
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
    navigate: (route) => dispatch(push(route))
  }
}

export default connect(mapStoP,mapDtoP)(GameRoom);
