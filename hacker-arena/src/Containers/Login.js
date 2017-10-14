import React from 'react';
import firebase from '../Firebase/firebase';
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
   
    }
        onChange(e) {
            this.setState({[e.target.name]: e.target.value});
            
        }
        onSubmit(e) {
            e.preventDefault();
            let {navigate} = this.props;
            console.log('adfaf',this.state.email)
            console.log('adfaf',this.state.password)
            var email = this.state.email;
            var password = this.state.password
            firebase.auth().signInWithEmailAndPassword(email, password).then((val)=> {
                navigate('/GameRoom')
            
            })
                .catch(function(error) {
                console.log(error)
        
              });
            
       

        }
    render() {
        let { navigate } = this.props;
        return (
            <div>
                <h1>{this.state.errmsg}</h1>
                <button onClick={() => navigate('/SignUp') }> SignUp </button>
            <form onSubmit= {this.onSubmit}>
                <h1>Wanna Have Some Fun Today?</h1>
                <div>
                    <label>email</label>
                    <input
                    value = {this.state.email}
                    onChange= {this.onChange}
                    type= 'text'
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
                            Start Now</button>
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