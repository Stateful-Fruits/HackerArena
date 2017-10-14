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
                this.props.navigate('/');
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
                <button onClick={() => navigate('/Login') }> Login </button>
            <form onSubmit= {this.onSubmit}>
                <h1>Join in The Game Today!</h1>
                <h1>SignUp to Create a Game Now!</h1>
                <div>
                    <label>email</label>
                    <input
                    value = {this.state.email}
                    onChange= {this.onChange}
                    type= 'email'
                    name= 'email'
                    className = 'form-control'
                    />
                    <label>Password</label>
                    <input
                    value = {this.state.password}
                    onChange= {this.onChange}
                    type= 'password'
                    name= 'password'
                    className = 'form-control'
                    />
                    </div>
                    <div>
                        <button type = 'submit' value= 'submit'>
                            Join</button>
                            </div>
                            </form>
                            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    navigate: (route) => dispatch(push(route))
  });
  
  export default withRouter(connect(null, mapDispatchToProps)(SignUp));