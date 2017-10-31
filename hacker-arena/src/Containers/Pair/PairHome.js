import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import PairGameRoomList from '../../Components/Pair/PairGameRoomList';

class PairHome extends Component {

  render() {
    let { gameRooms, navigate, currentUser } = this.props;
    return (
        <div>    
          <button className="btn createGameButton" onClick={() => this.props.navigate('/Pair/CreateGameRoom')}>CREATE PAIR GAME ROOM</button>
          <PairGameRoomList 
            gameRooms={gameRooms || {}}
            navigate={navigate}
            currentUser={currentUser}
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

export default connect(mapStateToProps, mapDispatchToProps)(PairHome);