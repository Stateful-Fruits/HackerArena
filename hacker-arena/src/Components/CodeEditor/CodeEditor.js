import ReactAce from 'react-ace-editor';
import React from 'react';
import $ from 'jquery';
import runTestsOnUserAnswer from '../../ToyProblemTesting/testUserAnswer';
import fire from '../../Firebase/firebase';
import Disruptions from './disruptions';
import DisruptionsBar from './DisruptionsBar';
import BlockDisruptionsBar from './../Pair/BlockDisruptionsBar'

import { prepResultsObjectFromWinner } from '../../Helpers/resultsHelpers.js';

import '../../Styles/CodeEditor.css';

let oldDisruptions = {};

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
    this.receiveDisruption = this.receiveDisruption.bind(this);
    this.endRoundWithClientAsVictor = this.endRoundWithClientAsVictor.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.clearDisruption = this.clearDisruption.bind(this);
    this.resetEditor = this.resetEditor.bind(this);
  }
  
  // ~~~~~~~~~~~ LIFECYCLE FUNCTIONS ~~~~~~~~~~ //

  componentDidMount() {
    let { currentRoom } = this.props;
    let username = fire.auth().currentUser.email.split('@')[0];

    this.resetEditor();

    // Watches for cheating
    this.ace.editor.on("paste", () => {
      window.swal('You little cheater', '', 'warning');
      
      this.resetEditor();
    });

    // Increments user credits
    let intervalId = setInterval(()=> {
      if(this.props.currentRoom.players[username].credits <= 50) {
        this.changeUserCreditsByVal(5, username, currentRoom);
      }
    }, 30000);

    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  componentWillUpdate() {
    // Alert users if someone has won the game
    let { currentRoom } = this.props;
    let username = fire.auth().currentUser.email.split('@')[0];    
    
    // Check for disruptions sent to the user
    let disruptions = currentRoom.players[username].disruptions || [];
    if(disruptions.length > 1) {
      this.receiveDisruptions(disruptions, username, currentRoom);
    }
  }

  // ~~~~~~~~~~~ EVENT HANDLERS ~~~~~~~~~~ //

  handleReset() {
    this.ace.editor.setValue(`function ${this.props.currentRoom.problem.userFn}() {\n\n}`);
  }

  handleSubmit() {
    let code = this.ace.editor.getValue();
    let { currentRoom } = this.props;
    let username = fire.auth().currentUser.email.split('@')[0];
    
    //TEST SUITE LOGIC
    let testStatus = runTestsOnUserAnswer((code), currentRoom.problem.tests, currentRoom.problem.userFn);
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
  
  handleClear() {
    $('#aceConsole').empty(); // Clears the console
  }

  liveInputs() {
    // Sends live inputs of user to database
    let username = fire.auth().currentUser.email.split('@')[0];  
    let liveInput = this.ace.editor.getValue();
    fire.database().ref(`rooms/${this.props.currentRoom.key}/players/${username}/liveInput`).set(liveInput)
  }

  sendDisruptions(e) {
    console.log('trying to send a disruption')
    let { currentRoom } = this.props;
    let username = fire.auth().currentUser.email.split('@')[0];  
    // Sends disruptions to oppposite player
    let disruptionFunc = [e.target.id.split(" ")[0], Date.now()];
    let disruptionCost = e.target.id.split(" ")[1];
    // make sure the user has enough credits to send this disruption
    if (currentRoom.players[username].credits >= disruptionCost) {
      if (currentRoom.players[username].targetedPlayer) {
        let  { targetedPlayer } = currentRoom.players[username];
        let currentDisruptions = currentRoom.players[targetedPlayer].disruptions;
        let activity = currentRoom.activity || [];
        activity.push(`${username} is sending a ${disruptionFunc[0]} at ${targetedPlayer}!`)
        this.changeUserCreditsByVal(-1 * disruptionCost, username, currentRoom);
        fire.database().ref(`rooms/${currentRoom.key}/players/${targetedPlayer}/disruptions`).set([...currentDisruptions, disruptionFunc]);
        fire.database().ref(`rooms/${currentRoom.key}/activity`).set(activity);
      } else {
        // send the disruption to all players
        Object.keys(currentRoom.players).forEach((playerName) => {
          if (playerName !== username) {
            let currentDisruptions = currentRoom.players[playerName].disruptions;
            let activity = currentRoom.activity || [];
            activity.push(`Whoa! ${username} is sending a ${disruptionFunc[0]} at all players! Even though that should not be possible!!!`)
            fire.database().ref(`rooms/${currentRoom.key}/players/${playerName}/disruptions`).set([...currentDisruptions, disruptionFunc]);
            fire.database().ref(`rooms/${currentRoom.key}/activity`).set(activity);
          }
        });
        this.changeUserCreditsByVal(-1 * disruptionCost, username, currentRoom);        
      }
    }
  }

  clearDisruption(e) {
    let { currentRoom, removePendingEvent } = this.props;    
    let username = fire.auth().currentUser.email.split('@')[0];  
        
    let disruptionFuncName = e.target.id.split(" ")[0];
    let blockCost = e.target.id.split(" ")[1];

    let activity = currentRoom.activity || [];    

    if (currentRoom.players[username].credits >= blockCost) {
      let didClear = removePendingEvent(disruptionFuncName, true);

      if (didClear) {
        activity.push(`${username} successfully blocked ${disruptionFuncName}!`)
      } else {
        parseInt(blockCost, 10) ? activity.push(`${username} wasted ${blockCost} credits defending against a ${disruptionFuncName} that didn't exist!`) : null;
      }

      fire.database().ref(`rooms/${currentRoom.key}/activity`).set(activity);
      
      this.changeUserCreditsByVal(-1 * blockCost, username, currentRoom);
    } 
  }

  // ~~~~~~~~~~~ HELPERS ~~~~~~~~~~ //

  receiveDisruptions(disruptions, username, currentRoom) {
    const { addPendingEvent, removePendingEvent } = this.props;
    // note that oldDisruptions is declared outside this function at the top of the file
    disruptions.forEach(disruption => {
      if(disruption !== "" && !oldDisruptions[disruption[1]]) {
        oldDisruptions[disruption[1]] = true;

        if (currentRoom.isPairRoom) {
          // if we are in a pair room, the disruption should be delayed to give driver time to block
          let disruptionName = disruption[0];

          let clearCode = setTimeout(() => {
            console.log('disruption activating!!', disruptionName)
            this.receiveDisruption(disruptionName);
            removePendingEvent(disruptionName, false)
          }, 5000);
      
          addPendingEvent(disruptionName, clearCode);

        } else {
          // if we are not in a pair room, we should process it immediately
          this.receiveDisruption(disruption[0]);
        }
      };
    });

    fire.database().ref(`rooms/${this.props.currentRoom.key}/players/${username}/disruptions`).set([""])
  }

  receiveDisruption(funcName) {
    // Runs disruptions for user, if called
    if (this.ace) {
      let oldHistory = this.ace.editor.getSession().getUndoManager();
      Disruptions[funcName]('ace-editor', this.ace.editor);
      this.ace.editor.getSession().setUndoManager(oldHistory);
    }
  }

  endRoundWithClientAsVictor() {
    // send win event (in room.players), update results object (in room), and increment user's wins (in database)
    let room = this.props.currentRoom;    

    room.timeEnd = Date.now();
    room.timeTaken = (room.timeEnd - room.timeStart)/1000;

    let username = fire.auth().currentUser.email.split('@')[0];
    let players = room.players;
    let playerNames = Object.keys(room.players);
    let problem = room.problem; 
    let teams = room.teams;
    let timeStamp = Date.now();

    let resultForThisRound = prepResultsObjectFromWinner(username, players, teams, problem, room.timeTaken, timeStamp);

    room.results = room.results || [];
    room.results.push(resultForThisRound);
    
    let winEvent = {
      eventName: 'winner',
      value: resultForThisRound
    }

    playerNames.forEach(name => players[name].events = [...(players[name].events || []), winEvent]);

    fire.database().ref(`rooms/${room.key}`).set(room);
  }

  resetEditor() {
    setTimeout( () => {
      this.ace.editor.setValue(`function ${this.props.currentRoom.problem.userFn}() {\n\n}`);
    }, 500);
  }

  changeUserCreditsByVal(val, username, currentRoom) {
    fire.database().ref(`rooms/${currentRoom.key}/players/${username}/credits`).set(currentRoom.players[username].credits + val);
  }

  // ~~~~~~~~~~~ RENDER ~~~~~~~~~~ //

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