import React from 'react';
import '../Styles/TestSuite.css';

const TestSuite = props => {
    return(
      <div id="testSuite">
        <div> PROBLEM TITLE{'Toy Problem Title Placeholder' || this.props.problem.title} </div>
        <div id="description"> PROBLEM DESCRIPTION { 'Toy Problem Description Placeholder' || this.props.problem.description}</div>
        <div> TESTS + TESTS PASSED {'Toy Problem Passed Tests Placeholder' || this.props.room.user.passedTests}</div>
      </div>
    )
}


export default TestSuite;