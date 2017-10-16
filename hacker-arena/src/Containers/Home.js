import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import GameRoom from './GameRoom';
import GameRoomList from '../Components/GameRooms/GameRoomList';
import CreateGameRoom from './CreateGameRoom';

class Home extends Component {

  render() {
    let { gameRooms, navigate } = this.props;
    return (
       <div>    
         <h2>Welcome to Hacker Arena</h2>
         <CreateGameRoom />
         <GameRoomList 
           gameRooms={gameRooms || {}}
           navigate={navigate}
          />
       </div>
      );
  }
}

const mapStateToProps = (state) => ({
  gameRooms: state.gameRooms
});

const mapDispatchToProps = (dispatch) => ({
  navigate: (route) => dispatch(push(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);