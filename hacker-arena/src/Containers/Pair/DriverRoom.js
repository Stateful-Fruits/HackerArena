import React from 'react';
import { connect } from 'react-redux';
import fire from './../../Firebase/firebase';
import CodeEditor from '../../Components/CodeEditor/CodeEditor.js'; //From Simon
import ProgressBar from '../../Components/GameRoom/ProgressBar';

//this should better be a view instead of room;
class DriverRoom extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      allowEnter: true
    }

  }
  render() {
    let { room } = this.props
    return (
      <div>
        YOU ARE A DRIVER. CODE!
        <div id="editorAndTestSuite">
          <CodeEditor currentRoom={room}/>
        </div>
      </div>
    )
  }
}
export default DriverRoom