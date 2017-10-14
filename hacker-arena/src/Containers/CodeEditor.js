import ReactAce from 'react-ace-editor';
import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import runTestsOnUserAnswer from '../ToyProblemTesting/testUserAnswer';
import fire from '../Firebase/firebase';
import db from '../Firebase/db';
import Disruptions from './Disruptions/disruptions';
import updateTestSuite from '../Actions/updateTestSuite';
// import swal from 'sweetalert2';

import '../Styles/CodeEditor.css';
 


class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testStatus: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear =  this.handleClear.bind(this);
    this.liveInputs = this.liveInputs.bind(this);
    this.sendDisruptions = this.sendDisruptions.bind(this);
    this.receiveDisruptions = this.receiveDisruptions.bind(this);
  }

  componentDidMount(){
    console.log(" THE CURRENT CREATOR", this.props.currentRoom.creatorName)
    console.log(" THE CURRENT USER", fire.auth().currentUser)
    // const editor = this.ace.editor;
    // editor.setTheme("ace/theme/monokai");
    // editor.getSession().setMode("ace/mode/javascript");
  }

  componentWillUpdate(){
    if(this.props.currentRoom.winner !== "" && this.props.currentRoom.winner !== fire.auth().currentUser.email.split('@')[0]){
      window.swal({
        title: `The Winner is ${this.props.currentRoom.winner}!`,
        width: 600,
        padding: 100,
        background: '#fff url(//bit.ly/1Nqn9HU)'
      })
    }

    if(fire.auth().currentUser.email.split('@')[0] === this.props.currentRoom.creatorName) {
      console.log(fire.auth().currentUser.email.split('@')[0])
      if(this.props.currentRoom.creatorDisruptions){
        this.props.currentRoom.creatorDisruptions.forEach(disruption => {
          if(disruption !== ""){
            console.log(disruption)
            this.receiveDisruptions(disruption);
          }
        })
        fire.database().ref('rooms/' + this.props.currentRoom.key + '/creatorDisruptions').set([""])
      }

      // if(fire.auth().currentUser.email.split('@')[0] === this.props.currentRoom.challengerName) {
      //   if(this.props.currentRoom.challengerDisruptions){
      //     this.props.currentRoom.challengerDisruptions.forEach(disruption => {
      //       if(disruption !== ""){
      //         console.log(disruption)
      //         this.receiveDisruptions(disruption);
      //       }
      //     })
      //     fire.database().ref('rooms/' + this.props.currentRoom.key + '/challengerDisruptions').set([""])
      //   }
      // }
    } else {
      if(this.props.currentRoom.challengerDisruptions){
        this.props.currentRoom.challengerDisruptions.forEach(disruption => {
          if(disruption !== ""){
            console.log("2",disruption)
            this.receiveDisruptions(disruption);
          }
        })
        fire.database().ref('rooms/' + this.props.currentRoom.key + '/challengerDisruptions').set([""])
      }
    }
  }
  // NEEDS TO TAKE INPUT CODE OF EDITOR,
  // UTILIZE ROOM.PROBLEM.TESTCASES TO GRAB TEST RESULTS
  // SET TEST RESULTS IN ROOM DATABASE 
  
  liveInputs(){
    let liveInput = this.ace.editor.getValue();
    if(fire.auth().currentUser.email.split('@')[0] === this.props.currentRoom.creatorName) {
      fire.database().ref('rooms/' + this.props.currentRoom.key + '/creatorLiveInput').set(liveInput)
    } else {
      fire.database().ref('rooms/' + this.props.currentRoom.key + '/challengerLiveInput').set(liveInput)
    }
  }

  sendDisruptions(e){
    let func = e.target.id;
    console.log("disruptions", this.props.currentRoom.challengerDisruptions, this.props.currentRoom.creatorDisruptions);
    let challengerDisruptions = this.props.currentRoom.challengerDisruptions
    let creatorDisruptions = this.props.currentRoom.creatorDisruptions
    challengerDisruptions = challengerDisruptions.concat(func);
    creatorDisruptions = creatorDisruptions.concat(func);
    console.log(challengerDisruptions, creatorDisruptions, func);
    if(fire.auth().currentUser.email.split('@')[0] === this.props.currentRoom.creatorName) {
      fire.database().ref('rooms/' + this.props.currentRoom.key + '/challengerDisruptions').set(challengerDisruptions)
    } else {
      fire.database().ref('rooms/' + this.props.currentRoom.key + '/creatorDisruptions').set(creatorDisruptions)
    }
  }

  receiveDisruptions(func){
    Disruptions[func](this.ace.editor);
  }

  handleSubmit(){
    let code = this.ace.editor.getValue();
    //TEST SUITE LOGIC
    // place here
    // testStatus object// actual,expected,passed,inputs
    // this.setState({testStatus: runTestsOnUserAnswer(code,this.props.testCases)});
    let testStatus =  runTestsOnUserAnswer((code),this.props.currentRoom.problem.tests, this.props.currentRoom.problem.userFn);
    if(testStatus.every(item => {
      return item.passed === true;
    })) {
      window.swal(
        'Good job!',
        'You passed all the tests!',
        'success'
      )
      fire.database().ref('rooms/' + this.props.currentRoom.key + '/winner').set(fire.auth().currentUser.email.split('@')[0])
    } else {
      window.swal(
        'Oops...',
        'Something went wrong!',
        'error'
      )
    }
    console.log("the props in CodeEditor", this.props)
    console.log("the TEST STATUS", testStatus);
    if(fire.auth().currentUser.email.split('@')[0] === this.props.currentRoom.creatorName) {
      fire.database().ref('rooms/' + this.props.currentRoom.key + '/creatorTestStatus').set(testStatus)
    } else {
      fire.database().ref('rooms/' + this.props.currentRoom.key + '/challengerTestStatus').set(testStatus)
    }
  
    // ACE CONSOLE
    // Function to handle console.logs in the aceConsole
    let newLog = function(...theArgs){
      let results = "";
      let args = [].slice.call(arguments);
      args.forEach( argument => {
      // eslint-disable-next-line  
        results += eval("'" + argument + "'");
      })
      $('#aceConsole').append(`<li id="log">${results}</li>`);
    }

    let consoleLogChange = "let console = {}\nconsole.log=" + newLog + "\n";
    let newCode = consoleLogChange + code;

      // eslint-disable-next-line
    try {
      console.log(eval(code));
      if(eval(code)){
          $('#aceConsole').append(`<li>${eval(newCode)}</li>`);
      } else {
        $('#aceConsole').append(`<li>undefined</li>`);
      }
    }  catch(e) {
      $('#aceConsole').append(`<li>undefined</li>`);
    }
  }
  
  handleClear(){
    $('#aceConsole').empty();
  }

  render() {
    return (
      <div id="editorSide">
          <div id="disruptionsBar">
          <button id="Wipe" onClick={this.sendDisruptions}>Wipe</button>
          <button id="LineBomb" onClick={this.sendDisruptions}>LineBomb</button>
          <button id="Fog" onClick={this.sendDisruptions}>Glaucoma Mode</button>
          <button id="Blind" onClick={this.sendDisruptions}>Night Mode</button>
          <button id="Flip" onClick={this.sendDisruptions}>Flip</button>
          <button id="Zoom" onClick={this.sendDisruptions}>Old Man mode</button>
          <button id="Sublime" onClick={this.sendDisruptions}>Sublime</button>
          <button id="Move" onClick={this.sendDisruptions}>Catch Me If You Can</button>
          <button id="Python" onClick={this.sendDisruptions}>Python</button>
          <button id="Kennify" onClick={this.sendDisruptions}>Kennify</button>
          <button id="ActualTimeTravel" onClick={this.sendDisruptions}>ActualTimeTravel(Find Grandma)</button>
          </div>
          <ReactAce
            mode="javascript"
            theme="monokai"
            onChange={this.liveInputs}
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

// const mapStateToProps = (state) => {
//   console.log('mapped state to props', state);
//   return ({
//     // ROOM DATA? 
//     // room.testData
//     // tests: state.gameRooms.testCases
//   })
// }

// const mapDispatchToProps = (dispatch) => ({
//   updateTestSuite: () => dispatch(updateTestSuite(this.state.testStatus))
// })

export default CodeEditor;