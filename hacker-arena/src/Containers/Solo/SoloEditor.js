import ReactAce from 'react-ace-editor';
import React from 'react';
import $ from 'jquery';
import runTestsOnUserAnswer from '../../ToyProblemTesting/testUserAnswer';
import fire from '../../Firebase/firebase';

import '../../Styles/SoloEditor.css';

class SoloEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testStatus: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear =  this.handleClear.bind(this);
    this.liveInputs = this.liveInputs.bind(this);
  }
  
  componentDidMount() {
    let { currentRoom } = this.props;
    let username = fire.auth().currentUser.email.split('@')[0];
    // Creates template for current problem using userFn
    this.ace.editor.on("paste", () => {
      window.swal('You little cheater', '', 'warning');
      setTimeout( () => {
        this.ace.editor.setValue(`function ${this.props.currentRoom.problem.userFn}() {\n\n}`)
      }, 500);
    });
    this.ace.editor.setValue(`function ${this.props.currentRoom.problem.userFn}() {\n\n}`, 1);
  }

  liveInputs(){
    // Sends live inputs of user to database
    let username = fire.auth().currentUser.email.split('@')[0];  
    let liveInput = this.ace.editor.getValue();
    fire.database().ref(`rooms/${this.props.currentRoom.key}/players/${username}/liveInput`).set(liveInput)
  }

  handleSubmit(){
    let code = this.ace.editor.getValue();
    let { currentRoom } = this.props;
    let username = fire.auth().currentUser.email.split('@')[0];
    //TEST SUITE LOGIC
    let testStatus =  runTestsOnUserAnswer((code), currentRoom.problem.tests, currentRoom.problem.userFn);
    if(Array.isArray(testStatus) && testStatus.every(item => item.passed === true)){
      // if every test is passed
      window.swal('Great Job!', 'You passed all the tests!', 'success');
    } else window.swal('Oops...', 'Something went wrong!', 'error');

    if((testStatus.length === currentRoom.problem.tests.length) && testStatus){
      testStatus.forEach(items => {
        if(items.actual === undefined) items.actual = null;
      });
      console.log("hey look at me", testStatus, this.props.currentRoom)
      fire.database().ref(`rooms/${currentRoom.key}/players/${username}/testStatus`).set(testStatus);
    } else {
      window.swal('Oops...', 'Something went wrong!', 'error');
    }
    
    // ACE CONSOLE
    // Function to handle console.logs in the aceConsole
    let newLog = function(...theArgs){
      let results = ""; // eslint-disable-next-line  
      theArgs.forEach(argument => results += eval("'" + argument + "'"));
      $('#aceConsole').append(`<li id="log">${results}</li>`);
    }
    let consoleLogChange = "let console = {}\nconsole.log=" + newLog + "\n";
    let newCode = consoleLogChange + code;
    try { // eslint-disable-next-line
      eval(code) ? $('#aceConsole').append(`<li>${eval(newCode)}</li>`) : $('#aceConsole').append(`<li>undefined</li>`);
    }  catch(e) {
      $('#aceConsole').append(`<li>undefined</li>`);
    }
  }
  
  handleClear(){
    $('#aceConsole').empty(); // Clears the console
  }
  
  render() {
    let username = fire.auth().currentUser.email.split('@')[0];
    let { currentRoom } = this.props;
    return (
      <div id="editorSideSolo">
          <button className="btn editorHeader" color="secondary" size="lg" >Editor</button>
          <ReactAce
            mode="javascript"
            theme="monokai"
            onChange={this.liveInputs}
            style={{ height: '400px', width: '50vw' }}
            ref={instance => { this.ace = instance; }} // Let's put things into scope
          />
        <button className="btn submitButton" onClick={this.handleSubmit}> SUBMIT </button> 
        <button className="btn consoleHeader" color="secondary" size="lg" >
          <span>Console</span>
          <span className="clearConsole" onClick={this.handleClear}>X</span>
        </button>
        <ul id="aceConsole">
        </ul>
      </div>
    );
  }
}

export default SoloEditor;