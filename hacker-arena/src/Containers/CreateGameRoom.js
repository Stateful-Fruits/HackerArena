import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import updateCurrentGameRoom from '../Actions/updateCurrentGameRoom';
import db from '../Firebase/db';

class CreateGameRoom extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      problemID: Object.keys(props.problems)[0],
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
      roomStatus: 'standby',
      winner: '',
      startingCredits: startingCredits,
      isPrivate: isPrivate,
      problemID: problemID,
      problem: problem,
      spectators: 0,
      rounds: 0,
      currentRound: 1,
      playerCapacity
    };

    db.Rooms.push(room).then(added => {
      this.props.navigateToGameRoom(added.key);
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let problemID = this.state.problemID;
    console.log('problemID', problemID)

    if (!problemID || problemID.length === 0 || problemID === 'random') {
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

    console.log('about to set state', JSON.stringify({[e.target.name] : e.target.value}))

    this.setState({[e.target.name] : e.target.value})
  }

  onCheck(e) {
    e.stopPropagation();
    let name = e.target.name;

    this.setState(({ isPrivate }) => {
      return {[name] : !isPrivate}})
  }

  render () {
    let allProblems = this.props.problems;
    let problemsArr = [];
    for (let problemKey in allProblems) {
      let problem = allProblems[problemKey]
      problemsArr.push(<option value={problemKey} key={problemKey}>{problem.title} </option>)
    }

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
          />
          <br/>
          Make room private
          <input
            type="checkbox"
            label="Make room private"
            checked={this.state.isPrivate} 
            name="isPrivate"
            onChange={this.onCheck}
          />
          <br/>
          Starting Attack credits<input
            type="number" 
            value={this.state.startingCredits} 
            min="1" 
            max="50" 
            name="startingCredits"
            onChange={this.onChange}
          />
          <br/>
          Choose a problem
          <select name="problemID" value={this.state.problemID} onChange={this.onChange}>
            {problemsArr}
            <option value="random">random!</option>
          </select>
          <br/>
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