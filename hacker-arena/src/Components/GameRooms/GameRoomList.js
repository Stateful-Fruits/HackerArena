import React, { Component } from 'react';

import GameRoomPreview from './GameRoomPreview';

class GameRoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: ['None', 'Open Rooms', 'Spectators'],
      filterInx: 0,
      filterFunctions: {
        None: (gameRoom1, gameRoom2) => 0,
        'Open Rooms': (gameRoom1, gameRoom2) => gameRoom1.challengerName ? (gameRoom2.challengerName ? 0 : -1) : (gameRoom2.challengerName ? 1 : 0),
        Spectators: (gameRoom1, gameRoom2) => (gameRoom1.spectators ? gameRoom1.spectators.length : 0) - (gameRoom2.spectators ? gameRoom2.spectators.length : 0)
      }
    }
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  handleSortChange(e) {
    this.setState({
      filterInx: this.state.filters.indexOf(e.target.value)
    });
  }

  render() {
    let { gameRooms, navigate} = this.props;
    const roomKeys = Object.keys(gameRooms);
    const rooms = roomKeys.map((roomKey) => {
      const roomData = gameRooms[roomKey];
      roomData.key = roomKey;
      return roomData;
    });
    return (
      <div>
        <h3> Sort By: </h3>
        <select className='form-control' style={{ width: '80%', marginLeft: '10%' }} onChange={this.handleSortChange} value={this.state.filters[this.state.filterInx]}>
          { this.state.filters.map((filter) => <option key={filter}>{filter}</option>) }
        </select>
        <ul className='list-group'>
          { rooms.sort(this.state.filterFunctions[this.state.filters[this.state.filterInx]]).reverse().map((room, inx) => (
            <GameRoomPreview 
              gameRoom={room}
              key={room.key + inx}
              navigate={navigate}
            />
          ))}
        </ul>
      </div>
  );

  }
}

export default GameRoomList;