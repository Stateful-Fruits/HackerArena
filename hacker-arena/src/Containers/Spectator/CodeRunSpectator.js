import React, { Component } from 'react';
import { connect } from 'react-redux';
import fire from '../../Firebase/firebase';
import SpectatorChat from '../../Components/Spectator/SpectatorChat';
import SpectatorError from '../../Components/Spectator/SpectatorError';
import WaitingForPlayer from '../../Components/GameRoom/WaitingForPlayer';
import GameRoomError from '../../Components/GameRoom/GameRoomError';
import CodeRunSpectatorPlayerInfo from '../../Components/Spectator/CodeRunSpectatorPlayerInfo';
import Board from '../BoardGame/Game/Board';

class BoardRoomSpectator extends Component {
  constructor(props) {
    super(props);
    this.sendSpectatorMessage = this.sendSpectatorMessage.bind(this);
  }

  sendSpectatorMessage(room, username, msg) {
    let newChat = [...(room.spectatorChat || []), {username, msg}];
    fire.database().ref(`BoardRooms/${room.key}/spectatorChat`).set(newChat);
  }

  render() {
    if (this.props.boardRooms 
      && Object.keys(this.props.boardRooms).length 
      && !this.props.boardRooms[this.props.roomId]) return (<GameRoomError errorMessage="This Game Room No Longer Exists!" />);
    let boardRoom = this.props.boardRooms[this.props.roomId];
    let currentUser = this.props.currentUser;
    return boardRoom ? (
      <div>
        <Board 
          board={boardRoom.board}
          whirlpools={boardRoom.whirlpools}
          currentUser={currentUser}
        />
        <CodeRunSpectatorPlayerInfo 
          boardRoom={boardRoom}
        />
        <SpectatorChat
          gameRoom={boardRoom}
          sendSpectatorMessage={this.sendSpectatorMessage}
        />
      </div>
    ) : (
      Object.keys(this.props.boardRooms).length === 0 ? <WaitingForPlayer /> :
      <SpectatorError 
        errorMessage='You Need To Enter A Game Room First'
      />
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  roomId: state.router.location.pathname.split('/')[2],
  boardRooms: state.boardRooms
});

export default connect(mapStateToProps, null)(BoardRoomSpectator);