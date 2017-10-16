import ReactAce from 'react-ace-editor';
import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import runTestsOnUserAnswer from '../ToyProblemTesting/testUserAnswer';
import fire from '../Firebase/firebase';
import db from '../Firebase/db';
import Disruptions from './Disruptions/disruptions';
import updateTestSuite from '../Actions/updateTestSuite';

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
    this.ace.editor.setValue(`function ${this.props.currentRoom.problem.userFn}() {\n\n}`, 1);
    setInterval(()=> {
      if(fire.auth().currentUser.email.split('@')[0] === this.props.currentRoom.creatorName){
        let newCreatorCredits = this.props.currentRoom.creatorCredits + 5;
        fire.database().ref('rooms/' + this.props.currentRoom.key + '/creatorCredits').set(newCreatorCredits);
        let newChallengerCredits = this.props.currentRoom.challengerCredits + 5;
        fire.database().ref('rooms/' + this.props.currentRoom.key + '/challengerCredits').set(newChallengerCredits);
      }
    }, 30000)
  }

  componentWillUpdate(){
    let username = fire.auth().currentUser.email.split('@')[0];    
    //  && (this.props.currentRoom.winner !== fire.auth().currentUser.email.split('@')[0])
    if(this.props.currentRoom.winner !== "" 
     && (this.props.currentRoom.winner !== fire.auth().currentUser.email.split('@')[0])){
      window.swal({
        title: `The Winner is ${this.props.currentRoom.winner}!`,
        width: 600,
        padding: 100,
        background: '#fff url(//bit.ly/1Nqn9HU)'
      })
      fire.database().ref('rooms/' + this.props.currentRoom.key + '/winner').set("")
      fire.database().ref('users/' + username).once('value').then(snapshot => {
        let losses = snapshot.val().losses + 1;
        console.log('losses are now', losses);
        fire.database().ref('users/' + username + '/losses').set(losses);
      })
    } 
    // else if (this.props.currentRoom.winner !== "" && (this.props.currentRoom.winner === fire.auth().currentUser.email.split('@')[0])){
    //   window.swal(
    //     'Good job!',
    //     'You passed all the tests!',
    //     'success'
    //   )
    //   fire.database().ref('rooms/' + this.props.currentRoom.key + '/winner').set("")
    // }

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
    let func = e.target.id.split(" ")[0];
    let cost = e.target.id.split(" ")[1];
    console.log("disruptions", this.props.currentRoom.challengerDisruptions, this.props.currentRoom.creatorDisruptions);
    let challengerDisruptions = this.props.currentRoom.challengerDisruptions
    let creatorDisruptions = this.props.currentRoom.creatorDisruptions
    challengerDisruptions = challengerDisruptions.concat(func);
    creatorDisruptions = creatorDisruptions.concat(func);
    console.log(challengerDisruptions, creatorDisruptions, func);
    
    if(fire.auth().currentUser.email.split('@')[0] === this.props.currentRoom.creatorName 
    && this.props.currentRoom.creatorCredits >= cost){
      fire.database().ref('rooms/' + this.props.currentRoom.key + '/challengerDisruptions').set(challengerDisruptions)
      let newCreatorCredits = this.props.currentRoom.creatorCredits - cost;
      fire.database().ref('rooms/' + this.props.currentRoom.key + '/creatorCredits').set(newCreatorCredits);
      
    } else if (fire.auth().currentUser.email.split('@')[0] === this.props.currentRoom.challengerName
    && this.props.currentRoom.challengerCredits >= cost){
      fire.database().ref('rooms/' + this.props.currentRoom.key + '/creatorDisruptions').set(creatorDisruptions)
      let newChallengerCredits = this.props.currentRoom.challengerCredits - cost;
      fire.database().ref('rooms/' + this.props.currentRoom.key + '/challengerCredits').set(newChallengerCredits);
    }
      // if(fire.auth().currentUser.email.split('@')[0] === this.props.currentRoom.creatorName) {
      //   fire.database().ref('rooms/' + this.props.currentRoom.key + '/challengerDisruptions').set(challengerDisruptions)
      // } else {
      //   fire.database().ref('rooms/' + this.props.currentRoom.key + '/creatorDisruptions').set(creatorDisruptions)
      // }
  }

  receiveDisruptions(func){
    Disruptions[func](this.ace.editor);
  }

  handleSubmit(){
    let code = this.ace.editor.getValue();
    let username = fire.auth().currentUser.email.split('@')[0];
    //TEST SUITE LOGIC
    let testStatus =  runTestsOnUserAnswer((code),this.props.currentRoom.problem.tests, this.props.currentRoom.problem.userFn);
    if(Array.isArray(testStatus)){
      console.log(testStatus);
      if(testStatus.every(item => {
        return item.passed === true;
      })) {
        window.swal(
          'Good job!',
          'You passed all the tests!',
          'success'
        )
        fire.database().ref('rooms/' + this.props.currentRoom.key + '/winner').set(username);
        fire.database().ref('users/' + username).once('value').then(snapshot => {
          let wins = snapshot.val().wins + 1;
          console.log('wins are now', wins);
          fire.database().ref('users/' + username + '/wins').set(wins);
        })
      } else {
        window.swal(
          'Oops...',
          'Something went wrong!',
          'error'
        )
      }
    }
    console.log("the props in CodeEditor", this.props)
    console.log("the TEST STATUS", testStatus);
    if(testStatus[0] && testStatus[0].actual){
      if(fire.auth().currentUser.email.split('@')[0] === this.props.currentRoom.creatorName) {
        fire.database().ref('rooms/' + this.props.currentRoom.key + '/creatorTestStatus').set(testStatus)
      } else {
        fire.database().ref('rooms/' + this.props.currentRoom.key + '/challengerTestStatus').set(testStatus)
      }
    } else {
      window.swal(
        'Oops...',
        'Something went wrong!',
        'error'
      )
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
      // console.log("CODE", eval(code));
      console.log("NEWCODE", eval(newCode));
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
    // $('#aceConsole').append(`<li>Console</li>`);
  }
  
  // {/* <button className="btn clearConsole" onClick={this.handleClear}> CLEAR CONSOLE </button> */}
  render() {
    return (
      <div id="editorSide">
          <div id="disruptionsBar">
            {fire.auth().currentUser.email.split('@')[0] === this.props.currentRoom.creatorName ?
          <button className=" btn disruptionsHeader"><span className="dc badge">{this.props.currentRoom.creatorCredits}</span> Disruptions</button>
          :
          <button className=" btn disruptionsHeader"><span className="dc badge">{this.props.currentRoom.challengerCredits}</span> Disruptions</button>
            }
          <button className="btn" id="Blind 1" onClick={this.sendDisruptions}><span className="d1 badge">1</span> Blind</button>
          <button className="btn" id="Python 1" onClick={this.sendDisruptions}><span className="d1 badge">1</span> Python</button>
          <button className="btn" id="Kennify 1" onClick={this.sendDisruptions}><span className="d1 badge">1</span> Kennify</button>
          <button className="btn" id="LineBomb 3" onClick={this.sendDisruptions}><span className="d3 badge">3</span> LineBomb</button>
          <button className="btn" id="Fog 3" onClick={this.sendDisruptions}><span className="d3 badge">3</span> Fog</button>
          <button className="btn" id="Flip 3" onClick={this.sendDisruptions}><span className="d3 badge">3</span> Flip</button>
          <button className="btn" id="Zoom 3" onClick={this.sendDisruptions}><span className="d3 badge">3</span> Old Man</button>
          <button className="btn" id="Sublime 5" onClick={this.sendDisruptions}><span className="d5 badge">5</span> Sublime</button>
          <button className="btn" id="Move 5" onClick={this.sendDisruptions}><span className="d5 badge">5</span> Move</button>
          <button className="btn" id="ActualTimeTravel 5" onClick={this.sendDisruptions}><span className="d5 badge">5</span> Undo</button>
          <button className="btn" id="Wipe 10" onClick={this.sendDisruptions}><span className="d10 badge">10</span> Wipe</button>
          </div>
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

export default CodeEditor;