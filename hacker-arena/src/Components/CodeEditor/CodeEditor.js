import ReactAce from 'react-ace-editor';
import React from 'react';
import $ from 'jquery';
import runTestsOnUserAnswer from '../../ToyProblemTesting/testUserAnswer';
import fire from '../../Firebase/firebase';
import Disruptions from './disruptions';
import DisruptionsBar from './DisruptionsBar';

import '../../Styles/CodeEditor.css';

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

    this.handleConfirmAlert = this.handleConfirmAlert.bind(this);
  }
  
  handleConfirmAlert (isWinner) {
    let room = this.props.currentRoom;
    console.log('handleConfirmAlert running. room is:', room)    
    let numPlayers = Object.keys(room.players).length;
    let isLastRound = parseInt(room.currentRound) === parseInt(room.rounds);
    console.log('room.currentRound, room.rounds, isLastRound', room.currentRound, room.rounds, isLastRound)
    let username = fire.auth().currentUser.email.split('@')[0];
    let playerObj = room.players;
    let player = playerObj[username];
    
    room.playersReady = room.playersReady + 1 || 1;
    console.log('room.players after add', room.playersReady)
    
    room.winner = ''; 
    
    if (room.playersReady === numPlayers && !isLastRound) {
      console.log('everyone is ready for next round! status to playing')
      room.currentRound = room.currentRound + 1;
      room.roomStatus = 'playing';
      for (let playerID in playerObj) {
        let player = playerObj[playerID]
        player.status = 'playing'
      }
      room.playersReady = 0;
    } else if (room.playersReady < numPlayers) {
      console.log('everyone is NOT ready yet. status to intermission')
      player.status = 'waiting';
      room.roomStatus = 'intermission';
    } else if (isLastRound) {
      console.log('everyone is ready and it is the last round, set to completed')
      for (let playerID in playerObj) {
        let player = playerObj[playerID]
        player.status = 'completed'
      }
      room.roomStatus = 'completed';
    }

    if (isWinner) {
      room.timeEnd = performance.now();
    }
    
    
    return fire.database().ref('rooms/' + room.key).set(room);
  }

  componentDidMount(){
    let { currentRoom } = this.props;
    let username = fire.auth().currentUser.email.split('@')[0];
    // Creates template for current problem using userFn
    this.ace.editor.on("paste", () => {
      this.ace.editor.undo();
      window.swal('You little cheater', '', 'warning');
    });
    this.ace.editor.setValue(`function ${this.props.currentRoom.problem.userFn}() {\n\n}`, 1);
    // Increments user credits by 5 every 30 seconds
    let intervalId = setInterval(()=> {
        let newCreditTotal = currentRoom.players[username].credits + 5;
        if(currentRoom.players[username].credits <= 50) fire.database().ref(`rooms/${currentRoom.key}/players/${username}/credits`).set(newCreditTotal);
    }, 30000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  componentWillUpdate(){
    console.log('Code editor updating with props: \n', this.props);
    // Alert users if someone has won the game
    let { currentRoom } = this.props;
    let username = fire.auth().currentUser.email.split('@')[0];    
    if(currentRoom.players[username] !== "" && (currentRoom.winner !== username)){
      window.swal({
        title: `The Winner is ${this.props.currentRoom.winner}!`,
        width: 600,
        padding: 100,
        background: '#fff url(//bit.ly/1Nqn9HU)'
      })
      .then(this.handleConfirmAlert)
      
      fire.database().ref(`users/${username}`).once('value').then(snapshot => {
        let losses = snapshot.val().losses + 1;
        fire.database().ref(`users/${username}/losses`).set(losses);
      });
    } 
    // Check for disruptions sent to the user
    if(currentRoom.players[username].disruptions.length){
      currentRoom.players[username].disruptions.forEach(disruption => {
        if(disruption !== "") this.receiveDisruptions(disruption);
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
    let { currentRoom } = this.props;
    let username = fire.auth().currentUser.email.split('@')[0];  
    // Sends disruptions to oppposite player
    let disruptionFunc = e.target.id.split(" ")[0];
    let disruptionCost = e.target.id.split(" ")[1];
    // make sure the user has enough credits to send this disruption
    if (currentRoom.players[username].credits >= disruptionCost) {
      Object.keys(currentRoom.players).forEach((playerName) => {
        if (playerName !== username) {
          let currentDisruptions = currentRoom.players[playerName].disruptions;
          fire.database().ref(`rooms/${currentRoom.key}/players/${playerName}/disruptions`).set([...currentDisruptions, disruptionFunc]);
        }
      });
      fire.database().ref(`rooms/${currentRoom.key}/players/${username}/credits`).set(currentRoom.players[username].credits - disruptionCost);
    }
  }

  receiveDisruptions(func){
    // Runs disruptions for user, if called
    let oldHistory = this.ace.editor.getSession().getUndoManager();
    Disruptions[func](this.ace.editor);
    this.ace.editor.getSession().setUndoManager(oldHistory);
  }

  handleSubmit(){
    let code = this.ace.editor.getValue();
    let { currentRoom } = this.props;
    let username = fire.auth().currentUser.email.split('@')[0];
    //TEST SUITE LOGIC
    let testStatus =  runTestsOnUserAnswer((code), currentRoom.problem.tests, currentRoom.problem.userFn);
    if(Array.isArray(testStatus)){
      if(testStatus.every(item => {
        return item.passed === true;
      })) {
        let room = currentRoom;
        room.timeEnd = performance.now();
        let timeTaken = (room.timeEnd - room.timeStart)/1000;
        let players = room.players;
        let winEvent = {
          eventName: 'winner',
          value: {
            name: username,
            round: room.currentRound
          }
        }

        for (let playerID in players) {
          let player = players[playerID];
          player.events = player.events || [];
          player.events.push(winEvent);
        }

        fire.database().ref(`rooms/${currentRoom.key}`).set(room)        
        .then(() => {
          return window.swal(`Good job! Finished in ${timeTaken} seconds`, 'You passed all the tests!', 'success')
        })
        .then(() => {
          this.handleConfirmAlert(true);
        })
        
        fire.database().ref(`users/${username}`).once('value').then(snapshot => {
          let wins = snapshot.val().wins + 1;
          fire.database().ref(`users/${username}/wins`).set(wins);
        });
        
      } else {
        window.swal('Oops...', 'Something went wrong!', 'error');
      }
    }
    if((testStatus.length === currentRoom.problem.tests.length) && testStatus){
      testStatus.forEach(items => {
        if(items.actual === undefined) items.actual = null;
      });
      fire.database().ref(`rooms/${currentRoom.key}/players/${username}/testStatus`).set(testStatus)
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
    let { currentRoom } = this.props;
    return (
      <div id="editorSide">
          <DisruptionsBar 
            credits={currentRoom.players[username].credits}
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