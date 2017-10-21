import React, { Component } from 'react';

import PairGameRoomPreview from './PairGameRoomPreview';

class GameRoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: ['None', 'Open Rooms', 'Spectators'],
      filterInx: 0,
      filterFunctions: {
        None: (gameRoom1, gameRoom2) => 0,
        'Open Rooms': (gameRoom1, gameRoom2) => (
          (gameRoom1.playerCapacity - Object.keys(gameRoom1.players || {})) - 
          (gameRoom2.playerCapacity - Object.keys(gameRoom2.players || {}))
        ),
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
    const roomKeys = Object.keys(gameRooms).filter(key => gameRooms[key].isPairRoom);
    const rooms = roomKeys.map((roomKey) => {
      const roomData = gameRooms[roomKey];
      roomData.key = roomKey;
      return roomData;
    });
    return (
      <div>
        <h3> Sort By: </h3>
        <select className='form-control' style={{ width: '20%', marginLeft: '40%', fontSize: '1.5em', height: '40px' }} onChange={this.handleSortChange} value={this.state.filters[this.state.filterInx]}>
          { this.state.filters.map((filter) => <option key={filter} style={{ fontSize: '1.5em' }}>{filter}</option>) }
        </select>
        <ul className='list-group'>
          { rooms.sort(this.state.filterFunctions[this.state.filters[this.state.filterInx]])
                 .filter((eachRoom) => !Object.keys(eachRoom).includes('isTrusted') && !Object.keys(eachRoom).includes('challengerName'))
                 .reverse()
                 .map((room, inx) => (
            <PairGameRoomPreview 
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