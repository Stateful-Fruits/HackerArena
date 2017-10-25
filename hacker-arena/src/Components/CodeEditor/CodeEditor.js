import ReactAce from 'react-ace-editor';
import React from 'react';
import $ from 'jquery';
import runTestsOnUserAnswer from '../../ToyProblemTesting/testUserAnswer';
import fire from '../../Firebase/firebase';
import Disruptions from './disruptions';
import DisruptionsBar from './DisruptionsBar';
import BlockDisruptionsBar from './../Pair/BlockDisruptionsBar'

import helpers from '../../Helpers/helpers.js';

import '../../Styles/CodeEditor.css';

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testStatus: "",
      diffusalCodes: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear =  this.handleClear.bind(this);
    this.liveInputs = this.liveInputs.bind(this);
    this.sendDisruptions = this.sendDisruptions.bind(this);
    this.receiveDisruptions = this.receiveDisruptions.bind(this);
    this.endRoundWithClientAsVictor = this.endRoundWithClientAsVictor.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.clearDisruption = this.clearDisruption.bind(this);
  }
  
  componentDidMount() {
    let { currentRoom } = this.props;
    let username = fire.auth().currentUser.email.split('@')[0];
    // Creates template for current problem using userFn
    this.ace.editor.on("paste", () => {
      window.swal('You little cheater', '', 'warning');
      setTimeout( () => {
        this.ace.editor.setValue(`function ${this.props.currentRoom.problem.userFn}() {\n\n}`);
      }, 500);
    });
    this.ace.editor.setValue(`function ${this.props.currentRoom.problem.userFn}() {\n\n}`, 1);
    // Increments user credits by 5 every 30 seconds
    let intervalId = setInterval(()=> {
      if(this.props.currentRoom.players[username].credits <= 50) {
        fire.database().ref(`rooms/${currentRoom.key}/players/${username}/credits`).set(this.props.currentRoom.players[username].credits + 5);
      }
    }, 30000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  componentWillUpdate(){
    // Alert users if someone has won the game
    let { currentRoom } = this.props;
    let username = fire.auth().currentUser.email.split('@')[0];    
    // Check for disruptions sent to the user
    if(currentRoom.players[username].disruptions.length > 1){
      currentRoom.players[username].disruptions.forEach(disruption => {
        if(disruption !== "") {
          if (currentRoom.isPairRoom) {
            let clearCode = setTimeout(() => {
              this.receiveDisruptions(disruption);
              let disruptions = this.state.diffusalCodes;
              let indOfDisruptionToClear = disruptions.findIndex(clearDisr => clearDisr.disruptionName === disruption);
            
              disruptions.splice(indOfDisruptionToClear, 1)[0];

              this.setState({
                diffusalCodes: disruptions
              })
            }, 5000);
        
            let currentCodes = this.state.diffusalCodes;
            console.log('disruption name', disruption);
            currentCodes.push({
              disruptionName: disruption,
              clearCode: clearCode
            })
            this.setState({
              diffusalCodes: currentCodes
            })
          } else {
            this.receiveDisruptions(disruption);
          }
        };
      });
      fire.database().ref(`rooms/${this.props.currentRoom.key}/players/${username}/disruptions`).set([""])
    }
  }

  liveInputs(){
    // Sends live inputs of user to database
    let username = fire.auth().currentUser.email.split('@')[0];  
    let liveInput = this.ace.editor.getValue();
    fire.database().ref(`rooms/${this.props.currentRoom.key}/players/${username}/liveInput`).set(liveInput)
  }

  sendDisruptions(e){
    console.log('trying to send a disruption')
    let { currentRoom } = this.props;
    let username = fire.auth().currentUser.email.split('@')[0];  
    // Sends disruptions to oppposite player
    let disruptionFunc = e.target.id.split(" ")[0];
    let disruptionCost = e.target.id.split(" ")[1];
    // make sure the user has enough credits to send this disruption
    if (currentRoom.players[username].credits >= disruptionCost) {
      if (currentRoom.players[username].targetedPlayer) {
        let  { targetedPlayer } = currentRoom.players[username];
        let currentDisruptions = currentRoom.players[targetedPlayer].disruptions;
        let activity = currentRoom.activity || [];
        activity.push(`${username} is sending a ${disruptionFunc} at ${targetedPlayer}!`)
        fire.database().ref(`rooms/${currentRoom.key}/players/${targetedPlayer}/disruptions`).set([...currentDisruptions, disruptionFunc]);
        fire.database().ref(`rooms/${currentRoom.key}/players/${username}/credits`).set(currentRoom.players[username].credits - disruptionCost);
        fire.database().ref(`rooms/${currentRoom.key}/activity`).set(activity);
      } else {
        // send the disruption to all players
        Object.keys(currentRoom.players).forEach((playerName) => {
          if (playerName !== username) {
            let currentDisruptions = currentRoom.players[playerName].disruptions;
            fire.database().ref(`rooms/${currentRoom.key}/players/${playerName}/disruptions`).set([...currentDisruptions, disruptionFunc]);
          }
        });
        fire.database().ref(`rooms/${currentRoom.key}/players/${username}/credits`).set(currentRoom.players[username].credits - disruptionCost);

      }
    }
  }

  clearDisruption(e) {
    let { currentRoom } = this.props;    
    let username = fire.auth().currentUser.email.split('@')[0];  
        
    let disruptionFuncName = e.target.id.split(" ")[0];
    let blockCost = e.target.id.split(" ")[1];

    if (currentRoom.players[username].credits >= blockCost) {
      let disruptions = this.state.diffusalCodes;
      console.log('disruptions', disruptions)
      let indOfDisruptionToClear = disruptions.findIndex(disruption => disruption.disruptionName === disruptionFuncName);
      let disruptionToClear = disruptions.splice(indOfDisruptionToClear, 1)[0];
      if (disruptionToClear) {
        let clearCode = disruptionToClear.clearCode;
        console.log('clearCode', clearCode)
        clearTimeout(clearCode);
      }
      fire.database().ref(`rooms/${currentRoom.key}/players/${username}/credits`).set(currentRoom.players[username].credits - blockCost);      
    } 
  }

  receiveDisruptions(func) {
    // Runs disruptions for user, if called
    let oldHistory = this.ace.editor.getSession().getUndoManager();
    Disruptions[func]('ace-editor', this.ace.editor);
    this.ace.editor.getSession().setUndoManager(oldHistory);
  }

  endRoundWithClientAsVictor() {
    // send win event (in room.players), update results object (in room), and increment user's wins (in database)
    let room = this.props.currentRoom;    

    room.timeEnd = performance.now();
    room.timeTaken = (room.timeEnd - room.timeStart)/1000;

    let username = fire.auth().currentUser.email.split('@')[0];
    let players = room.players;
    let playerNames = Object.keys(room.players);
    let problem = room.problem; 
    let teams = room.teams;
    let timeStamp = Date.now();

    let resultForThisRound = helpers.prepResultsObjectFromWinner(username, players, teams, problem, room.timeTaken, timeStamp);

    room.results = room.results || [];
    room.results.push(resultForThisRound);
    
    let winEvent = {
      eventName: 'winner',
      value: resultForThisRound
    }

    playerNames.forEach(name => players[name].events = [...(players[name].events || []), winEvent]);

    fire.database().ref(`rooms/${room.key}`).set(room);
  }

  handleReset() {
    this.ace.editor.setValue(`function ${this.props.currentRoom.problem.userFn}() {\n\n}`);
  }

  handleSubmit(){
    let code = this.ace.editor.getValue();
    let { currentRoom } = this.props;
    let username = fire.auth().currentUser.email.split('@')[0];
    //TEST SUITE LOGIC
    let testStatus =  runTestsOnUserAnswer((code), currentRoom.problem.tests, currentRoom.problem.userFn);
    if(Array.isArray(testStatus) && testStatus.every(item => item.passed === true)){
      // if every test is passed
      if (currentRoom.roomStatus !== 'completed') this.endRoundWithClientAsVictor();
    } else window.swal('Oops...', 'Something went wrong!', 'error');

    if((testStatus.length === currentRoom.problem.tests.length) && testStatus){
      testStatus.forEach(items => {
        if(items.actual === undefined) items.actual = null;
      });
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
      <div id="editorSide">
          <DisruptionsBar 
            credits={currentRoom.players[username].credits}
            sendDisruptions={this.sendDisruptions}
          />
          {
            currentRoom.isPairRoom ?
              <BlockDisruptionsBar
                clearDisruption={this.clearDisruption}
                credits={currentRoom.players[username].credits}
              />
              : 
              null
          }
          <button className="btn editorHeader" color="secondary" size="lg" >Editor</button>
          <ReactAce
            mode="javascript"
            theme="monokai"
            onChange={this.liveInputs}
            style={{ height: '400px', width: '50vw' }}
            ref={instance => { this.ace = instance; }} // Let's put things into scope
          />
        <button className="btn submitButton" onClick={this.handleSubmit}> SUBMIT </button> 
        <button className="btn resetButton" onClick={this.handleReset}> RESET </button>
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