import React, { Component } from 'react';
import { connect } from 'react-redux';
import fire from './firebase';
import fillDb from './fillDb';
import './Styles/App.css';

import updateGameRooms from './Actions/updateGameRooms';

class App extends Component {

  componentWillMount() {
    // fillDb();
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

export default connect(null, mapDispatchToProps)(App);