import React from 'react';
import { connect } from 'react-redux';
import fire from './../../Firebase/firebase';
import CodeEditor from '../../Components/CodeEditor/CodeEditor.js'; //From Simon
import ProgressBar from '../../Components/GameRoom/ProgressBar';
import PairVideo from './PairVideo.js';
import Helper from '../../Helpers/helpers.js'

//this should better be a view instead of room;
class DriverRoom extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      allowEnter: true
    }

  }
  render() {
    let { room, username } = this.props
    let Videoroom = Helper._getTeamIndex(room, username)
    return (
      <div>
        YOU ARE A DRIVER. CODE!
        <PairVideo videoroom= {Videoroom}/>

        <div id="editorAndTestSuite">
          <CodeEditor currentRoom={room}/>
        </div>
      </div>
    )
  }
}
export default DriverRoom