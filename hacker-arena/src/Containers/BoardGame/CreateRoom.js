import React from 'react';
import { connect } from 'react-redux';
import db from '../../Firebase/db';
import { push } from 'react-router-redux';
import fire from '../../Firebase/firebase';
import noUiSlider from 'nouislider';
import './../../Styles/nouislider.css';
import './../../Styles/CreateBoardRoom.css';
import helpers from './../../Helpers/helpers';


class CreateRoom extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      problemID: Object.keys(props.problems)[0]
    }
    this.createRoom = this.createRoom.bind(this);
  }
  componentDidMount () {
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
  createRoom (e) {
    e.preventDefault();
    const slider = document.getElementById('slider'); 
    console.log('slider', slider)
    let sliderValues = slider.noUiSlider.get();
    let minDifficulty = parseInt(sliderValues[0], 10);
    let maxDifficulty = parseInt(sliderValues[1], 10);
    let allProblems = this.props.problems;
    let problems = helpers.filterProblemsByDifficulty(minDifficulty, maxDifficulty, allProblems);
    console.log('problemsssss', problems);
    let user = fire.auth().currentUser.email.split('@')[0];
    let room = {
      players: [user],
      playerInfo: {
        [user]: {
          position: [0,0],
          diceResult: 0,
          canMove: true,
          disruptions: [''],
          liveInput: '',
          events: '',
          credits: 5,
          testStatus: [],
          attack: ''
        }
      },
      gameStarted: false,
      playerCount: 1,
      winner: "",
      problems: problems,
      spectators: 0,
      playerTurn: user,
      board: [
        [[[0,user]],[[0]],[[0]],[[0]],[[0]],[[0]],[[0]]],
        [[[0]],[[0]],[[0]],[[0]],[[0]],[[0]],[[0]]],
        [[[0]],[[0]],[[0]],[[0]],[[0]],[[0]],[[0]]],
        [[[0]],[[0]],[[0]],[[0]],[[0]],[[0]],[[0]]],
        [[[0]],[[0]],[[0]],[[0]],[[0]],[[0]],[[0]]],
        [[[0]],[[0]],[[0]],[[0]],[[0]],[[0]],[[0]]],
        [[[0]],[[0]],[[0]],[[0]],[[0]],[[0]],[['END']]]
      ]
    }
    db.BoardRooms.push(room).then(added => {
      room.key = added.key;
      fire.database().ref('BoardRooms/' + added.key).set(room);
      this.props.navigateToBoardRoom(added.key);
    })
    room.board = room.board.map((row, i) => {
      return row.map((ele, j) => {
        var keys = Object.keys(room.problems);
        var random = Math.floor(Math.random() * keys.length);
        console.log('keys', room.problems[keys[random]]);
        return ele.concat(room.problems[keys[random]]);
      })
    })
  

  }
  render () {
    return (
      <div>
        <div className="slider-container">
          <div id="slider"></div>
        </div>
        <button className='createBoardroom' onClick={this.createRoom}><h3>Create Board Room</h3></button>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  console.log('state is ', state);
  return {
    problems: state.problems
  }
}

const mapDispatcherToProps = (dispatch) => {
  return {
    navigateToBoardRoom: (id) => {dispatch(push('/CodeRun/' + id))}
  }
}
export default connect(mapStateToProps, mapDispatcherToProps)(CreateRoom);