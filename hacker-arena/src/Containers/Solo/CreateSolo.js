import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import noUiSlider from 'nouislider'

import fire from './../../Firebase/firebase';
import db from './../../Firebase/db';

import {filterProblemsByDifficulty, chooseRandomProblem} from './../../Helpers/problemHelpers';
import './../../Styles/PairCreateGameRoom.css';
import './../../Styles/nouislider.css';


class Solo extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      problemID: Object.keys(props.problems)[0],
      isPrivate: false,
      startingCredits: 5,
      playerCapacity: 2,
      rounds: 1,
      invitedPlayers: []
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

  createRoom (problemID, isPrivate, startingCredits, playerCapacity, rounds, minDifficulty = 0, maxDifficulty = 8) {
    let allProblems = this.props.problems;
    let problem = allProblems[problemID];
    const room = {
      roomStatus: 'standby',
      isPairRoom: false,
      startingCredits,
      isPrivate: true,
      problemID,
      problem,
      spectators: 0,
      rounds,
      currentRound: 1,
      minDifficulty,
      maxDifficulty,
      playerCapacity: 2
    };
    if (room.isPrivate) room.invitedPlayers = this.state.invitedPlayers;
    db.Rooms.push(room).then(added => {
      this.props.navigateToGameRoom(added.key);
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
    let playerCapacity = this.state.playerCapacity;
    let rounds = this.state.rounds;

    this.createRoom(problemID, isPrivate, startingCredits, playerCapacity, rounds, minDifficulty, maxDifficulty);
  }

  onChange(e) {
    e.preventDefault();
    // if changing the number of players to invite, need up update number of inputs
    // to show the user when enter their friend's names
    if (e.target.name === 'playerCapacity' && this.state.isPrivate) {
      let invitedPlayers = this.state.invitedPlayers;
      let previousCapacity = this.state.playerCapacity;
      if (previousCapacity > e.target.value) {
        invitedPlayers = invitedPlayers.slice(0, e.target.value);
      } else {
        for (let i = 0; i < (e.target.value - previousCapacity); i++) invitedPlayers.push('');
      }
      this.setState({
        [e.target.name] : e.target.value,
        invitedPlayers 
      }); 
    } else {
      this.setState({[e.target.name] : e.target.value}); 
    }
  }

  onCheck(e) {
    e.stopPropagation();
    let username = fire.auth().currentUser.email.split('@')[0];
    let name = e.target.name;
    let invitedPlayers = [];
    for (let i = 0; i < this.state.playerCapacity; i++) invitedPlayers.push('');
    invitedPlayers[0] = username;
    this.setState(({ isPrivate }) => {
      return {
        [name] : !isPrivate,
        invitedPlayers
      }})
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
          <br/>
          Choose a problem
          <select name="problemID" value={this.state.problemID} onChange={this.onChange}>
            {problemsArr}
            <option value="random">random!</option>
          </select>
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
    navigateToGameRoom: (id) => {dispatch(push('Solo/GameRoom/' + id))}
  }
}
export default connect(mapStateToProps, mapDispatcherToProps)(Solo);