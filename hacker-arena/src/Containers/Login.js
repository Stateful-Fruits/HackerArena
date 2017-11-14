import React from 'react';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import updateBoardRooms from '../Actions/updateBoardRooms';
import updateGameRooms from '../Actions/updateGameRooms';
import updateProblems from '../Actions/updateProblems';

import { normalLogin, googleAuth, fbookAuth } from '../Helpers/authHelpers';
import syncToDb from '../Firebase/syncToDb'

import '../Styles/Login.css';


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
    this.signInWithGoogle =this.signInWithGoogle.bind(this);
    this.signInWithFacebook =this.signInWithFacebook.bind(this);
    
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    let { updateGameRooms, updateProblems, updateBoardRooms, navigate } = this.props;
    let email = this.state.email;
    let password = this.state.password;
    normalLogin(email, password, navigate)
      .then(() => {
        syncToDb(updateGameRooms, updateProblems, updateBoardRooms);        
      });
  }

  signInWithGoogle(e) {
    let { updateGameRooms, updateProblems, updateBoardRooms, navigate } = this.props;    
    googleAuth(navigate, updateGameRooms, updateProblems, updateBoardRooms)
      .then(() => {
        syncToDb(updateGameRooms, updateProblems, updateBoardRooms);        
      });
  }

  signInWithFacebook(e) {
    let { updateGameRooms, updateProblems, updateBoardRooms, navigate } = this.props;    
    fbookAuth(navigate, updateGameRooms, updateProblems, updateBoardRooms)
      .then(() => {
        syncToDb(updateGameRooms, updateProblems, updateBoardRooms);        
      });
  }

  render() {
    let { navigate } = this.props;
    return (
      <div id='Login'>
        <h1>{this.state.errmsg}</h1>
        <div className="container signUpForm">
          <img src='../profile.jpg' alt='Waiting' />
          <button onClick={() => navigate('/SignUp') }> SignUp </button>
          <button onClick={this.signInWithGoogle}>Log in with google</button>
          <button onClick={this.signInWithFacebook}>Log in with facebook</button>
          <form onSubmit= {this.onSubmit}>

          <h1 className='header'>Wanna Have Some Fun Today?</h1>

          <div className= "form-input">
            <label className='header'>email</label> 
            
            <input
            value = {this.state.email}
            onChange= {this.onChange}
            placeholder= 'Enter your email'
            type= 'text'
            name= 'email'
            className = 'form-control'
            />

            <label className='header'>Password</label>
          </div>
          
          <div>
            <input
            value = {this.state.password}
            onChange= {this.onChange}
            type= 'password'
            name= 'password'
            className = 'form-control'
            placeholder="Enter Password"
            />
          </div>

          <a onClick={() => navigate('/SignUp') }> SignUp </a>

          <div>
            <button type = 'submit' value= 'submit' className="btn-login">
              Start Now
            </button>
          </div>
          <div className="signUpButtons">
              <button className="btn loginButton" onClick={() => navigate('/Login') }> Login </button>
              <button className="btn googleLogin" onClick={this.signInWithGoogle}>
              <img className="googleLogo" alt='goog' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png'/>
              Log in with google
              </button>
              <button className="btn facebookLogin" onClick={this.signInWithFacebook}>
              <img className="fbLogo" alt='fb' src="http://www.classiclitho.com/wp-content/uploads/2015/05/facebook-logo-png-transparent-background-1024x1024.png"/>
              Log in with facebook
              </button> 
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