import React from 'react';
// import firebase from '../Firebase/firebase';
// import provider from '../Firebase/oauth/oauth.js';

import { normalSignUp, googleAuth, fbookAuth } from '../Helpers/authHelpers';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import syncToDb from '../Firebase/syncToDb'
import updateBoardRooms from '../Actions/updateBoardRooms';
import updateGameRooms from '../Actions/updateGameRooms';
import updateProblems from '../Actions/updateProblems';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      errmsg:''
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange =this.onChange.bind(this);
    this.signInWithGoogle = this.signInWithGoogle.bind(this);        
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});  
  }

  onSubmit(e) {  
    e.preventDefault();
    let { updateGameRooms, updateProblems, updateBoardRooms, navigate } = this.props;
    let email = this.state.email;
    let password = this.state.password;

    normalSignUp(email, password, navigate)
      .then(() => {
        syncToDb(updateGameRooms, updateProblems, updateBoardRooms);        
      })
      .catch((err)=> {
        this.setState({errmsg: err.message})
      });
  }

  signInWithGoogle(e) {
    let { updateGameRooms, updateProblems, updateBoardRooms, navigate } = this.props;    
    googleAuth(navigate)
      .then(() => {
        syncToDb(updateGameRooms, updateProblems, updateBoardRooms);        
      })
  }

  signInWithFacebook(e) {
    let { updateGameRooms, updateProblems, updateBoardRooms, navigate } = this.props;    
    fbookAuth(navigate)
      .then(() => {
        syncToDb(updateGameRooms, updateProblems, updateBoardRooms);        
      })
  }

  render() {
    let { navigate } = this.props;
    return (
      <div>
        <h1>{this.state.errmsg}</h1>
        <div className="signUpForm">

          <form onSubmit= {this.onSubmit}>
            <div className='header'>
              <h3 className="h3">Sign Up Today! </h3>
            </div>

            <div>
              <label className='header'>Email</label>

              <input
                value = {this.state.email}
                onChange= {this.onChange}
                type= 'email'
                name= 'email'
                className = 'form-control'
              />

              <label className='header'>Password</label>

              <input
                value = {this.state.password}
                onChange= {this.onChange}
                type= 'password'
                name= 'password'
                className = 'form-control'
              />

            </div>

            <a onClick={() => navigate('/Login') }> Login </a>
            <div>
              <button type = 'submit' value= 'submit' className="btn-login">
                Sign Up
              </button>
            <div className="signUpButtons">
              <button className="btn loginButton" onClick={() => navigate('/Login') }> Login </button>
              <button className="btn googleLogin" onClick={this.signInWithGoogle}>
              <img className="googleLogo" src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png'/>
              Log in with google
              </button>
              <button className="btn facebookLogin" onClick={this.signInWithFacebook}>
              <img className="fbLogo" src="http://www.classiclitho.com/wp-content/uploads/2015/05/facebook-logo-png-transparent-background-1024x1024.png"/>
              Log in with facebook
              </button> 
            </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
    navigate: (route) => dispatch(push(route)),
    updateGameRooms: (rooms) => dispatch(updateGameRooms(rooms)),
    updateProblems: (problems) => dispatch(updateProblems(problems)),
    updateBoardRooms: (rooms) => dispatch(updateBoardRooms(rooms)),
  });
  
  export default withRouter(connect(null, mapDispatchToProps)(SignUp));