import React, {Component} from 'react';
import PropTypes from'prop-types';
import { List } from 'immutable';
// import mapDispatchToProps from './actions';
import SimpleWebRTC from 'simplewebrtc';
import{ connect} from 'react-redux';
import VideoChat from '../../Components/Spectator/VideoChat.js';
import '../../Styles/Webrtc.css';
// import shouldPureComponentUpdate from 'react-pure-render/function';

class Webrtc extends Component {
  constructor(){
    super();
    this.state = {
      muted: false,
      paused: false
    }
  }
   componentDidMount() {
    //    const{onReady} =this.props
       const webrtc = new SimpleWebRTC({
        localVideoEl: this.refs.local,
        remoteVideosEl: "",
        // remoteVideosEl: '',
        
        autoRequestMedia: true,
        detectSpeakingEvents: true,
      });
      console.log('this is from another place', webrtc.remoteVideosEl)
      webrtc.on('videoAdded', function (video, peer) {
        console.log('video added', peer);
        var remotes = document.getElementById('remoteVideo');
        if (remotes) {
            var container = document.createElement('div');
            container.className = 'videoContainer';
            container.id = 'container_' + webrtc.getDomId(peer);
            container.appendChild(video);
    
            // suppress contextmenu
            video.oncontextmenu = function () { return false; };
    
            remotes.appendChild(container);
        }
    });

    webrtc.on('videoRemoved', function(video,peer) {
      console.log('video removed', peer);
      // var removedVideo = document.getElementById('container_' + webrtc.getDomId(peer));
      Element.prototype.getElementById = function(id) {
        return document.getElementById(id);
    }
      document.getElementById('remoteVideo').getElementById('container_' + webrtc.getDomId(peer)).remove();
    })
    //   this.webrtc = webrtc;
      webrtc.on('readyToCall', function () {
        // you can name it anything
      webrtc.joinRoom('abc');
        console.log('chatroom ', webrtc);
    });
    this.webrtc = webrtc;
    console.log('video object', this.refs.remote);
    }

componentWillReceiveProps(nextProps) {
console.log('video object', this.refs.remote);
//    console.log('hello', this.webrtc);
        // this.webrtc.joinRoom('abc');
    
        // webrtc.on('videoAdded', (video, peer) =>
        //   addPeer({ video, peer })
        // );
}
// shouldComponentUpdate = shouldPureComponentUpdate;
mute(){
  if(this.state.muted){
    this.webrtc.unmute();
    this.setState({muted: false});
  } else {
    this.webrtc.mute();
    this.setState({muted: true});
  }
}
pause(){
  if(this.state.paused){
    this.webrtc.resumeVideo();
    this.setState({paused:false});
  } else {
    this.webrtc.pauseVideo();
    this.setState({paused:true});
  }
  console.log(this.webrtc);
}
render() {

return (
    <div className ='stream'>
      {/* {setTimeout( ()=> {
        return <VideoChat
        data ={this.webrtc}/>
      },1000)}  */}
    
    <div ref='remotes' id ='remoteVideo'>
      <div className="videoContainer">
        <video  ref='local' id = 'localVideo'/>
      </div>
    </div>
      <button onClick={this.mute.bind(this)}>Mute Audio</button>
      <button onClick={this.pause.bind(this)}>Turn Camera Off</button>

    </div>
)

}
}
// const mapStateToProps =(state)=> ({
//     webrtc : state.webrtc,
//     room : state.gameRooms ? state.gameRooms[state.router.location.pathname.split('/')[2]] : null,   
// })
Webrtc.PropTypes= {
//     webrtc: PropTypes.object,
    peerVideos: PropTypes.instanceOf(List).isRequired,
    
}
export default connect()(Webrtc);