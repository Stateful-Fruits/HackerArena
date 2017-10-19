import React from 'react';
import fire from '../../Firebase/firebase';

class Dice extends React.Component {
  constructor (props) {
    super (props);
    this.roll = this.roll.bind(this);
  }
  roll (e) {
    let room = this.props.room;
    e.preventDefault();
    room.diceResult = Math.floor(Math.random() * 6) + 1;
    fire.database().ref('BoardRooms/' + room.key).set(room);
  }
  render () {
    return <div className='dice'>
      <button onClick={this.roll}>Roll Dice</button>
    </div>
  }
}

export default (Dice);