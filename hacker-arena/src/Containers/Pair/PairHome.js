import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import PairGameRoomList from '../../Components/Pair/PairGameRoomList';

class PairHome extends Component {

  render() {
    let { gameRooms, navigate } = this.props;
    return (
        <div>    
          <button onClick={() => this.props.navigate('/Pair/CreateGameRoom')}>CREATE PAIR GAME ROOM</button>
          <PairGameRoomList 
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

export default connect(mapStateToProps, mapDispatchToProps)(PairHome);