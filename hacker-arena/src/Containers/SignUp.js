import React from 'react';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange =this.onChange.bind(this);
    }
        onChange(e) {
            this.setState({[e.target.name]: e.target.value});
        }
        onSubmit(e) {
console.log('haha')
        }
    render() {
        return (
            <form onSumbmit= {this.onSumbit}>
                <h1>Join in The Game Today!</h1>
                <h1>SignUp to Create a Game Now!</h1>
                <div>
                    <label>Username</label>
                    <input
                    value = {this.state.username}
                    onChange= {this.onChange}
                    type= 'text'
                    name= 'username'
                    className = 'form-control'
                    />
                    <label>Password</label>
                    <input
                    value = {this.state.username}
                    onChange= {this.onChange}
                    type= 'text'
                    name= 'password'
                    className = 'form-control'
                    />
                    </div>
                    <div>
                        <button>
                            Join</button>
                            </div>
                            </form>
        )
    }
}

export default SignUp;