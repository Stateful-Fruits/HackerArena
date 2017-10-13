import React, {Component} from 'react';
import {
    connect
} from 'react-redux';
// import { push } from 'react-router-redux';
// import {login} from '../Actions/User.js';
//this Component is for user who join the room without Login/Signup/
const mapStateToProps = (state) => {
    return {
        isLoginSuccess: state.isLoginSuccess,
        isLoginPending: state.isLoginPending,
        isLoginError : state.isLoginError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username) => {
            // dispatch(login(username));
        },
    };
};

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e) {
        e.preventDefault();
        let {username} = this.state;
        this.props.login(username);
        this.setState({
            username: ''
        })
    }
    render() {
        let {username} = this.state; 
   return (
      
            <div>
                <h1>YOUR NAME? </h1>
                <form onSubmit={this.onSubmit}>
                    <input
                        type="username"
                        name="username"
                        onChange={e => this.setstate({username: e.target.value})}
                         />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
}
}

export default connect(mapStateToProps, mapDispatchToProps)(User);