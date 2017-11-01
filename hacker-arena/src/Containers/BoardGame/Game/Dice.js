import React from 'react';
import fire from '../../../Firebase/firebase';

class Dice extends React.Component {
  constructor (props) {
    super (props);
    this.roll = this.roll.bind(this);
  }
  roll (e) {
    let room = this.props.room;
    let user = this.props.user;
    e.preventDefault();
    room.playerInfo[user].diceResult = Math.floor(Math.random() * 4) + 1;
    fire.database().ref('BoardRooms/' + room.key).set(room);
  }
  render () {
    return <div className='dice'>
      <button className='diceButton' onClick={this.roll}>Get Moving</button>
    </div>
  }
}

export default Dice;