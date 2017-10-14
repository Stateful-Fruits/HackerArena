import React from 'react';
import fire from '../Firebase/firebase';
import '../Styles/TestSuite.css';

/* Check if user is challenger or creator*/
const TestSuite = props => {
    return(
      <div id="testSuite">
        <div> PROBLEM TITLE{props.currentRoom.problem.title} </div>
        <div id="description"> PROBLEM DESCRIPTION {props.currentRoom.problem.description}</div>
        {(fire.auth().currentUser === props.currentRoom.creatorName) ? 
        (<div> TESTS + TESTS PASSED {props.currentRoom.creatorTestStatus.map(tests => {
          return <div>
            <p>{tests.passed} + " Inputs: " + {tests.inputs} + " Expected: " + {tests.expected} + " Actual: " + {tests.actual}</p>
          </div>
        })}</div>)
        :
        (<div> TESTS + TESTS PASSED {props.currentRoom.challengerTestStatus.map(tests => {
          return <div>
            <p>{tests.passed} + " Inputs: " + {tests.inputs} + " Expected: " + {tests.expected} + " Actual: " + {tests.actual}</p>
          </div>
        })}</div>)
        }
      </div>
    )
}


export default TestSuite;