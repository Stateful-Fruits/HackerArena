import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import fire from '../Firebase/firebase';

import GameRoom from './GameRoom';
import GameRoomList from '../Components/GameRooms/GameRoomList';
import CreateGameRoom from './CreateGameRoom';

import updateGameRooms from '../Actions/updateGameRooms';

class Home extends Component {
  componentWillMount() {
    let { updateGameRooms } = this.props;
    // reference to firebase db
    let roomsRef = fire.database().ref('rooms');
    // grab and listen for game rooms from firebase db
    roomsRef.on('value', data => {
      const roomsData = data.val();
      const roomKeys = Object.keys(roomsData);
      const rooms = roomKeys.map((roomKey) => {
        let roomData = roomsData[roomKey];
        roomData.key = roomKey;
        return roomData;
      });
      // dispatch action to change game rooms array in store
      updateGameRooms(rooms);
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
  gameRooms: state.gameRooms
});
};

const mapDispatchToProps = (dispatch) => ({
  updateGameRooms: (sampleGameRooms) => dispatch(updateGameRooms(sampleGameRooms)),
  navigateToAbout: () => dispatch(push('/About')),
  navigateToGameRoom: () => dispatch(push('/GameRoom'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);