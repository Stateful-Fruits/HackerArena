import ReactAce from 'react-ace-editor';
import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import runTestsOnUserAnswer from '../ToyProblemTesting/testUserAnswer.js';
import Disruptions from './Disruptions/disruptions';
import updateTestSuite from '../Actions/updateTestSuite';

import '../Styles/CodeEditor.css';
 
class CodeEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      testStatus: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear =  this.handleClear.bind(this);
  }

  componentDidMount(){
    // const editor = this.ace.editor;
    // editor.setTheme("ace/theme/monokai");
    // editor.getSession().setMode("ace/mode/javascript");
  }

  // NEEDS TO TAKE INPUT CODE OF EDITOR,
  // UTILIZE ROOM.PROBLEM.TESTCASES TO GRAB TEST RESULTS
  // SET TEST RESULTS IN ROOM DATABASE 

  handleSubmit(){
    let code = this.ace.editor.getValue();
    //TEST SUITE
    // place here
    // testStatus object// actual,expected,passed,inputs
    this.setState({testStatus: runTestsOnUserAnswer(code,this.props.testCases)});
    // ACE CONSOLE
    // Function to handle console.logs in the aceConsole
    let newLog = function(...theArgs){
      let results = "";
      let args = [].slice.call(arguments);
      args.forEach( argument => {
      // eslint-disable-next-line  
        results += eval("'" + argument + "'");
      })
      //Replace with append to aceConsole
      // return results;
      // console.log(results);
      // return results;
      $('#aceConsole').append(`<li id="log">${results}</li>`);
    }

    let consoleLogChange = "let console = {}\nconsole.log=" + newLog + "\n";
    let newCode = consoleLogChange + code;

    try { 
      // eslint-disable-next-line
      $('#aceConsole').append(`<li>${eval(newCode)}</li>`);
    } catch (e) {
      $('#aceConsole').append(`<li>undefined</li>`);
    }
    // DISRUPTION TESTS
    // $('#canvas').css({"filter": "blur(3px)"})
    // $("#canvas").css({"transform": "scaleX(-1)"});
    // $("#ace-editor").css({"background": "black", "color": "black"})
  }
  
  handleClear(){
    $('#aceConsole').empty();
  }

  render() {
    return (
      <div>
          <ReactAce
            mode="javascript"
            theme="monokai"
            style={{ height: '400px', width: '50vw' }}
            ref={instance => { this.ace = instance; }} // Let's put things into scope
          />
        <button onClick={this.handleSubmit}> SUBMIT </button>
        <ul id="aceConsole"></ul>
        <button onClick={this.handleClear}> CLEAR CONSOLE </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('mapped state to props', state);
  return ({
    // ROOM DATA? 
    // room.testData
    // testCases: state.gameRooms.testCases
  })
}

const mapDispatchToProps = (dispatch) => ({
  updateTestSuite: () => dispatch(updateTestSuite(this.state.testStatus))
})

export default connect(mapStateToProps, mapDispatchToProps)(CodeEditor);