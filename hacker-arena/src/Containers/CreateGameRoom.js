import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import noUiSlider from 'nouislider'

import db from '../Firebase/db';

import fire from '../Firebase/firebase';

import helpers from './../Helpers/helpers';
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
      let filteredProblems = helpers.filterProblemsByDifficulty(minDifficulty, maxDifficulty, allProblems)
      problemID = helpers.chooseRandomProblem(filteredProblems);
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
          Max Players
          <input
            type="number" 
            value={this.state.playerCapacity} 
            min="1" 
            max="4" 
            name="playerCapacity"
            onChange={this.onChange}
          />
          {
            !this.state.isPrivate ? null : (
              <div>
                <h3>Invite Players:</h3>
                <ul>
                  {
                    this.state.invitedPlayers.map((player, i) => (
                      <li key={i}>
                        <input type='text' value={this.state.invitedPlayers[i]} onChange={(e) => {
                          let invitedPlayers = [...this.state.invitedPlayers];
                          invitedPlayers[i] = e.target.value;
                          this.setState({ invitedPlayers });
                        }}/>
                      </li>
                    )).slice(1)
                  }
                </ul>
              </div>
            )
          }
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
    navigateToGameRoom: (id) => {dispatch(push('/GameRoom/' + id))}
  }
}
export default connect(mapStateToProps, mapDispatcherToProps)(CreateGameRoom);