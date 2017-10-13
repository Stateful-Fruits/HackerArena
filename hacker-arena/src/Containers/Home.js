import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import fire from '../Firebase/firebase';
import db from '../Firebase/db';

import GameRoom from './GameRoom';
import GameRoomList from '../Components/GameRooms/GameRoomList';
import CreateGameRoom from './CreateGameRoom';

import updateGameRooms from '../Actions/updateGameRooms';
import updateProblems from '../Actions/updateProblems';

class Home extends Component {
  componentWillMount() {
    let { updateGameRooms, updateProblems } = this.props;
    // grab and listen for game rooms from firebase db
    db.Rooms.on('value', data => {
      const roomsData = data.val();
      const roomKeys = Object.keys(roomsData);
      const rooms = roomKeys.map((roomKey) => {
        const roomData = roomsData[roomKey];
        roomData.key = roomKey;
        return roomData;
      });
      // dispatch action to change game rooms array in store
      updateGameRooms(rooms);
    });

    db.Problems.once('value', data => {
      const problemsData = data.val();
      const problemKeys = Object.keys(problemsData);
      const problems = problemKeys.map((problemKey) => {
        const problemData = problemsData[problemKey];
        problemData.key = problemKey;
        return problemData
      });

    updateProblems(problems);  
    });

  }

  render() {
    let { gameRooms, navigateToAbout, navigateToGameRoom } = this.props;
    return gameRooms ? (
       <div>    
         <h2>Welcome to Hacker Arena</h2>
         <CreateGameRoom />
         <GameRoomList 
           gameRooms={gameRooms}
           navigateToAbout={navigateToAbout}
           navigateToGameRoom={navigateToGameRoom}
         />
       </div>
      ) : null;
  }
}

const mapStateToProps = (state) => {
  console.log('map state to props state passed: ', state);
  return ({
  problems: state.problems,
  gameRooms: state.gameRooms
});
};

const mapDispatchToProps = (dispatch) => ({
  updateGameRooms: (rooms) => dispatch(updateGameRooms(rooms)),
  updateProblems: (problems) => dispatch(updateProblems(problems)),
  navigateToAbout: () => dispatch(push('/About')),
  navigateToGameRoom: () => dispatch(push('/GameRoom'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);