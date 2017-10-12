import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import fire from '../Firebase/firebase';

import GameRoomList from '../Components/GameRooms/GameRoomList';

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
    let { gameRooms, navigateToAbout } = this.props;
    return gameRooms ? (
       <div>
         <button onClick={ navigateToAbout }><h1>About</h1></button>
         <h2>Welcome to Hacker Arena</h2>
         <GameRoomList 
           gameRooms={gameRooms}
           navigateToAbout={navigateToAbout}
         />
       </div>
      ) : null;
  }
}

const mapStateToProps = (state) => {
  console.log('map state to props state passed: ', state);
  return ({
  gameRooms: state.gameRooms.gameRooms
});
};

const mapDispatchToProps = (dispatch) => ({
  updateGameRooms: (sampleGameRooms) => dispatch(updateGameRooms(sampleGameRooms)),
  navigateToAbout: () => dispatch(push('/About'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);