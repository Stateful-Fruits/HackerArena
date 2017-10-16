import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Styles/App.css';

import updateGameRooms from './Actions/updateGameRooms';
import updateProblems from './Actions/updateProblems';
import CodeEditor from './Containers/CodeEditor.js';
import UserButton from  './Components/User/UserButton.js';

import fire from './Firebase/firebase';
import db from './Firebase/db';
import populateDb from './Firebase/dbFiller/populateDb';

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
  // firebase.auth().signOut().then(function() {
  //   // Sign-out successful.
  // }, function(error) {
  //   // An error happened.
  // });
  render() {
    let { navigate } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">HACKER ARENA</h1>
        </header>
        {/* <button onClick={ () => navigate('/') }>
          <h3>Home</h3>
        </button>
        <button onClick={ () => navigate('/About') }>
          <h3>About</h3>
        </button>
        <button onClick={ () => navigate('/AddProblem') }>
          <h3>Add Problem</h3>
        </button>
        {
          fire.auth().currentUser ? (
          <button>
            <h3>Hi { fire.auth().currentUser.email.split('@')[0] }</h3>
          </button>
          ) : (
          <button onClick={ () => navigate('/SignUp') }>
            <h3>SignUp/Login</h3>
          </button>
          )
        }
        <button onClick={()=>fire.auth().signOut().then(()=>{
navigate('/Login');
        })}> Logout</button> */}

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <ul className="navbar-nav ml-auto mr-auto">
            <li className="leftNav nav-item navbar-brand" onClick={ () => navigate('/') }>Home</li>
            <li className="leftNav nav-item navbar-brand" onClick={ () => navigate('/About') }>About</li>
            <li className="leftNav nav-item navbar-brand" onClick={ () => navigate('/AddProblem') }>Add Problem</li>
            
          {
            fire.auth().currentUser ? (
              <li className="nav-item rightNav navbar-brand"> Hi { fire.auth().currentUser.email.split('@')[0] }</li>
            ) : (
              <li className="nav-item rightNav navbar-brand" onClick={ () => navigate('/SignUp') }>Sign Up / Log In</li>
            )
          }
          <li className="nav-item rightNav navbar-brand" onClick={()=>fire.auth().signOut().then(()=>{
  navigate('/Login');
          })}> Logout</li>
          </ul>
        </nav>
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