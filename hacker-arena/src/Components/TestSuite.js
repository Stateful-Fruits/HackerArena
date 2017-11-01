import React from 'react';
import fire from '../Firebase/firebase';
import '../Styles/TestSuite.css';

/* Check if user is challenger or creator*/
const TestSuite = props => {
  let currentUser = props.currentUser;
  let username = currentUser.username;
  let usernameWhoseTestsShouldBeRendered = props.partnerName || username;
  let checkMark = <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                  </svg>
  let xMark = <svg className="xmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="xmark__circle" cx="26" cy="26" r="25" fill="none" />
                <path className="xmark__check" fill="none" d="M16 16 36 36 M36 16 16 36" />
              </svg>
    return(
      <div id="testSuite">
        <h3 className="problemTitle"> {props.currentRoom.problem.title} </h3>
        <h4> PROBLEM DESCRIPTION  </h4>
        <p id="description">{props.currentRoom.problem.description}</p>
        <h4 className="testTitle"> TESTS </h4>
        {(props.currentRoom.players[usernameWhoseTestsShouldBeRendered].testStatus && props.currentRoom.players[usernameWhoseTestsShouldBeRendered].testStatus.length > 1) ? 
          (<div className="testHolder">{props.currentRoom.players[usernameWhoseTestsShouldBeRendered].testStatus.map((tests, i) => {
            let passing = "PASSED!"
            if(!tests.passed){
              passing = "FAILED!"
            }
            return <div key={tests.inputs + i}>
              {passing === "FAILED!" ? 
              <span className="failure">{xMark}{passing} </span>
              : <span className="success">{checkMark} {passing} </span>
              }
              <span>{` Inputs: "${tests.inputs}" Expected: "${tests.expected}" Actual: "${tests.actual}"`}</span>
            </div>
          })}</div>) : null
          }
      </div>
    )
}


export default TestSuite;