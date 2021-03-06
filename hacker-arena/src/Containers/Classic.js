import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import GameRoomList from '../Components/GameRooms/GameRoomList';

class Classic extends Component {

  render() {
    let { gameRooms, navigate, currentUser } = this.props;
    return (
       <div>    
         <button className="btn createGameButton" onClick={() => this.props.navigate('/CreateGameRoom')}>CREATE GAME ROOM</button>
          <GameRoomList 
            currentUser={currentUser}
            gameRooms={gameRooms || {}}
            navigate={navigate}
          />
       </div>
      );
  }
}

const mapStateToProps = (state) => ({
  gameRooms: state.gameRooms,
  currentUser: state.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  navigate: (route) => dispatch(push(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Classic);