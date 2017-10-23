import React from 'react';
import { connect } from 'react-redux';
import fire from './../../Firebase/firebase';
import SpectatorEditor from '../../Components/Spectator/SpectatorEditor';
import ProgressBar from '../../Components/GameRoom/ProgressBar';
import TestSuite from '../../Components/TestSuite.js'; //From Simon
import SpectatorEditors from '../../Components/Spectator/SpectatorEditors';
import PairVideo from './PairVideo.js';
import Helper from '../../Helpers/helpers.js'

//this should better be a view instead of room;
class NavigatorRoom extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      allowEnter: true
    }
  }

  render() {
    let { roomId, room, username, partnerName, partnerRole } = this.props
  
    let Videoroom = Helper._getTeamIndex(room, username)
    
    return (
      <div>
        YOU ARE A NAVIGATOR - TALK!!
        <PairVideo videoroom= {Videoroom}/>
        <ProgressBar room={ room }/>
        <div id="editorAndTestSuite">
          <SpectatorEditors 
            gameRoom={room}
            roomId={roomId}
            username={username} 
            partnerName ={partnerName}
            partnerRole={partnerRole} 
          />
          <TestSuite 
            currentRoom={room}
            roomId={roomId}
            username={username} 
            partnerName ={partnerName}
            partnerRole={partnerRole}
          />
        </div>
      </div>
    )
  }
  }

export default NavigatorRoom