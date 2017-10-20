import ReactAce from 'react-ace-editor';
import React from 'react';
import $ from 'jquery';
import runTestsOnUserAnswer from '../../../ToyProblemTesting/testUserAnswer'; 
import fire from '../../../Firebase/firebase';
import Disruptions from '../../../Components/CodeEditor/disruptions';
import DisruptionsBar from '../../../Components/CodeEditor/DisruptionsBar';

import '../../../Styles/CodeEditor.css';

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testStatus: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear =  this.handleClear.bind(this);
    this.liveInputs = this.liveInputs.bind(this);
    this.sendDisruptions = this.sendDisruptions.bind(this);
    this.receiveDisruptions = this.receiveDisruptions.bind(this);
    this.endRoundWithClientAsVictor = this.endRoundWithClientAsVictor.bind(this);

  }
  
  componentDidMount() {
    let { room } = this.props;
    let username = fire.auth().currentUser.email.split('@')[0];
    // Creates template for current problem using userFn
    this.ace.editor.on("paste", () => {
      this.ace.editor.undo();
      window.swal('You little cheater', '', 'warning');
    });
    this.ace.editor.setValue(`function ${this.props.room.problem.userFn}() {\n\n}`, 1);
    // Increments user credits by 5 every 30 seconds
    let intervalId = setInterval(()=> {
      let newCreditTotal = room.players[username].credits + 5;
      if(room.players[username].credits <= 50) fire.database().ref(`rooms/${room.key}/players/${username}/credits`).set(newCreditTotal);
    }, 30000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  componentWillUpdate(){
    console.log('Code editor updating with props: \n', this.props);
    // Alert users if someone has won the game
    let { room } = this.props;
    let username = fire.auth().currentUser.email.split('@')[0];    

    // Check for disruptions sent to the user
    if(room.players[username].disruptions.length){
      room.players[username].disruptions.forEach(disruption => {
        if(disruption !== "") this.receiveDisruptions(disruption);
      });
      fire.database().ref(`rooms/${this.props.room.key}/players/${username}/disruptions`).set([""])
    }
  }

  liveInputs(){
    // Sends live inputs of user to database
    let username = fire.auth().currentUser.email.split('@')[0];  
    let liveInput = this.ace.editor.getValue();
    fire.database().ref(`rooms/${this.props.room.key}/players/${username}/liveInput`).set(liveInput)
  }

  sendDisruptions(e){
    let { room } = this.props;
    let username = fire.auth().currentUser.email.split('@')[0];  
    // Sends disruptions to oppposite player
    let disruptionFunc = e.target.id.split(" ")[0];
    let disruptionCost = e.target.id.split(" ")[1];
    // make sure the user has enough credits to send this disruption
    if (room.players[username].credits >= disruptionCost) {
      Object.keys(room.players).forEach((playerName) => {
        if (playerName !== username) {
          let currentDisruptions = room.players[playerName].disruptions;
          fire.database().ref(`rooms/${room.key}/players/${playerName}/disruptions`).set([...currentDisruptions, disruptionFunc]);
        }
      });
      fire.database().ref(`rooms/${room.key}/players/${username}/credits`).set(room.players[username].credits - disruptionCost);
    }
  }

  receiveDisruptions(func) {
    // Runs disruptions for user, if called
    let oldHistory = this.ace.editor.getSession().getUndoManager();
    Disruptions[func]('ace-editor', this.ace.editor);
    this.ace.editor.getSession().setUndoManager(oldHistory);
  }

  endRoundWithClientAsVictor() {
    // send win event (in room.players),
    // update results object (in room),
    // and increment user's wins (in database)
    let room = this.props.room;
    let username = fire.auth().currentUser.email.split('@')[0];

    room.timeEnd = performance.now();
    room.timeTaken = (room.timeEnd - room.timeStart)/1000;

    let players = room.players;
    let playersArr = Object.keys(room.players);
    
    let resultForThisRound = {
      players: playersArr,
      winner: username,
      problemID: room.problemID,
      timeTaken: room.timeTaken,
    }

    room.results = room.results || [];

    room.results.push(resultForThisRound);
    console.log('room results after push', room.results);
    
    let winEvent = {
      eventName: 'winner',
      value: resultForThisRound
    }

    for (let playerID in players) {
      let player = players[playerID];
      player.events = player.events || [];
      player.events.push(winEvent);
    }

    fire.database().ref(`rooms/${room.key}`).set(room)
    
    fire.database().ref(`users/${username}`).once('value').then(snapshot => {
      let wins = snapshot.val().wins + 1;
      fire.database().ref(`users/${username}/wins`).set(wins);
    });
  }

  handleSubmit(){
    let code = this.ace.editor.getValue();
    let { room } = this.props;
    let username = fire.auth().currentUser.email.split('@')[0];
    //TEST SUITE LOGIC
    let testStatus =  runTestsOnUserAnswer((code), room.problem.tests, room.problem.userFn);
    if(Array.isArray(testStatus)){
      if(testStatus.every(
        item => {
        return item.passed === true;
        }
      )) {
        // if every test is passed
        this.endRoundWithClientAsVictor();
      } else {
        window.swal('Oops...', 'Something went wrong!', 'error');
      }
    }
    if((testStatus.length === room.problem.tests.length) && testStatus){
      testStatus.forEach(items => {
        if(items.actual === undefined) items.actual = null;
      });
      fire.database().ref(`rooms/${room.key}/players/${username}/testStatus`).set(testStatus);
    } else {
      window.swal('Oops...', 'Something went wrong!', 'error');
    }
    
    // ACE CONSOLE
    // Function to handle console.logs in the aceConsole
    let newLog = function(...theArgs){
      let results = "";
      let args = [].slice.call(arguments);
      args.forEach( argument => {
      // eslint-disable-next-line  
        results += eval("'" + argument + "'");
      });
      $('#aceConsole').append(`<li id="log">${results}</li>`);
    }
    let consoleLogChange = "let console = {}\nconsole.log=" + newLog + "\n";
    let newCode = consoleLogChange + code;
    try {
      // eslint-disable-next-line
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
    // Clears the console
    $('#aceConsole').empty();
  }
  
  render() {
    let username = fire.auth().currentUser.email.split('@')[0];
    let { room } = this.props;
    return (
      <div id="editorSide">
          <DisruptionsBar 
            credits={room.players[username].credits}
            sendDisruptions={this.sendDisruptions}
          />
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