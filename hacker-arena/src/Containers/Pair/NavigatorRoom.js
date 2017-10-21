import React from 'react';
import { connect } from 'react-redux';
import fire from './../../Firebase/firebase';
import CodeEditor from '../../Components/CodeEditor/CodeEditor.js'; //From Simon
import ProgressBar from '../../Components/GameRoom/ProgressBar';
import TestSuite from '../../Components/TestSuite.js'; //From Simon

//this should better be a view instead of room;
class NavigatorRoom extends React.Component {
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
        <ProgressBar room={ room }/>
        <div id="editorAndTestSuite">
          <CodeEditor currentRoom={ room }/>
          <TestSuite currentRoom={ room }/>
        </div>
      </div>
    )
  }
  }

export default NavigatorRoom