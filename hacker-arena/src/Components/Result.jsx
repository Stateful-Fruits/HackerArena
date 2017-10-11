// I will receive whatever results from the test result and make decision
import React, { PropTypes, Component } from 'react';

const defaultProps = {
    username: ''
}
const propTypes = {
    username: PropTypes.string,
    isWin: PropTypes.bool.isRequired,
}


class Result extends Component {
    constructor() {
        super()
        this.someFunction = this.someFunction.bind(this);
    }
    someFunction() {
     
    }
    render() {
        const { username, isWin }
        if (isWin) {
            return (
                <div> Your are win</div>
            );
        }
        return (
            <div>Better Next Time</div>
        )
    }
}

Result.defaultProps = defaultProps;
Result.propTypes = propTypes;
export default Result;