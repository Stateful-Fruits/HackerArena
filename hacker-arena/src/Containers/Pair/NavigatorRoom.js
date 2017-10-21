import React from 'react';
import { connect } from 'react-redux';
import fire from './../../Firebase/firebase';
import SpectatorEditor from './SpectatorEditor';
import ProgressBar from '../../Components/GameRoom/ProgressBar';
import TestSuite from '../../Components/TestSuite.js'; //From Simon

//this should better be a view instead of room;
class NavigatorRoom extends React.Component {
<<<<<<< HEAD
    constructor (props) {
        super (props);
        this.state = {
            allowEnter: true
          }

        }
    render() {
        let {roomId, username} = this.props
        return (
          <div>
            <ProgressBar room={roomId}/>
            <div id="editorAndTestSuite">
              <SpectatorEditor currentRoom={roomId}/>
              <TestSuite currentRoom={roomId}
                         groupName = {username}/>
            </div>
          </div>
        )
    }
=======
  constructor (props) {
    super (props);
    this.state = {
      allowEnter: true
>>>>>>> dev
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