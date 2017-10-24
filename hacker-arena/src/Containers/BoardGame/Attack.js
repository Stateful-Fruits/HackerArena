import React from 'react';
import attacks from './CodePage/Power';
import fire from '../../Firebase/firebase';

class Attack extends React.Component {
  constructor (props) {
    super (props);
    this.invoke = this.invoke.bind(this);
  }
  invoke (e) {
    let {room, attack, user} = this.props;
    e.preventDefault();
    attacks[attack](user, room);
    room.playerInfo[user].attack = '';
    fire.database().ref(`BoardRooms/${room.key}`).set(room);
  }
  render () {
    let attack = this.props.attack;
    return <div>
      <button onClick={this.invoke}>{attack}</button>
    </div>
  }
}

export default Attack;