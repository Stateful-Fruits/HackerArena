import React, { Component } from 'react';
import fire from '../../Firebase/firebase';
import GameRoomPreview from './GameRoomPreview';

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
    const roomKeys = Object.keys(gameRooms).filter(key => !gameRooms[key].isPairRoom);
    let username = fire.auth().currentUser.email.split('@')[0];
    const rooms = roomKeys.map((roomKey) => {
      const roomData = gameRooms[roomKey];
      roomData.key = roomKey;
      return roomData;
    });

    // games that you were invited to
    let privateGames = rooms
      .filter(eachRoom => (
        (Object.keys(eachRoom).includes('isPrivate') ? eachRoom.isPrivate : false) && 
        !Object.keys(eachRoom).includes('isTrusted') &&
        (Object.keys(eachRoom).includes('invitedPlayers') ? eachRoom.invitedPlayers.includes(username) : false)
      ))
      .sort(this.state.filterFunctions[this.state.filters[this.state.filterInx]])
      .map((room, inx) => (
        <div key={room.key + room.problemID}>
          <h3 style={{ color: 'green' }}>Private Game</h3>
          <GameRoomPreview 
            gameRoom={room}
            navigate={navigate}
          />
        </div>
      ));

    // games open to everyone
    let publicGameRooms = rooms
      .filter(eachRoom => (
        !Object.keys(eachRoom).includes('isTrusted') && 
        (Object.keys(eachRoom).includes('isPrivate') ? !eachRoom.isPrivate : true))
      )
      .sort(this.state.filterFunctions[this.state.filters[this.state.filterInx]])
      .reverse()
      .map((room, inx) => (
        <GameRoomPreview 
          gameRoom={room}
          key={room.key + inx}
          navigate={navigate}
        />
      ));
    return (
      <div>
        <h3> Sort By: </h3>
        <select className='form-control' style={{ width: '20%', marginLeft: '40%', fontSize: '1.5em', height: '40px' }} onChange={this.handleSortChange} value={this.state.filters[this.state.filterInx]}>
          { this.state.filters.map((filter) => <option key={filter} style={{ fontSize: '1.5em' }}>{filter}</option>) }
        </select>
        { privateGames.length ?
          <div>
            <ul className='list-group'>
              { privateGames }
            </ul>
          </div> : null
        }
        <ul className='list-group'>
          { publicGameRooms }
        </ul>
      </div>
  );

  }
}

export default GameRoomList;