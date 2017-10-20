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
   componentDidMount() {
    //    const{onReady} =this.props
       const webrtc = new SimpleWebRTC({
        localVideoEl: this.refs.local,
        remoteVideosEl: this.refs.remote,
        // remoteVideosEl: '',
        
        autoRequestMedia: true,
        detectSpeakingEvents: true,
      });
      console.log('this is from another place', webrtc.remoteVideosEl)

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
render() {

return (
    <div className ='stream'>
      {/* <video ref='local' id = 'localVideo'/> */}
      {/* {setTimeout( ()=> {
       return <VideoChat
       data ={this.webrtc}/>
       },1000)}  */}
    
    <div ref='remote' id ='remoteVideo'/>


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