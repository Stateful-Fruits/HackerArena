import React, { Component } from 'react';
import { connect } from 'react-redux';
import fire from '../../Firebase/firebase';

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
    fire.database().ref('rooms/' + gameRoom.key).set(gameRoom);
  }

  enterGameRoom(room) {
    let username = fire.auth().currentUser.email.split('@')[0] || 'UnkownUser';
    let gameRoom = Object.assign({}, room);
    gameRoom.spectators = [...(gameRoom.spectators || []), username];
    console.log('Entered Game Room: ', gameRoom);
    fire.database().ref('rooms/' + gameRoom.key).set(gameRoom);
  }

  leaveGameRoom(room) {
    let username = fire.auth().currentUser.email.split('@')[0] || 'UnkownUser';
    let gameRoom = Object.assign({}, room);
    if (gameRoom.spectators) {
      gameRoom.spectators = gameRoom.spectators.filter((spectator, i) => (
        !(spectator === username)
      ));
    }
    fire.database().ref('rooms/' + gameRoom.key).set(gameRoom);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.leaveGameRoom);
    let gameRoom = this.props.gameRooms[this.props.gameRoomId];
    this.enterGameRoom(gameRoom);
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
  }

  componentWillUnmount() {
    let gameRoom = this.props.gameRooms[this.props.gameRoomId];
    this.leaveGameRoom(gameRoom);
  }

  render() {
    let gameRoom = this.props.gameRooms[this.props.gameRoomId];
    return gameRoom ? (
      <div>
        {/* 
          - include the list of disruptions and progress bar in 
            the problem description (progress bar of tests passed)
          - create a view for each player's editor and allow the 
          spectator to run that players code in the editor's console
          - have a chat for the spectators
        */}
        <SpectatorGameDescription
          gameRoom={gameRoom} 
        />
        <ProgressBar room = {gameRoom}/>
        <SpectatorEditors 
          gameRoom={gameRoom}
        />
        <SpectatorChat
          gameRoom={gameRoom}
          sendSpectatorMessage={this.sendSpectatorMessage}
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
});

export default connect(mapStateToProps, null)(SpectatorRoom);