import React from 'react';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:''
        }
    }
        onChange(e) {
            this.setState({[e.targe.name]: e.target.value});
        }
        onSubmit(e) {

        }
    render() {
        return (
            <form onSumbmit= {this.onSumbit.bind(this)}>
                <h1>Join in The Game Today!</h1>
                <h1>SignUp to Create a Game Now!</h1>
                <div>
                    <label>Username</label>
                    <input
                    value = {this.state.username}
                    onChange= {this.onChange.bind(this)}
                    type= 'text'
                    name= 'username'
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