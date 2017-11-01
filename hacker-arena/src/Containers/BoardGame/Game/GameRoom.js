import React from 'react';
import { connect } from 'react-redux';
import fire from '../../../Firebase/firebase';
import { push } from 'react-router-redux';
import Board from './Board';
import Dice from './Dice';
import MovePlayer from './MovePlayer';
import CodeEditor from '../CodePage/CodeEditor';
import TestSuite from '../CodePage/TestSuite';
import Attack from './Attack';
import helper from '../Helpers/helper';
import '../../../Styles/CreateBoardRoom.css';


class GameRoom extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      won: false,
      canEnter: true
    }
    this.handleLeave = this.handleLeave.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.startGame = this.startGame.bind(this);
    this.handleBoard = this.handleBoard.bind(this);
  }
  componentDidMount () {
    window.addEventListener('beforeunload', this.handleLeave);
    this.handleEnter();
  }

  componentWillUpdate () {
    if (this.state.canEnter) {
      this.handleEnter();
      this.handleBoard();
    }
  }
  
  componentDidUpdate () {
    let {room, user} = this.props;
    if (room.board) {
      [].slice.call(document.getElementsByClassName('validMove')).forEach(ele=>{
        ele.classList.remove('validMove');
        console.log('removed valid from',ele.id,ele);
      });
      [].slice.call(document.getElementsByClassName('goblin')).forEach(ele => {
        ele.classList.remove('goblin');
      });
      let gobPos = room.Goblin.position;
      let gobString = gobPos[0] + ' ' + gobPos[1];
      let ele = document.getElementById(gobString);
      if (ele) {
        ele.classList.add('goblin');
      }
      let position = room.playerInfo[user].position;
      let x = position[0];
      let y = position[1];
      var validMoves = [];
      const stringify = (x,y) => {
        if (room.board[x] && room.board[x][y]) {
          validMoves.push(x + ' ' + y);
        }
      }
      stringify(x-1,y);
      stringify(x+1,y);
      stringify(x,y-1);
      stringify(x,y+1);
      console.log ('valid selections are',validMoves);
      validMoves.forEach(move => {
        move = document.getElementById(move)
        if (move) {
          move.classList.add('validMove');
        }
      })
    }
  }
 
  componentWillUnmount () {//moving to different component
    this.handleLeave();
  }

  handleBoard () {
    let {room} = this.props;
    if (room && room.gameStarted === true) {
      helper.handleBoard(room);
    }
  }

  handleEnter () {
    let {room, user, navigate} = this.props;
    if (room && this.state.canEnter) {
      let notFull = room.players.length < 4 && !room.gameStarted; //game not started;
      let notAlreadyIn = room.players.indexOf(user) === -1;
      let wasIn = Object.keys(room.playerInfo).indexOf(user) !== -1;
      let firstTile = room.board[0][0][0];
      if (notFull && notAlreadyIn) {//not full nor started and not in;
        room.players.push(user);
        firstTile.push(user);
        if (!room.playerInfo[user]) {
          room.playerInfo[user] = {
            position: [0,0],
            diceResult: 0,
            canMove: true,
            disruptions: [''],
            liveInput: '',
            events: '',
            credits: 5,
            testStatus: []
          }
        }
        fire.database().ref('BoardRooms/' + room.key).set(room);
      } else if (!notFull && wasIn && notAlreadyIn) { //refresh coming back
        room.players.push(user);
        fire.database().ref('BoardRooms/' + room.key).set(room);
      } else if (!notFull && notAlreadyIn) {
        navigate('/CodeRunLobby');
      }
    }
  }

  handleLeave () {
    if (this.props.room !== undefined) {
      let user = this.props.user;
      let room = this.props.room;
      room.players = room.players.filter(player => player !== user);
      // let boardStart = room.board[0][0];
      // boardStart[0] = boardStart[0].filter(ele => ele !== user);      
      if (room.players.length === 0) {
        this.setState({
          canEnter : false
        });
        fire.database().ref(`BoardRooms/${room.key}`).remove();
      } else if (room.players.length > 0) {
        this.setState({
          canEnter : false
        });
        fire.database().ref('BoardRooms/' + room.key).set(room);
      }
    }
  }

  startGame (e) {
    e.preventDefault();
    let room = this.props.room;
    room.gameStarted = true;
    fire.database().ref('BoardRooms/' + e.target.value).set(room);
  }

  render () {
    let user = this.props.user;
    let room = this.props.room;
    if (room === undefined) {
      return <div>
        <div> Please wait as we prepare your board </div>
      </div>
    } else if (this.state.won === false) {
      let players = room.players;
      let message, startButton, board, dice, diceResult, canMove, move, codePage, attack, playerSpans;
      players.forEach(player => {
        let position = room.playerInfo[player].position;
        if (position[0] === 6 && position[1] === 6) {
          window.swal(`${player} won!`);
          this.setState({
            won: true
          })
          return;
        }
      })
      let userInfo = room.playerInfo[user];
      if (room.gameStarted && userInfo) {
        startButton = null;
        message = 'Run run run your code hastily down the board';
        board = <Board board={room.board} whirlpools={room.whirlpools}/>;
        diceResult = <div className='dice'>{'Moves Left: ' + room.playerInfo[user].diceResult}</div>;
        if (userInfo.canMove) {
          canMove = <div className='playerTurn'>{`You can move`}</div>;
          if (userInfo.diceResult === 0) {
            dice = <Dice room={room} user={user}/>;
          }
        } else {
          codePage = <div>
            <CodeEditor room={room} user={user}/>
            <TestSuite room={room} user={user}/>
          </div>;
          canMove = <div className='playerTurn'>{`Do toy problem to continue`}</div>
        }
        if (userInfo.diceResult > 0) {
          move = <MovePlayer room={room} user={user}/>;
        }
        if (userInfo.attack) {
          attack = <Attack attack={userInfo.attack} room={room} user={user}/>;
        }
      } else {
        startButton = <button className='btn createGameButton' value={this.props.room.key} onClick={this.startGame}>Start Game</button>;
        let playerNames = room.players;
        playerSpans = [];
        for (let j = 0; j < playerNames.length; j++) {
          playerSpans.push(
            <li className='list-group-item centered' style={{ textAlign: 'left'}} key={(playerNames[j] || "OPEN") + j}>
              <h4>
                { playerNames[j] ? <span style={{ fontSize: '1.5em' }}><img alt='player present' style={{ width: '50px', height: '50px' }} src='data:image/png;base64,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'/>
                { '   ' + playerNames[j] }</span> : <span style={{color: 'darkgreen', fontSize: '1.5em'}}><img alt='player not present' style={{ width: '50px', height: '50px' }} src='http://1.bp.blogspot.com/-ztQMI-PgiOQ/Ud8_CPcNn1I/AAAAAAAApE0/sjeNZYuemmg/s1600/Question_mark_(black_on_white).png'/>
                {'   '} OPEN</span> }
              </h4>
            </li>);
        }
        message = `Waiting for victims`;
        board = null;
        dice = null;
        diceResult = null;
        canMove = null;
        move = null;
      }
      

      return <div>
        <div>{message}</div>
        <div>{playerSpans}</div>
        {startButton}
        {board}
        {canMove}
        <div className='diceContainer'>
          {diceResult}
          {dice}
        </div>
        {move}
        {attack}
        <div id="editorAndTestSuite">
          {codePage}
        </div>
        <div className='bottomend'></div>
      </div>
    } else {
      return <div>
        This game has already ended
      </div>
    }
  }
}

const mapStoP = (state) => {
  return {
    user: fire.auth().currentUser.email.split('@')[0],
    room: state.boardRooms ? state.boardRooms[state.router.location.pathname.split('/')[2]] : undefined
  }
}

const mapDtoP = (dispatch) => {
  return {
    navigate: (route) => dispatch(push(route))
  }
}

export default connect(mapStoP,mapDtoP)(GameRoom);
