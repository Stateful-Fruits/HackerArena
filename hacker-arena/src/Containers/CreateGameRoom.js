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
      playerCapacity: 2,
      rounds: 1
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);

    this.createRoom = this.createRoom.bind(this);
  }

  createRoom (problemID, isPrivate, startingCredits, playerCapacity, rounds) {
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
      spectators: 0,
      rounds: 0
    };

    db.Rooms.push(room).then(added => {
      this.props.navigateToGameRoom(added.key);
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let problemID = this.state.problemID;

    if (!problemID || problemID.length === 0) {
      let allProblems = this.props.problems;
      let keys = Object.keys(allProblems);
      let random = Math.floor(Math.random() * keys.length);
      problemID = keys[random];
    }

    let isPrivate = this.state.isPrivate
    let startingCredits = this.state.startingCredits;
    let playerCapacity = this.state.playerCapacity;

    this.createRoom(problemID, isPrivate, startingCredits, playerCapacity);
  }

  onChange(e) {
    e.preventDefault();
    console.log('e.target.value', e.target.value);

    this.setState({[e.target.name] : e.target.value})
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
        Rounds
          <select
            type="number" 
            value={this.state.rounds} 
            name="rounds"
            onChange={this.onChange}
          >
            <option value="1">1</option>
            <option value="3">3</option>
            <option value="5">5</option>
          </select>
          <br/>
          Max Players
          <input
            type="number" 
            value={this.state.playerCapacity} 
            min="1" 
            max="4" 
            name="playerCapacity"
            onChange={this.onChange}
          /><br/>
          Make room private
          <input
            type="checkbox"
            label="Make room private"
            checked={this.state.isPrivate} 
            name="isPrivate"
            onChange={this.onCheck}
          /><br/>
          Starting Attack credits<input
            type="number" 
            value={this.state.startingCredits} 
            min="1" 
            max="50" 
            name="startingCredits"
            onChange={this.onChange}
          /><br/>
          <input type="submit" value="CREATE GAME ROOM" onClick={this.onSubmit}></input>
        </form>
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