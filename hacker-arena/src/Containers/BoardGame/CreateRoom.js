import React from 'react';
import { connect } from 'react-redux';
import db from '../../Firebase/db';
import { push } from 'react-router-redux';
import fire from '../../Firebase/firebase';

class CreateRoom extends React.Component {
  constructor (props) {
    super (props);
    this.createRoom = this.createRoom.bind(this);
  }
  createRoom () {
    let problems = this.props.problems;
    let user = fire.auth().currentUser.email.split('@')[0];
    const room = {
      players: [user],
      playerInfo: {[user]: {position: [0,0]}},
      gameStarted: false,
      playerCount: 1,
      winner: "",
      problems: problems,
      spectators: 0,
      board: [
        ['Start',0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,'End']
      ],
      diceResult: 'None'
    }
    db.BoardRooms.push(room).then(added => {
      room.key = added.key;
      fire.database().ref('BoardRooms/' + added.key).set(room);
      this.props.navigateToBoardRoom(added.key);
    })
  

  }
  render () {
    return (
      <div>
        <button onClick={this.createRoom}><h3>Create Board Room</h3></button>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  console.log('state is ', state);
  return {
    problems: state.problems
  }
}

const mapDispatcherToProps = (dispatch) => {
  return {
    navigateToBoardRoom: (id) => {dispatch(push('/CodeRun/' + id))}
  }
}
export default connect(mapStateToProps, mapDispatcherToProps)(CreateRoom);