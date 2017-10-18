import React from 'react';
import {connect} from 'react-redux';
import fire from '../../Firebase/firebase';

class GameRoom extends React.Component {
  componentWillMount() { 
  }

  render () {
    let exist = this.props.room !== undefined;
    if (exist) {
      return <div>
        <div>Run run run your code hastily down the board</div>
        {JSON.stringify(this.props.room.players)}
      </div>
    } else {
      return <div>
          <div>Run run run your code hastily down the board</div>
          <div> Please wait as we prepare your board </div>
        </div>
    }
  }
}

const mapStoP = (state) => {
  return {
    room: state.boardRooms ? state.boardRooms[state.router.location.pathname.split('/')[2]] : {},
  }
}

const mapDtoP = (dispatch) => {
  return {
  }
}

export default connect(mapStoP,mapDtoP)(GameRoom);
