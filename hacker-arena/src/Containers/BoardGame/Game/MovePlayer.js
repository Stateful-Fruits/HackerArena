import React from 'react';
// import fire from '../../../Firebase/firebase';
import helper from '../Helpers/helper';

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
    helper.movePlayer(direction, room, user);
  }
  render () {
    return <div>
      <button className='up but moveButton' value='Up' onClick={this.handleMove}>Up</button>
      <div>
        <button className='inline but moveButton' value='Left' onClick={this.handleMove}>Left</button>
        <button className='inline but moveButton' value='Right' onClick={this.handleMove}>Right</button>
      </div>
      <button className='down but moveButton' value='Down' onClick={this.handleMove}>Down</button>
    </div>
  }
}

export default MovePlayer;