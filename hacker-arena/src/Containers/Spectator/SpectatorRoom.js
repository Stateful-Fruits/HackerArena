import React, { Component } from 'react';
import { connect } from 'react-redux';
import fire from '../../Firebase/firebase';
import $ from 'jquery';
import Disruptions from '../../Components/CodeEditor/disruptions';//'./../Components/CodeEditor/disruptions';
import SpectatorEditors from '../../Components/Spectator/SpectatorEditors';
import SpectatorChat from '../../Components/Spectator/SpectatorChat';
import SpectatorGameDescription from '../../Components/Spectator/SpectatorGameDescription';
import SpectatorError from '../../Components/Spectator/SpectatorError';
import ProgressBar from '../../Components/GameRoom/ProgressBar';
import WaitingForPlayer from '../../Components/GameRoom/WaitingForPlayer';

class SpectatorRoom extends Component {

  sendSpectatorMessage(room, username, msg) {
    let gameRoom = Object.assign({}, room);
    gameRoom.spectatorChat = [...(gameRoom.spectatorChat || []), {username, msg}];
    fire.database().ref(`rooms/${gameRoom.key}`).set(gameRoom);
  }

  enterGameRoom(room) {
    let username = fire.auth().currentUser.email.split('@')[0] || 'UnkownUser';
    let gameRoom = Object.assign({}, room);
    gameRoom.spectators = [...(gameRoom.spectators || []), username];
    fire.database().ref(`rooms/${gameRoom.key}`).set(gameRoom);
  }

  leaveGameRoom(room) {
    let username = fire.auth().currentUser.email.split('@')[0] || 'UnkownUser';
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
    if(gameRoom && gameRoom.winner !== "") {
      window.swal({
        title: `The Winner is ${gameRoom.winner}!`,
        width: 600,
        padding: 100,
        background: '#fff url(//bit.ly/1Nqn9HU)'
      });
     }

    if(gameRoom){
      //Check for disruptions sent to each user
     if(gameRoom.players){
       Object.keys(gameRoom.players).forEach(playerName => {
        gameRoom.players[playerName].disruptions.forEach(disruption => {
          if(disruption !== "") this.receiveDisruptions(disruption, playerName);
        });
      })
     }
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

  test(){
    console.log(this.ace.edit("abc"))
    $('.ace_editor').css({"background": "black"});
    $(".ace_editor").css({"transform": "scaleX(-1)"});
    $(".ace_editor").css({"filter": "FlipH"});
  }

  render() {
    let gameRoom = this.props.gameRooms[this.props.gameRoomId];
    return gameRoom ? (
      <div>
        <SpectatorGameDescription gameRoom={gameRoom} />
        <ProgressBar room={gameRoom}/>
        <SpectatorEditors gameRoom={gameRoom} />
        <SpectatorChat
          gameRoom={gameRoom}
          sendSpectatorMessage={this.sendSpectatorMessage}
        />
        <button className="btn" onClick={this.test.bind(this)}>TESTTTTTING</button>
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
});

export default connect(mapStateToProps, null)(SpectatorRoom);