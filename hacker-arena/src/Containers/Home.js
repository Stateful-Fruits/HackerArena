import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import GameRoom from './GameRoom'
import GameRoomList from '../Components/GameRooms/GameRoomList';

import updateGameRooms from '../Actions/updateGameRooms';

const sampleGameRooms = [
  {roomName: 'Paul\'s Game'},
  {roomName: 'Kai\'s Game'},
  {roomName: 'Simon\'s Game'},
  {roomName: 'David\'s Game'},
];

class Home extends Component {
  componentWillMount() {
    console.log(this.props);
    let { updateGameRooms } = this.props;
    updateGameRooms(sampleGameRooms);
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