// I will receive whatever results from the test result and make decision
import React from 'react';
import { connect } from 'react-redux';

const Result = (props) => {
        if (props.isWin) {
            return (
                <div> Your are win</div>
            );
        }
        return (
            <div>Better Next Time</div>
        )
    }

export default connect()(Result);
