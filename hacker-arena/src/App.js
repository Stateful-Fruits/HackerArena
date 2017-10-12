import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import fire from './Firebase/firebase';
import populateDb from './Firebase/populateDb';
import './Styles/App.css';
import updateGameRooms from './Actions/updateGameRooms';
import CodeEditor from './Containers/CodeEditor.js';

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

export default withRouter(connect(null, mapDispatchToProps)(App));