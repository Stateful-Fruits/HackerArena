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
    let { room, roomId, username, partnerName, addPendingEvent, removePendingEvent, currentUser } = this.props
    let Videoroom = getTeamIndex(room, username)
    return (
      <div>
        <div>YOU ARE A DRIVER. CODE!</div>
        <PairVideo 
          videoroom={Videoroom}
          roomKey={roomId}
          currentUser={currentUser}
        />
        <div className="driver-container">
          <div id="editorAndTestSuite">
            <CodeEditor
              currentRoom={room}
              roomId={roomId}
              addPendingEvent={addPendingEvent}
              removePendingEvent={removePendingEvent}
              currentUser={currentUser}
            />
          </div>
        
          <div className="partner-message">
            <p>YOUR NAVIGATOR IS {partnerName}</p>
            <p>LISTEN! THEY WILL TELL YOU WHAT PROBLEM YOU NEED TO SOLVE</p>
            <p>IF YOU CLICK SUBMIT, THEY WILL TELL YOU WHAT TESTS YOU PASS</p>
            <p>THEY WILL ALSO LET YOU KNOW WHICH DISRUPTIONS ARE COMING</p>
          </div>
        </div>
      </div>
    )
  }
}
export default DriverRoom