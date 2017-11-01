import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import noUiSlider from 'nouislider'

import db from '../Firebase/db';

import fire from '../Firebase/firebase';

import {filterProblemsByDifficulty, chooseRandomProblem} from './../Helpers/problemHelpers';
import './../Styles/CreateGameRoom.css';
import './../Styles/nouislider.css';


class CreateGameRoom extends React.Component {
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
      isPrivate,
      problemID,
      problem,
      spectators: 0,
      rounds,
      currentRound: 1,
      minDifficulty,
      maxDifficulty,
      playerCapacity
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

    let username = this.props.currentUser.username;
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
        <form className="createGameForm">
          <h2 className="createGameHeader"> Create Game Room </h2>
          <h5>Wins needed to be the champion</h5>
          <input
            className="createGameInput"
            type="number" 
            min="1"
            max="3"
            value={this.state.rounds} 
            name="rounds"
            onChange={this.onChange}
          >
          </input>
          <br/>
          <h5>Maximum number of players</h5>
          <input
            className="createGameInput"
            type="number" 
            value={this.state.playerCapacity} 
            min="1" 
            max="4" 
            name="playerCapacity"
            onChange={this.onChange}
          />
          <br/>
          <h5>Set starting disruption credits</h5>
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
          <h5>Select a problem</h5>
          <select className="createGameInput" name="problemID" value={this.state.problemID} onChange={this.onChange}>
            {problemsArr}
            <option value="random">Random!</option>
          </select>
          <br/>
          <h5>Select difficulty level of problems</h5>
          <div className="slider-container">
            <div id="slider"></div>
          </div>
          <div className="form-check">
          <label className="form-check-label privateCheck">Make room private</label>
          <input
            className="form-check-input"
            type="checkbox"
            label="Make room private"
            checked={this.state.isPrivate} 
            name="isPrivate"
            onChange={this.onCheck}
          />
          </div>
          {
            !this.state.isPrivate ? null : (
              <div>
                <h5>Invite Players:</h5>
                
                  {
                    this.state.invitedPlayers.map((player, i) => (
                      <div>
                        <div>Player {i}</div>
                        <input className="createGameInput" type='text' value={this.state.invitedPlayers[i]} onChange={(e) => {
                          let invitedPlayers = [...this.state.invitedPlayers];
                          invitedPlayers[i] = e.target.value;
                          this.setState({ invitedPlayers });
                        }}/>
                      </div>
                    )).slice(1)
                  }
                
              </div>
            )
          }
          <input className="submitCreateGame" type="submit" value="Create Game" onClick={this.onSubmit}></input>
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
    navigateToGameRoom: (id) => {dispatch(push('/GameRoom/' + id))}
  }
}
export default connect(mapStateToProps, mapDispatcherToProps)(CreateGameRoom);