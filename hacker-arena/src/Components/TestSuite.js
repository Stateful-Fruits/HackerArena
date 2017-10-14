import React from 'react';
import fire from '../Firebase/firebase';
import '../Styles/TestSuite.css';

/* Check if user is challenger or creator*/
const TestSuite = props => {
    return(
      <div id="testSuite">
        <div> PROBLEM TITLE{props.currentRoom.problem.title} </div>
        <div id="description"> PROBLEM DESCRIPTION {props.currentRoom.problem.description}</div>
        {fire.auth().currentUser === "" /* this.props.currentRoom.creatorName)*/ ? 
        (<div> TESTS + TESTS PASSED {'Toy Problem Passed Tests Placeholder' || this.props.creatorTestStatus}</div>)
        :
        (<div> TESTS + TESTS PASSED {'Toy Problem Passed Tests Placeholder' || this.props.challengerTestStatus}</div>)
        }
      </div>
    )
}


export default TestSuite;