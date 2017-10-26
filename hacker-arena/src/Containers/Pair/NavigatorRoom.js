import React from 'react';
import { connect } from 'react-redux';
import fire from './../../Firebase/firebase';
import SpectatorEditor from '../../Components/Spectator/SpectatorEditor';
import ProgressBar from '../../Components/GameRoom/ProgressBar';
import TestSuite from '../../Components/TestSuite.js'; //From Simon
import SpectatorEditors from '../../Components/Spectator/SpectatorEditors';
import PairVideo from './PairVideo.js';
import { getTeamIndex } from '../../Helpers/pairHelpers.js'

import '../../Styles/NavigatorRoom.css'

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
    let activityLog = room.activity || [''];

    let Videoroom = getTeamIndex(room, username)
    
    return (
      <div>
        YOU ARE A NAVIGATOR - TALK!!
        <PairVideo videoroom= {Videoroom}
        roomkey = {room.key}/>
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
        <div className="activity-log">
            {activityLog.map((message, i) => <p className="activity-message" key={message.slice(0, 3) + i}>{message}</p>).reverse()}
        </div>
      </div>
    )
  }
  }

export default NavigatorRoom