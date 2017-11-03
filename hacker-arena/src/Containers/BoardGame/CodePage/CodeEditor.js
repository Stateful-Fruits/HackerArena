import ReactAce from 'react-ace-editor';
import React from 'react';
import $ from 'jquery';
import runTestsOnUserAnswer from '../../../ToyProblemTesting/testUserAnswer'; 
import fire from '../../../Firebase/firebase';
import Disruptions from '../../../Components/CodeEditor/disruptions';
import DisruptionsBar from '../../../Components/CodeEditor/DisruptionsBar';
import Powers from './Power';
import '../../../Styles/CodeEditor.css';

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testStatus: "",
      problem: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear =  this.handleClear.bind(this);
    this.liveInputs = this.liveInputs.bind(this);
    this.sendDisruptions = this.sendDisruptions.bind(this);
    this.receiveDisruptions = this.receiveDisruptions.bind(this);
    this.endRoundWithClientAsVictor = this.endRoundWithClientAsVictor.bind(this);
  }
  
  componentDidMount() {
    let { room, currentUser } = this.props;
    let username = currentUser.username;
    let userInfo = room.playerInfo[username];
    let userPos = userInfo.position;
    let problem = room.board[userPos[0]][userPos[1]][1];
    this.setState({
      problem
    })
    // Creates template for current problem using userFn
    if (problem) {
      this.ace.editor.on("paste", () => { //copy and pasting
        window.swal('You little cheater', '', 'warning');
        setTimeout( () => {
          this.ace.editor.setValue(`function ${problem.userFn}() {\n\n}`)
        }, 500);
      });
      this.ace.editor.setValue(`function ${problem.userFn}() {\n\n}`, 1);
    }



    // Increments user credits by 5 every 30 seconds
    // let intervalId = setInterval(()=> {
    //   let newCreditTotal = room.players[username].credits + 5;
    //   if(room.players[username].credits <= 50) fire.database().ref(`rooms/${room.key}/players/${username}/credits`).set(newCreditTotal);
    // }, 30000);
    // this.setState({ intervalId });
  }

  componentWillUnmount() {
    // clearInterval(this.state.intervalId);
  }

  componentWillUpdate(){
    // Alert users if someone has won the game
    let { room, currentUser } = this.props;
    let username = currentUser.username;
    let disruptions = room.playerInfo[username].disruptions;
    // Check for disruptions sent to the user

    if (disruptions[0] !== '') {
      room.playerInfo[username].disruptions.forEach(disruption => {
        if(disruption !== "") this.receiveDisruptions(disruption);
      });
      fire.database().ref(`BoardRooms/${room.key}/playerInfo/${username}/disruptions`).set(['']);
    }
  }

  liveInputs(){
    // Sends live inputs of user to database
    let { room, currentUser } = this.props;
    let username = currentUser.username;
    let liveInput = this.ace.editor.getValue();
    //fire.database().ref(`rooms/${this.props.room.key}/players/${username}/liveInput`).set(liveInput);
    fire.database().ref(`BoardRooms/${room.key}/playerInfo/${username}/liveInput`).transaction(live => {
      return liveInput;
    })
    //.set(liveInput)
    // .catch(err => {
    //   console.log('err in liveinput', err);
    // });
  }

  sendDisruptions(e){
    let { room } = this.props;
    let username = this.props.currentUser.username;
    let disruptions = room.playerInfo[username].disruptions;
    let playerInfo = room.playerInfo[username];
    // Sends disruptions to oppposite player
    let disruptionFunc = e.target.id.split(" ")[0];
    let disruptionCost = e.target.id.split(" ")[1];
    // make sure the user has enough credits to send this disruption
    if (playerInfo.credits >= disruptionCost) {
      room.players.forEach((playerName) => {
        if (playerName !== username) {
          let currentDisruptions = disruptions;
          fire.database().ref(`BoardRooms/${room.key}/playerInfo/${playerName}/disruptions`).set([...currentDisruptions, disruptionFunc]);
          //fire.database().ref(`rooms/${room.key}/players/${playerName}/disruptions`).set([...currentDisruptions, disruptionFunc]);
        }
      });
      fire.database().ref(`BoardRooms/${room.key}/playerInfo/${username}/credits`).set(playerInfo.credits - disruptionCost);
    }
  }

  receiveDisruptions(func) {
    // Runs disruptions for user, if called
    let oldHistory = this.ace.editor.getSession().getUndoManager();
    Disruptions[func]('ace-editor', this.ace.editor);
    this.ace.editor.getSession().setUndoManager(oldHistory);
  }

  endRoundWithClientAsVictor() {
    // Instead set canMove to true here;
    let { room, currentUser } = this.props;
    let user = currentUser.username;
    let userInfo = room.playerInfo[user];
    userInfo.canMove = !userInfo.canMove;
    room.playerInfo[user].testStatus = [];
    let powers = Object.keys(Powers);
    let random = Math.floor(Math.random() * powers.length);
    userInfo.attack = powers[random];
    userInfo.credits = Math.ceil(5*this.state.problem.difficulty + userInfo.credits);
    const moveGoblin = (room, Goblin) => {
      let pos = Goblin.position.slice();
      // let x = pos[0];
      // let y = pos[1];
      let random = Math.floor(Math.random() * 2);
      let random1 = Math.floor(Math.random() * 2);
      if (random1 === 0) {
        random1 = -1;
      }
      pos[random] += random1;
      if (room.board[pos[0]] && room.board[pos[0]][pos[1]] && (pos[0] + pos[1] !== 0)) {
        Goblin.position = pos;
      } 
    }
    moveGoblin(room, room.Goblin);
    //fire.database().ref('BoardRooms/' + room.key).set(room);
    fire.database().ref(`BoardRooms/${room.key}/`).transaction(currentRoom => {
      let fireUserInfo = currentRoom.playerInfo[user];
      fireUserInfo.canMove = userInfo.canMove;
      fireUserInfo.testStatus = [];
      fireUserInfo.attack = powers[random];
      fireUserInfo.credits = userInfo.credits;
      return currentRoom;
    });
  }

  handleSubmit(){
    let code = this.ace.editor.getValue();
    let { room, currentUser } = this.props;
    let username = currentUser.username;
    //TEST SUITE LOGIC
    //let userInfo = room.playerInfo[username];
    //let userPos = userInfo.position;
    let problem = this.state.problem//room.board[userPos[0]][userPos[1]][1];
    let testStatus =  runTestsOnUserAnswer((code), problem.tests, problem.userFn);
    let completed = false;
    if(Array.isArray(testStatus) && testStatus.every(item => item.passed === true)){
      // if every test is passed
      // if (room.roomStatus !== 'completed') {
      //   this.endRoundWithClientAsVictor();
      // }
      this.endRoundWithClientAsVictor();
      completed = true;
    } else window.swal('Oops...', 'Something went wrong!', 'error');

    if(!completed && (testStatus.length === problem.tests.length) && testStatus){
      testStatus.forEach(items => {
        if(items.actual === undefined) items.actual = null;
      });
      fire.database().ref(`BoardRooms/${room.key}/playerInfo/${username}/testStatus`).set(testStatus);      
    } else if (!completed) {
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
    let { room, currentUser } = this.props;
    let username = currentUser.username;

    return (
      <div id="editorSide">
          <DisruptionsBar 
            credits={room.playerInfo[username].credits}
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
