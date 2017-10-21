import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import noUiSlider from 'nouislider'

import fire from './../../Firebase/firebase';
import db from './../../Firebase/db';

import helpers from './../../Helpers/helpers';
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
    let username = fire.auth().currentUser.email.split('@')[0];
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
    console.log('slider', slider)
    let sliderValues = slider.noUiSlider.get();  
    console.log('sliderValues', sliderValues)  
    
    let problemID = this.state.problemID;
    let minDifficulty = parseInt(sliderValues[0], 10);
    let maxDifficulty = parseInt(sliderValues[1], 10);

    if (!problemID || problemID.length === 0 || problemID === 'random') {
      let allProblems = this.props.problems;
      let filteredProblems = helpers.filterProblemsByDifficulty(minDifficulty, maxDifficulty, allProblems)
      problemID = helpers.chooseRandomProblem(filteredProblems);
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
    console.log('e.target.name', 'e.target.value', e.target.name, e.target.value);

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
        Wins needed to be the champion
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
          Max Pairs
          <input
            type="number" 
            value={this.state.maxPairs} 
            min="1" 
            max="2"
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
          Your role
          <select name="creatorRole" value={this.state.creatorRole} onChange={this.onChange}>
            <option value="driver">driver</option>
            <option value="navigator">navigator</option>
          </select>
          <br/>
          Choose a problem
          <select name="problemID" value={this.state.problemID} onChange={this.onChange}>
            {problemsArr}
            <option value="random">random!</option>
          </select>
          <br/>
          <br/>
          Select a difficulty level for this and subsequent problems
          <div className="slider-container">
            <div id="slider"></div>
          </div>
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
    navigateToPairGameRoom: (id) => {dispatch(push('/Pair/GameRoom/' + id))}
  }
}
export default connect(mapStateToProps, mapDispatcherToProps)(PairCreateGameRoom);