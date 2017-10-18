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
    // let keys = Object.keys(allProblems);
    // let random = Math.floor(Math.random() * keys.length);
    // let problem = allProblems[keys[random]];
    let user = fire.auth().currentUser.email.split('@')[0];
    const room = {
      players: [user],
      gameStarted: false,
      playerCount: 1,
      winner: "",
      problems: problems,
      spectators: 0
    };
    db.BoardRooms.push(room).then(added => {
      room.key = added.key;
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