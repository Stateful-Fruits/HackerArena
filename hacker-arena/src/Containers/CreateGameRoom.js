import React from 'react';
import { connect } from 'react-redux';
//import fire from '../firebase';
import updateCurrentGameRoom from '../Actions/updateCurrentGameRoom';
import db from '../Firebase/db';
import { push } from 'react-router-redux';

class CreateGameRoom extends React.Component {
  constructor (props) {
    super (props);
    this.createRoom = this.createRoom.bind(this);
  }
  createRoom () {
    db.Problems.once('value').then(snapshot => {
      const allProblems = snapshot.val();
      const problems = []; 
      for (var key in allProblems) {
        let problem = allProblems[key]
        problem.key = key;
        problems.push(problem);
      }
      const random = Math.floor(Math.random() * problems.length);
      const selectedProblem = problems[random];
      const room = {
        challengerName: '',
        challengerTestsPassed: 0,
        creatorName: '', //'ron' || this.props.user,
        creatorTestsPassed: 0,
        gameStarted: false,
        players: 0,
        problemID: selectedProblem.key,
        spectators: 0
      };
      
      db.Rooms.push(room).then(added => {
        room.key = added.key;
        this.props.updateCurrentGameRoom(room);
        this.props.navigateToGameRoom(added.key);
      })
    })

    /*
    let allProblems = this.props.problems;
    let keys = Object.keys(allProblems);
    let random = Math.floor(Math.random() * keys.length);
    let problem = allProblems[keys[random]];
    const room = {
      challengerName: '',
      challengerTestsPassed: 0,
      creatorName: '', //'ron' || this.props.user,
      creatorTestsPassed: 0,
      gameStarted: false,
      players: 0,
      problemID: keys[random],
      problem: problem,
      spectators: 0
    };
    db.Rooms.push(room).then(added => {
      room.key = added.key;
      this.props.updateCurrentGameRoom(room);
      this.props.navigateToGameRoom(added.key);
    })
    */

  }
  render () {
    return (
      <div>
        <button onClick={this.createRoom}>Create Game Room</button>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    problems: state.problems
  }
}

const mapDispatcherToProps = (dispatch) => {
  return {
    updateCurrentGameRoom: (room) => {dispatch(updateCurrentGameRoom(room))},
    navigateToGameRoom: (id) => {dispatch(push('/GameRoom/' + id))}
  }
}
export default connect(mapStateToProps, mapDispatcherToProps)(CreateGameRoom);


// function writeUserData(userId, name, email, imageUrl) {
//   firebase.database().ref('users/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }