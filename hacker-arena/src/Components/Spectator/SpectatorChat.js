import React, { Component } from 'react';
// import fire from '../../Firebase/firebase';
import Webrtc from '../../Containers/PeerVideos/Webrtc.js';
import SpectatorChatMessage from './SpectatorChatMessage.js';

class SpectatorChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: ''
    }
    this.handleMsgInput = this.handleMsgInput.bind(this);
    this.handleMsgSend = this.handleMsgSend.bind(this);
    
  }

  handleMsgInput(e) {
    this.setState({ msg: e.target.value });
  }

  handleMsgSend(e) {
    e.preventDefault();
    // prevent empty messages
    if (!this.state.msg.length) return;
    let msg = this.state.msg;
    let { gameRoom, currentUser, roomId } = this.props;
    let username = currentUser.username || 'UnknownUser';
    this.props.sendSpectatorMessage(gameRoom, roomId, username, msg);
    this.setState({ msg: '' });
  }

  render() {
    let { gameRoom, roomId } = this.props;
    console.log('roomId in spectatorChat', roomId)
    let spectatorChat = gameRoom.spectatorChat || [];
    let { spectators } = gameRoom;
    return (
      <div style={{ margin: "5%" }}>
       <Webrtc
        room={gameRoom}
        roomId={roomId}
       />
        <form onSubmit={this.handleMsgSend}>
          <h2>Chat: </h2>
            <p>{(spectators ? spectators.filter((spectatorName, i) => spectators.indexOf(spectatorName) === i).join(', ') : '')}</p>
          <input type="text" onChange={this.handleMsgInput} value={ this.state.msg }/>
          <button className='gamePreviewButton'>
            <h3>Send</h3>
          </button>
        </form>
        
        <div>
        
          { spectatorChat.map((chatMessage, i) => (
            <SpectatorChatMessage 
              key={chatMessage.msg+i}
              chatMessage={chatMessage}
            /> 
          )).reverse()}
        </div>
      </div>
    );
  }
}

export default SpectatorChat;