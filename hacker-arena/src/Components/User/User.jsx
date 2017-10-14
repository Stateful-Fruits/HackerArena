// I will receive whatever results from the test result and make decision
import React, { PropTypes, Component } from 'react';

const defaultProps = {
    username: ''
}
const propTypes = {
    value: PropTypes.string.isRequired,
    changeValue: PropTypes.func.isRequired,
}


class User extends Component {
    constructor() {
        super();

    }
    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                    <input
                        type="text"
                        value={this.state.fullName}
                        onChange={this.handleFullNameChange}
                        name="fullName" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

User.defaultProps = defaultProps;
User.propTypes = propTypes;
export default User;