import React from 'react';
// import { connect } from 'react-redux';
// import fire from './../../Firebase/firebase';
import CodeEditor from '../../Components/CodeEditor/CodeEditor.js'; //From Simon
// import ProgressBar from '../../Components/GameRoom/ProgressBar';
import PairVideo from './PairVideo';
import { getTeamIndex } from '../../Helpers/pairHelpers'

import '../../Styles/DriverRoom.css'

//this should better be a view instead of room;
class DriverRoom extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      allowEnter: true
    }

  }
  render() {
    let { room, roomId, username, partnerName, addPendingEvent, removePendingEvent } = this.props
    let Videoroom = getTeamIndex(room, username)
    return (
      <div>
        <div>YOU ARE A DRIVER. CODE!</div>
        <PairVideo 
          videoroom={Videoroom}
          roomKey={roomId}
        />
        <div className="driver-container">
          <div id="editorAndTestSuite">
            <CodeEditor
              currentRoom={room}
              roomId={roomId}
              addPendingEvent={addPendingEvent}
              removePendingEvent={removePendingEvent}
            />
          </div>
        
          <div className="partner-message">
            <p>YOUR NAVIGATOR IS {partnerName}</p>
            <p>THEY WILL TELL YOU THE CODING CHALLENGE</p>
            <p>AND THEY WILL TELL YOU WHAT TESTS YOU PASS OR DON'T PASS</p>
          </div>
        </div>
      </div>
    )
  }
}
export default DriverRoom