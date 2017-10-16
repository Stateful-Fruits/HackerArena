import React from 'react';
import fire from '../Firebase/firebase';
import '../Styles/TestSuite.css';

/* Check if user is challenger or creator*/
const TestSuite = props => {
    return(
      <div id="testSuite">
        <h3 className="problemTitle"> {props.currentRoom.problem.title} </h3>
        <h4> PROBLEM DESCRIPTION  </h4>
        <p id="description">{props.currentRoom.problem.description}</p>
        <h4 className="testTitle"> TESTS </h4>
        {(props.currentRoom.creatorTestStatus.length > 1 || props.currentRoom.challengerTestStatus.length > 1 ) ? 
          ((fire.auth().currentUser.email.split('@')[0] === props.currentRoom.creatorName) ? 
          (<div className="testHolder">{props.currentRoom.creatorTestStatus.map((tests, i) => {
            let passing = "PASSED!"
            if(!tests.passed){
              passing = "FAILED!"
            }
            return <div key={tests.inputs + i}>
              {passing === "FAILED!" ? 
              <span className="failure">{passing} </span>
              : <span className="success">{passing} </span>
              }
              <span>{` Inputs: "${tests.inputs}" Expected: "${tests.expected}" Actual: "${tests.actual}"`}</span>
            </div>
          })}</div>)
          :
          (<div className="testHolder">{props.currentRoom.challengerTestStatus.map((tests, i) => {
            let passing = "PASSED!"
            if(!tests.passed){
              passing = "FAILED!"
            }
            return <div key={tests.inputs + i}>
              {passing === "FAILED!" ? 
              <span className="failure">{passing} </span>
              : <span className="success">{passing} </span>
              }
              <span>{` Inputs: "${tests.inputs}" Expected: "${tests.expected}" Actual: "${tests.actual}"`}</span>
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