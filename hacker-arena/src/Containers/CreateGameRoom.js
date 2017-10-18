import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import updateCurrentGameRoom from '../Actions/updateCurrentGameRoom';
import db from '../Firebase/db';

class CreateGameRoom extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      problemID: '',
      isPrivate: false,
      startingCredits: 5,
      playerCapacity: 2
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);

    this.createRoom = this.createRoom.bind(this);
  }

  createRoom (e, problemID, isPrivate, startingCredits, playerCapacity) {
    let allProblems = this.props.problems;
    let problem = allProblems[problemID];
    const room = {
      gameStarted: false,
      winner: "",
      closed: false,
      startingCredits: startingCredits,
      isPrivate: isPrivate,
      problemID: problemID,
      problem: problem,
      spectators: 0
    };

    db.Rooms.push(room).then(added => {
      this.props.navigateToGameRoom(added.key);
    });
  }

  onSubmit(e) {
    e.preventDefault();
    problemID = this.state.problemID || 
  }

  onChange(e) {
    e.preventDefault();
    console.log('change running', e.target.value);

    this.setState({[e.target.name] : e.target.value || e.target.checked})
  }

  onCheck(e) {
    e.stopPropagation();
    let name = e.target.name;

    this.setState(({ isPrivate }) => {
      return {[name] : !isPrivate}})
  }

  render () {
    return (
      <div>
        <form>
          Max Players
          <input
            type="number" 
            value={this.state.playerCapacity} 
            min="1" 
            max="4" 
            name="playerCapacity"
            onChange={this.onChange}
          />
          Make room private
          <input
            type="checkbox"
            label="Make room private"
            checked={this.state.isPrivate} 
            name="isPrivate"
            onChange={this.onCheck}
          />
          Starting Attack credits<input
            type="number" 
            value={this.state.startingCredits} 
            min="1" 
            max="50" 
            name="startingCredits"
            onChange={this.onChange}
          />
        </form>
        <button onClick={this.createRoom}><h3>Create Game Room</h3></button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
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