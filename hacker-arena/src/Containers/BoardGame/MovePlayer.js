import React from 'react';
import fire from '../../Firebase/firebase';

class MovePlayer extends React.Component {
  constructor (props) {
    super (props);
    this.handleUp = this.handleUp.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.handleLeft = this.handleLeft.bind(this);
    this.handleRight = this.handleRight.bind(this);
  }
  handleUp (e) {
    e.preventDefault();
    let room = this.props.room;
    let user = this.props.user;
    let position = room.playerInfo[user].position;
    let row = position[0];
    let col = position[1];
    if (room.board[row - 1] && room.board[row - 1][col]) {
      room.board[row][col] = room.board[row][col].filter(player => player !== user);
      row -= 1;
      room.board[row][col].push(user);
      room.playerInfo[user].position = [row,col];
      fire.database().ref('BoardRooms/' + room.key).set(room);
    }
  }
  handleDown (e) {
    e.preventDefault();
    let room = this.props.room;
    let user = this.props.user;
    let position = room.playerInfo[user].position;
    let row = position[0];
    let col = position[1];
    if (room.board[row+1] && room.board[row+1][col]) {
      room.board[row][col] = room.board[row][col].filter(player => player !== user);
      row += 1;
      room.board[row][col].push(user);
      room.playerInfo[user].position = [row,col];
      fire.database().ref('BoardRooms/' + room.key).set(room);
    }
  }
  handleLeft (e) {
    e.preventDefault();
    let room = this.props.room;
    let user = this.props.user;
    let position = room.playerInfo[user].position;
    let row = position[0];
    let col = position[1];
    if (room.board[row][col-1]) {
      room.board[row][col] = room.board[row][col].filter(player => player !== user);
      col -= 1;
      room.board[row][col].push(user);
      room.playerInfo[user].position = [row,col];
      fire.database().ref('BoardRooms/' + room.key).set(room);
    }
  }
  handleRight (e) {
    e.preventDefault();
    let room = this.props.room;
    let user = this.props.user;
    let position = room.playerInfo[user].position;
    let row = position[0];
    let col = position[1];
    if (room.board[row][col+1]) {
      room.board[row][col] = room.board[row][col].filter(player => player !== user);
      col += 1;
      room.board[row][col].push(user);
      room.playerInfo[user].position = [row,col];
      fire.database().ref('BoardRooms/' + room.key).set(room);
    }
  }
  render () {
    return <div>
      <button className='up but' onClick={this.handleUp}>Up</button>
      <div>
        <button className='inline but' onClick={this.handleLeft}>Left</button>
        <button className='inline but' onClick={this.handleRight}>Right</button>
      </div>
      <button className='down but' onClick={this.handleDown}>Down</button>
    </div>
  }
}

export default MovePlayer;