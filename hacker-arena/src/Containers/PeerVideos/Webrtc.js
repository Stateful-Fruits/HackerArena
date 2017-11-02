import React, {Component} from 'react';
// import PropTypes from'prop-types';
// import { List } from 'immutable';
// import mapDispatchToProps from './actions';
import SimpleWebRTC from 'simplewebrtc';
// import{ connect} from 'react-redux';
import '../../Styles/Webrtc.css';
// import fire from '../../Firebase/firebase';

// import shouldPureComponentUpdate from 'react-pure-render/function';

class Webrtc extends Component {
  constructor(props){
    super(props);
    this.state = {
      muted: false,
      paused: false
    }
  }
   componentDidMount() {
    //    const{onReady} =this.props
    const {room } = this.props;
        const webrtc = new SimpleWebRTC({
        localVideoEl: this.refs.local,
        remoteVideosEl: "",
        // remoteVideosEl: '',
        
        autoRequestMedia: true,
        detectSpeakingEvents: true,
      });
console.log('componentDidMount');
    // webrtc.on('videoAdded', function (video, peer) {
    //   console.log('bbbin didmount')
    //   var remotes = document.getElementById('remoteVideo');
    //     if (remotes) {
    //       var container = document.createElement('div');
    //         container.className = 'videoContainer';
    //         container.id = 'container_' + webrtc.getDomId(peer);
    //         container.appendChild(video);

    //         // suppress contextmenu
    //         video.oncontextmenu = function () { return false; };

    //         remotes.appendChild(container);
    //     }
    // }); 

    //   this.webrtc = webrtc;
      webrtc.on('readyToCall', function () {
        // you can name it anything
      });
      webrtc.joinRoom(`spectator/${room.key}`);
      this.webrtc = webrtc;
    }
componentDidUpdate() {
  console.log('Componentwillupdate called')
  let webrtc = this.webrtc
  webrtc.on('videoRemoved', function(video,peer) {
    console.log('removed')
    // var removedVideo = document.getElementById('container_' + webrtc.getDomId(peer));
    Element.prototype.getElementById = function(id) {
      return document.getElementById(id);
    }
    if (document.getElementById('remoteVideo') && 
        document.getElementById('remoteVideo').getElementById('container_' + webrtc.getDomId(peer))) {
      document.getElementById('remoteVideo').getElementById('container_' + webrtc.getDomId(peer)).remove();
    }
  })

  webrtc.on('videoAdded', function (video, peer) {
    console.log('videoAdd is triggered');
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
}
componentWillReceiveProps(nextProps) {
}

componentWillUnmount(){
  // console.log(localMediaStream);
  // MediaStreamTrack.stop();
 
  this.webrtc.stopLocalVideo();
   this.webrtc.leaveRoom() 
}
shouldComponentUpdate(nextProps, nextState) {
  return true;
}
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
    document.getElementById('localVideo').style.display = "flex";    
    this.setState({paused:false});
  } else {
    this.webrtc.pause();
    document.getElementById("localVideo").style.display = "none";
      
    this.setState({paused:true});
  }
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
      <button className='gamePreviewButton' onClick={this.mute.bind(this)}>Mute Audio</button>
      <button className='gamePreviewButton' onClick={this.pause.bind(this)}>Toggle Camera</button>

    </div>
    )
  }
}
export default Webrtc;