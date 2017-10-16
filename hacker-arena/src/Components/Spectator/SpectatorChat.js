import React, { Component } from 'react';
import '../../Styles/SpectatorChat.css'
import fire from '../../Firebase/firebase';
import SimpleWebRTC from "simplewebrtc"
import SpectatorChatMessage from './SpectatorChatMessage.js';

class SpectatorChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: ''
    }
    this.handleMsgInput = this.handleMsgInput.bind(this);
    this.handleMsgSend = this.handleMsgSend.bind(this);
    this.chat = this.chat.bind(this);
  }

  handleMsgInput(e) {
    this.setState({ msg: e.target.value });
  }

  handleMsgSend(e) {
    e.preventDefault();
    let msg = this.state.msg;
    let room = this.props.gameRoom;
    let username = fire.auth().currentUser.email.split('@')[0] || 'UnkownUser';
    this.props.sendSpectatorMessage(room, username, msg);
  }
  chat(e) {
    var webrtc = new SimpleWebRTC({
      // the id/element dom element that will hold "our" video 
      localVideoEl: 'localVideo',
      // the id/element dom element that will hold remote videos 
      remoteVideosEl: 'remoteVideos',
      // immediately ask for camera access 
      autoRequestMedia: true
  });
  webrtc.on('readyToCall', function () {
    // you can name it anything 
    webrtc.joinRoom('your awesome room name');
});
  }
  render() {
    let { gameRoom } = this.props;
    let spectatorChat = gameRoom.spectatorChat || [];
    return (
      <div style={{ margin: "5%" }}>
      <button onClick= {(e)=>this.chat()}>vChat</button>
        <form onSubmit={this.handleMsgSend}>
          <h2>Chat Here!</h2>
          <input type="text" onChange={this.handleMsgInput} />
          <button>
            <h3>Send</h3>
          </button>
        </form>
        
        <div>
          <div className='stream'> <video id ="localVideo"></video>
          </div>
          { spectatorChat.map((chatMessage, i) => (
            <SpectatorChatMessage 
              key={chatMessage.msg+i}
              chatMessage={chatMessage}
            /> 
          ))}
        </div>
      </div>
    );
  }
}

export default SpectatorChat;