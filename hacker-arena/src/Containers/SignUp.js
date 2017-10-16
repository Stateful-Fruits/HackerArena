import React from 'react';
import firebase from '../Firebase/firebase';
import provider from '../Firebase/oauth/oauth.js';

import auth from './AuthHelpers/helpers';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

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
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});  
  }

  onSubmit(e) {  
    e.preventDefault();
    let {navigate} = this.props;
    let email = this.state.email;
    let password = this.state.password;

    auth.normalSignUp(email, password, navigate);
  }

  signInWithGoogle(e) {
    let {navigate} = this.props;
    auth.googleAuth(navigate);
  }

  signInWithFacebook(e) {
    let {navigate} = this.props;
    auth.fbookAuth(navigate);
  }

  render() {
    let { navigate } = this.props;
    return (
      <div>
        <h1>{this.state.errmsg}</h1>
        <div className="container">
          <button onClick={() => navigate('/Login') }> Login </button>
          <button onClick={this.signInWithGoogle}>Log in with google</button>
          <button onClick={this.signInWithFacebook}>Log in with facebook</button>

          <form onSubmit= {this.onSubmit}>
            <div className='header'>
              <h2>Join in The Game Today!</h2>
              <h2>SignUp to Create a Game Now!</h2>
            </div>

            <div>
              <label className='header'>email</label>

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
                Join
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
    navigate: (route) => dispatch(push(route))
  });
  
  export default withRouter(connect(null, mapDispatchToProps)(SignUp));