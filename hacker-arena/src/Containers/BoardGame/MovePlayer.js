import React from 'react';
import fire from '../../Firebase/firebase';

class MovePlayer extends React.Component {
  constructor (props) {
    super (props);
    this.handleMove = this.handleMove.bind(this);
  }
  handleMove (e) {
    e.preventDefault();
    let direction = e.target.value;
    let room = this.props.room;
    let user = this.props.user;
    let userInfo = room.playerInfo[user];
    let position = userInfo.position;
    let row = position[0];
    let col = position[1];
    if (direction === 'Up' && room.board[row - 1]) {
      room.board[row][col] = room.board[row][col].filter(player => player !== user);
      row -= 1;
      room.board[row][col].push(user);
      userInfo.position = [row,col];
      userInfo.diceResult--;
      if (userInfo.diceResult === 0) {
        userInfo.canMove = !userInfo.canMove;
      }
      fire.database().ref('BoardRooms/' + room.key).set(room);
    } else if (direction === 'Down' && room.board[row+1]) {
      room.board[row][col] = room.board[row][col].filter(player => player !== user);
      row += 1;
      room.board[row][col].push(user);
      userInfo.position = [row,col];
      userInfo.diceResult--;
      if (userInfo.diceResult === 0) {
        userInfo.canMove = !userInfo.canMove;
      }
      fire.database().ref('BoardRooms/' + room.key).set(room);
    } else if (direction === 'Left' && room.board[row][col-1]) {
      room.board[row][col] = room.board[row][col].filter(player => player !== user);
      col -= 1;
      room.board[row][col].push(user);
      userInfo.position = [row,col];
      userInfo.diceResult--;
      if (userInfo.diceResult === 0) {
        userInfo.canMove = !userInfo.canMove;
      }
      fire.database().ref('BoardRooms/' + room.key).set(room);
    } else if (direction === 'Right' && room.board[row][col+1]) {
      room.board[row][col] = room.board[row][col].filter(player => player !== user);
      col += 1;
      room.board[row][col].push(user);
      userInfo.position = [row,col];
      userInfo.diceResult--;
      if (userInfo.diceResult === 0) {
        userInfo.canMove = !userInfo.canMove;
      }
      fire.database().ref('BoardRooms/' + room.key).set(room);
    }
  }
  render () {
    return <div>
      <button className='up but' value='Up' onClick={this.handleMove}>Up</button>
      <div>
        <button className='inline but' value='Left' onClick={this.handleMove}>Left</button>
        <button className='inline but' value='Right' onClick={this.handleMove}>Right</button>
      </div>
      <button className='down but' value='Down' onClick={this.handleMove}>Down</button>
    </div>
  }
}

export default MovePlayer;