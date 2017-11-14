import React from 'react';
import attacks from '../CodePage/Power';
import fire from '../../../Firebase/firebase';
//import helper from './Helper/FirebaseCom';

class Attack extends React.Component {
  constructor (props) {
    super (props);
    this.invoke = this.invoke.bind(this);
  }
  invoke (e) {
    e.preventDefault();
    let {room, attack, user} = this.props;
    let others = room.players.filter(player => {
      let playerInfo = room.playerInfo[player];
      if (player !== user && playerInfo.status !== 'shielded') {
        return player;
      } else if (playerInfo.status === 'shielded') {
        room.playerInfo[player].status = '';
        fire.database().ref(`BoardRooms/${room.key}`).set(room);
        return false;
      } return false;
    });
    attacks[attack](user, room, others);
    room.playerInfo[user].attack = '';
    fire.database().ref(`BoardRooms/${room.key}`).set(room);
  }
  render () {
    let attack = this.props.attack;
    return <div>
      <button className='attackButton' onClick={this.invoke}>{attack}</button>
    </div>
  }
}

export default Attack;