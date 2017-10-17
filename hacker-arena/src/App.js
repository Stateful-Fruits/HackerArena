import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Styles/App.css';

import updateGameRooms from './Actions/updateGameRooms';
import updateProblems from './Actions/updateProblems';
import NavBar from './Components/NavBar/NavBar';

import fire from './Firebase/firebase';
import db from './Firebase/db';

import { push } from 'react-router-redux';

class App extends Component {

  componentWillMount() {
    let { updateGameRooms, updateProblems } = this.props;
    // grab and listen for game rooms from firebase db
    db.Rooms.on('value', data => {
      // dispatch action to change game rooms array in store
      updateGameRooms(data.val());
    });

    db.Problems.on('value', data => {
      updateProblems(data.val());  
    });

  }

  render() {
    let { navigate } = this.props;
    let currentUser = fire.auth().currentUser;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">HACKER ARENA</h1>
          {
            currentUser ? (
              <span className="profile-image" onClick={() => navigate('/User/' + currentUser.email.split('@')[0])}>
                <span className="profile-greeting"> Hi { currentUser.email.split('@')[0] }!</span>
                <img className="profile-photo"
                  src={currentUser.photoURL || 'https://static.pexels.com/photos/428339/pexels-photo-428339.jpeg'}
                  alt='profile'
                >
                </img>
              </span>
            ) : null
          }
        </header>
        <NavBar 
          navigate={navigate}
        />
        <div>
          { this.props.children }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateGameRooms: (rooms) => dispatch(updateGameRooms(rooms)),
  updateProblems: (problems) => dispatch(updateProblems(problems)),
  navigate: (route) => dispatch(push(route))
});

export default withRouter(connect(null, mapDispatchToProps)(App));