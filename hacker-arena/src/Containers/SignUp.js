import React from 'react';
import firebase from '../Firebase/firebase';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {beforeAt} from '../Util'
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
   
    }
        onChange(e) {
            this.setState({[e.target.name]: e.target.value});
            
        }
        onSubmit(e) {
            
            e.preventDefault();
            let {navigate} = this.props;
            // db.Users.once('users').then((val)=> {
            //     console.log(val);
            // }) 
            var email = this.state.email;
            var password = this.state.password
            var db = firebase.database();
            firebase.auth().createUserWithEmailAndPassword(email, password).then((res,b)=> {
                
                const username = beforeAt(res.email); 
                db.ref('users/'+username).set({
                    id : res.uid,
                    email: res.email
                }
                )
                navigate('/');
                  console.log(res.uid,res.email);
              }).catch((err)=> {
                  this.setState({errmsg: err.message})})
                  console.log(this.state.errmsg)
            
       

        }
    render() {
        let { navigate } = this.props;
        return (
            <div>
                <h1>{this.state.errmsg}</h1>
                <div className="container">
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
                            Join</button>
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