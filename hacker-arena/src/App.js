import React, { Component } from 'react';
import { connect } from 'react-redux';
import fire from './Firebase/firebase';
import populateDb from './Firebase/populateDb';
import './Styles/App.css';
import CodeEditor from './CodeEditor.js';

import updateGameRooms from './Actions/updateGameRooms';

class App extends Component {

  componentWillMount() {
    // populateDb();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Team Stateful Fruits</h1>
        </header>
        <CodeEditor />
        <p className="App-intro">
          Hello Team!!!
        </p>
        <div>
          { this.props.children }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateGameRooms: (rooms) => dispatch(updateGameRooms(rooms))
});

export default connect(null, mapDispatchToProps)(App);