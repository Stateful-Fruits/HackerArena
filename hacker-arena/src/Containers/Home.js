import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import GameRoomList from '../Components/GameRooms/GameRoomList';

const sampleGameRooms = [
  {roomName: 'Paul\'s Game'},
  {roomName: 'Kai\'s Game'},
  {roomName: 'Simon\'s Game'},
  {roomName: 'David\'s Game'},
];

const Home = ({ gameRooms, dispatch }) => (
  <div>
    <button onClick={ () => dispatch(push('/About')) }><h1>About</h1></button>
    <button onClick={ () => dispatch(push('/User')) }><h1>ADD A GAME</h1></button>

    <h2>Welcome to Hacker Arena</h2>
    <GameRoomList 
      gameRooms={gameRooms}
    />
  </div>
);

const mapStateToProps = (state) => ({
  gameRooms: sampleGameRooms
});

// const mapDispatchToProps = () => {
// };


export default connect(mapStateToProps)(Home);