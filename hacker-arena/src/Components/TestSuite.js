import React from 'react';
import fire from '../Firebase/firebase';
import '../Styles/TestSuite.css';

/* Check if user is challenger or creator*/
const TestSuite = props => {
    return(
      <div id="testSuite">
        <div> PROBLEM TITLE{props.currentRoom.problem.title} </div>
        <div id="description"> PROBLEM DESCRIPTION {props.currentRoom.problem.description}</div>
        {(props.currentRoom.creatorTestStatus && props.currentRoom.challengerTestStatus) ? 
          ((fire.auth().currentUser.email.split('@')[0] === props.currentRoom.creatorName) ? 
          (<div> TESTS + TESTS PASSED {props.currentRoom.creatorTestStatus.map((tests, i) => {
            return <div key={tests.inputs + i}>
              <p>{tests.passed} Inputs: "{tests.inputs}" Expected: "{tests.expected}" Actual: "{tests.actual}"</p>
            </div>
          })}</div>)
          :
          (<div> TESTS + TESTS PASSED {props.currentRoom.challengerTestStatus.map((tests, i) => {
            return <div key={tests.inputs+i}>
            <p>{tests.passed} Inputs: "{tests.inputs}" Expected: "{tests.expected}" Actual: "{tests.actual}"</p>
            </div>
          })}</div>)
          )
          : 
          null
        }
      </div>
    )
}


export default TestSuite;