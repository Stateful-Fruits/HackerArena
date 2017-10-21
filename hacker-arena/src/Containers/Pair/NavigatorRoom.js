import React from 'react';
import { connect } from 'react-redux';
import fire from './../../Firebase/firebase';
import CodeEditor from '../../Components/CodeEditor/CodeEditor.js'; //From Simon
import ProgressBar from '../../Components/GameRoom/ProgressBar';
import TestSuite from '../Components/TestSuite.js'; //From Simon

//this should better be a view instead of room;
class NavigatorRoom extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            allowEnter: true
          }

        }
    render() {
        let {roomId} = this.props
        return (
          <div>
            <ProgressBar room={roomId}/>
            <div id="editorAndTestSuite">
              <CodeEditor currentRoom={roomId}/>
              <TestSuite currentRoom={roomId}/>
            </div>
          </div>
        )
    }
    }
const mapStateToProps = (state) => ({
            roomId: state.router.location.pathname.split('/')[2],
            username: fire.auth().currentUser.email.split('@')[0],     
          });
export default connect(mapStateToProps)(NavigatorRoom);
          