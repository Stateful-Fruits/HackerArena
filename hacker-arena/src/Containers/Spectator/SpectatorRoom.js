import React, { Component } from 'react';
import { connect } from 'react-redux';
import fire from '../../Firebase/firebase';
import Disruptions from '../../Components/CodeEditor/disruptions';//'./../Components/CodeEditor/disruptions';
import SpectatorEditors from '../../Components/Spectator/SpectatorEditors';
import SpectatorChat from '../../Components/Spectator/SpectatorChat';
import SpectatorGameDescription from '../../Components/Spectator/SpectatorGameDescription';
import SpectatorError from '../../Components/Spectator/SpectatorError';
import ProgressBar from '../../Components/GameRoom/ProgressBar';
import WaitingForPlayer from '../../Components/GameRoom/WaitingForPlayer';
import GameRoomError from '../../Components/GameRoom/GameRoomError';

let oldDisruptions = {};

class SpectatorRoom extends Component {

  sendSpectatorMessage(room, username, msg) {
    let newChat = [...(room.spectatorChat || []), {username, msg}];
    fire.database().ref(`rooms/${room.key}/spectatorChat`).set(newChat);
  }

  enterGameRoom(room) {
    let username = this.props.currentUser.username || 'UnknownUser';
    let gameRoom = Object.assign({}, room);
    gameRoom.spectators = [...(gameRoom.spectators || []), username];
    fire.database().ref(`rooms/${gameRoom.key}`).set(gameRoom);
  }

  leaveGameRoom(room) {
    let username = this.props.currentUser.username || 'UnknownUser';
    let gameRoom = Object.assign({}, room);
    if (gameRoom.spectators) {
      // each tab a user opens when logged in will add their name to the list of spectators, 
      // only remove one per exit on each tab
      let removedOne = false;
      gameRoom.spectators = gameRoom.spectators.filter((spectator, i) => {
        if (removedOne || !(spectator === username)) return true;
        else {
          removedOne = true;
          return false;
        }
      });
    }
    fire.database().ref('rooms/' + gameRoom.key).set(gameRoom);
  }
  
  componentDidMount() {
    let gameRoom = this.props.gameRooms[this.props.gameRoomId];
    if(gameRoom) {
      window.addEventListener('beforeunload', this.leaveGameRoom);
      this.enterGameRoom(gameRoom);
    }
  }

  componentWillUpdate() {
    let gameRoom = this.props.gameRooms[this.props.gameRoomId];
    // gameroom.players.playerName.events <- Array
    // inside {eventName: 'winner', value: {'winner': "playername"}}
    let playerNames = gameRoom && gameRoom.players ? Object.keys(gameRoom.players) : null;
    if(gameRoom && playerNames) {
      let events = gameRoom.players[playerNames[0]].events || [];
      events.forEach((event) => {
        if (event !== '' && event.value && event.value.winners) {
          let winners = Object.keys(event.value.winners).reduce((acc, key) => (
            [...acc, (event.value.winners[key])]
          ), []).join(', ');
          window.swal({
            title: `The Winner is ${winners}!`,
            width: 600,
            padding: 100,
            background: '#fff url(//bit.ly/1Nqn9HU)'
          });
        }
      });
     }
    if(gameRoom && gameRoom.players){
      //Check for disruptions sent to each user
      Object.keys(gameRoom.players).forEach(playerName => {
        gameRoom.players[playerName].disruptions.forEach(disruption => {
          if(disruption !== "" && !oldDisruptions[disruption[1]]) {
            oldDisruptions[disruption[1]] = true;
            this.receiveDisruptions(disruption[0], playerName);
          }
        });
      })
    }
  }

  componentWillUnmount() {
    let gameRoom = this.props.gameRooms[this.props.gameRoomId];
    window.removeEventListener('beforeunload', this.leaveGameRoom);
    this.leaveGameRoom(gameRoom);
  }


  receiveDisruptions(func, user){
    // Runs disruptions for user, if called
    Disruptions[func](user);
  }

  render() {
    if (this.props.gameRooms 
      && Object.keys(this.props.gameRooms).length 
      && !this.props.gameRooms[this.props.gameRoomId]) return (<GameRoomError errorMessage="This Game Room No Longer Exists!" />);
    let gameRoom = this.props.gameRooms[this.props.gameRoomId];
    let currentUser = this.props.currentUser;
    
    return gameRoom ? (
      <div>
        <SpectatorGameDescription gameRoom={gameRoom} />
        <ProgressBar room={gameRoom} currentUser={currentUser}/>
        <SpectatorEditors gameRoom={gameRoom} />
        <SpectatorChat
          gameRoom={gameRoom}
          sendSpectatorMessage={this.sendSpectatorMessage}
          currentUser={currentUser}
        />
      </div>
    ) : (
      Object.keys(this.props.gameRooms).length === 0 ? <WaitingForPlayer /> :
      <SpectatorError 
        errorMessage='You Need To Enter A Game Room First'
      />
    );
  }
}

const mapStateToProps = (state) => ({
  gameRooms: state.gameRooms,
  gameRoomId: state.router.location.pathname.split('/')[2],
  currentUser: state.currentUser
});

export default connect(mapStateToProps, null)(SpectatorRoom);