import React from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
=======
//import fire from '../firebase';
import updateCurrentGameRoom from '../Actions/updateCurrentGameRoom';
import db from '../db';
import { push } from 'react-router-redux';
>>>>>>> gamecreator

class CreateGameRoom extends React.Component {
  constructor (props) {
    super (props);
<<<<<<< HEAD
  }
  render () {
    let {Create} = this.props;
    return (
      <div>
        <button onClick={Create}>Create Game Room</button>
        
=======
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
        creatorName: this.props.user,
        creatorTestsPassed: 0,
        gameStarted: false,
        players: 1,
        problemID: selectedProblem.key,
        spectators: 0
      };
      db.Rooms.push(room).then(added => {
        room.key = added.key;
        this.props.updateCurrentGameRoom(room);
        this.props.navigateToGameRoom();
      })
    })
  }
  render () {
    return (
      <div>
        <button onClick={this.createRoom}>Create Game Room</button>
>>>>>>> gamecreator
      </div>
    )
  }
}
<<<<<<< HEAD
//snapshot.key
const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatcherToProps = (dispatcher) => {
  return {

  }
}


export default connect(mapStateToProps)(CreateGameRoom);
=======
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatcherToProps = (dispatch) => {
  return {
    updateCurrentGameRoom: (room) => {dispatch(updateCurrentGameRoom(room))},
    navigateToGameRoom: () => {dispatch(push('/GameRoom'))}
  }
}
export default connect(mapStateToProps, mapDispatcherToProps)(CreateGameRoom);
>>>>>>> gamecreator


// function writeUserData(userId, name, email, imageUrl) {
//   firebase.database().ref('users/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }