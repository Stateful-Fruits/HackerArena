import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import noUiSlider from 'nouislider'

import db from './../../Firebase/db';

import { filterProblemsByDifficulty, chooseRandomProblem } from './../../Helpers/problemHelpers';
import './../../Styles/PairCreateGameRoom.css';
import './../../Styles/nouislider.css';


class PairCreateGameRoom extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      problemID: Object.keys(props.problems)[0],
      isPrivate: false,
      startingCredits: 5,
      maxPairs: 2,
      rounds: 1,
      creatorRole: 'driver'
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);

    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    const slider = document.getElementById('slider');
    noUiSlider.create(slider, {
      start: [1, 5],
      step: 1,
      tooltips: true,
      connect: [false, true, false],
      range: {
        'min': [ 1 ],
        'max': [ 8 ]
      }
    });

    slider.noUiSlider.on('update', () => this.setState({
      problemID: 'random'
    }))
  }

  createRoom (problemID, isPrivate, startingCredits, maxPairs, rounds, creatorRole, minDifficulty = 0, maxDifficulty = 8) {
    let username = this.props.currentUser.username;
    let allProblems = this.props.problems;
    let problem = allProblems[problemID];
    const room = {
      roomStatus: 'standby',
      isPairRoom: true,
      startingCredits: startingCredits,
      isPrivate: isPrivate,
      problemID: problemID,
      problem: problem,
      spectators: 0,
      rounds: rounds,
      currentRound: 1,
      minDifficulty: minDifficulty,
      maxDifficulty: maxDifficulty,
      maxPairs: maxPairs,
      playerCapacity: maxPairs * 2,
      teams: [
        {[creatorRole]: username}
      ]
    };

    db.Rooms.push(room).then(added => {
      this.props.navigateToPairGameRoom(added.key);
    });
  }

  onSubmit(e) {
    e.preventDefault();
    
    const slider = document.getElementById('slider'); 
    let sliderValues = slider.noUiSlider.get();  
    
    let problemID = this.state.problemID;
    let minDifficulty = parseInt(sliderValues[0], 10);
    let maxDifficulty = parseInt(sliderValues[1], 10);

    if (!problemID || problemID.length === 0 || problemID === 'random') {
      let allProblems = this.props.problems;
      let filteredProblems = filterProblemsByDifficulty(minDifficulty, maxDifficulty, allProblems)
      problemID = chooseRandomProblem(filteredProblems);
    }

    let isPrivate = this.state.isPrivate
    let startingCredits = this.state.startingCredits;
    let maxPairs = this.state.maxPairs;
    let rounds = this.state.rounds;
    let creatorRole = this.state.creatorRole;

    this.createRoom(problemID, isPrivate, startingCredits, maxPairs, rounds, creatorRole, minDifficulty, maxDifficulty);
  }

  onChange(e) {
    e.preventDefault();

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
        <form className="createGameForm">
        <h2 className="createGameHeader"> Create Game Room </h2>
        <h5>Wins needed to be the champion</h5>
          <select
            type="number" 
            value={this.state.rounds} 
            name="rounds"
            onChange={this.onChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <br/>
          <h5>Max Pairs</h5>
          <input
            className="createGameInput"
            type="number" 
            value={this.state.maxPairs} 
            min="1" 
            max="3"
            name="maxPairs"
            onChange={this.onChange}
          />
          <br/>
          {/* <div className="form-check">
            <label className="form-check-label privateCheck">Make room private</label>
            <input
              className="form-check-input"
              type="checkbox"
              label="Make room private"
              checked={this.state.isPrivate} 
              name="isPrivate"
              onChange={this.onCheck}
            />
          </div> */}
          <br/>
          <h5>Starting Attack credits</h5>
          <input
            className="createGameInput"
            type="number" 
            value={this.state.startingCredits} 
            min="1" 
            max="50" 
            name="startingCredits"
            onChange={this.onChange}
          />
          <br/>
          <h5>Your role</h5>
          <select name="creatorRole" value={this.state.creatorRole} onChange={this.onChange}>
            <option value="driver">driver</option>
            <option value="navigator">navigator</option>
          </select>
          <br/>
          <h5>Choose a problem</h5>
          <select name="problemID" value={this.state.problemID} onChange={this.onChange}>
            {problemsArr}
            <option value="random">random!</option>
          </select>
          <br/>
          <br/>
          <h5>Select a difficulty level for this and subsequent problems</h5>
          <div className="slider-container">
            <div id="slider"></div>
          </div>
          <input className="submitCreateGame" type="submit" value="CREATE GAME ROOM" onClick={this.onSubmit}></input>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    problems: state.problems,
    currentUser: state.currentUser
  }
}

const mapDispatcherToProps = (dispatch) => {
  return {
    navigateToPairGameRoom: (id) => {dispatch(push('/Pair/GameRoom/' + id))}
  }
}
export default connect(mapStateToProps, mapDispatcherToProps)(PairCreateGameRoom);