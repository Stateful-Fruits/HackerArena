import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import GameRoomList from '../Components/GameRooms/GameRoomList';

class Home extends Component {

  render() {
    let { gameRooms, navigate } = this.props;
    return (
       <div>    
         <button className="btn createGameButton" onClick={() => this.props.navigate('/CreateGameRoom')}>CREATE GAME ROOM</button>
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