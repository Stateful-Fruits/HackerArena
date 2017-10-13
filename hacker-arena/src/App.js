import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import fire from './Firebase/firebase';
import populateDb from './Firebase/populateDb';
import './Styles/App.css';
import updateGameRooms from './Actions/updateGameRooms';
import CodeEditor from './Containers/CodeEditor.js';

import { push } from 'react-router-redux';

class App extends Component {

  componentWillMount() {
    // populateDb();
  }

  render() {
    let { navigate } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Team Stateful Fruits</h1>
        </header>
        <button onClick={ () => navigate('/') }>
          <h3>Home</h3>
        </button>
        <button onClick={ () => navigate('/About') }>
          <h3>About</h3>
        </button>
        <button onClick={ () => navigate('/SignUp') }>
          <h3>SignUp/Login</h3>
        </button>
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
  updateGameRooms: (rooms) => dispatch(updateGameRooms(rooms)),
  navigate: (route) => dispatch(push(route))
});

export default withRouter(connect(null, mapDispatchToProps)(App));