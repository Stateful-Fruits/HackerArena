import React, { Component } from 'react';
import fire from '../../Firebase/firebase';
import GameRoomPreview from './GameRoomPreview';
import './../../Styles/GameRoomList.css';

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
      },
      searchInput: "",
      showSearched: false
    }
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleShowSearch = this.handleShowSearch.bind(this);
    this.handleDeleteRoom = this.handleDeleteRoom.bind(this);
  }

  handleSortChange(e) {
    this.setState({
      filterInx: this.state.filters.indexOf(e.target.value)
    });
  }
  handleSearchInput(e){
    this.setState({searchInput: e.target.value});
    if(e.target.value === ""){
      this.setState({showSearched: false})
    }
  }
  handleShowSearch(){
    this.setState({showSearched: true});
  }

  handleDeleteRoom(e) {
    e.preventDefault();
    let roomId = e.target.value;
    fire.database().ref('rooms/' + roomId).remove();
  }

  render() {
    let { gameRooms, navigate, currentUser } = this.props;
    const roomKeys = Object.keys(gameRooms).filter(key => !gameRooms[key].isPairRoom);
    let username = currentUser.username;
    const rooms = roomKeys.map((roomKey) => {
      const roomData = gameRooms[roomKey];
      roomData.key = roomKey;
      return roomData;
    });

    let arrSearch = (arr, match) => {
      let check = false;
      for (let i = 0 ; i < arr.length ; i++){
        if(arr[i].includes(match)){
          check = true;
          break;
        }
      }
      return check;
    }

    let playerSearch = () => {
      let rrr = rooms.filter(room => {
        return room.players ?
        arrSearch(Object.keys(room.players),`${this.state.searchInput}`)
        :
        null
      })
      return rrr;
    }
    // games that you were invited to
    let privateGames = rooms
      .filter(eachRoom => (
        (Object.keys(eachRoom).includes('isPrivate') ? eachRoom.isPrivate : false) && 
        !Object.keys(eachRoom).includes('isTrusted') &&
        (Object.keys(eachRoom).includes('invitedPlayers') ? eachRoom.invitedPlayers.includes(username) : false)))
      .sort(this.state.filterFunctions[this.state.filters[this.state.filterInx]])
      .map((room, inx) => (
        <div key={room.key + room.problemID}>
          <h3 style={{ color: 'green' }}>Private Game</h3>
          <GameRoomPreview 
            roomId={room.key}
            gameRoom={room}
            key={room.key + inx}
            navigate={navigate}
            currentUser={currentUser}
            handleDeleteRoom={handleDeleteRoom}
          />
        </div>
      ));

    // games open to everyone
    let handleDeleteRoom = this.handleDeleteRoom
    let publicGameRooms = rooms
      .filter(eachRoom => (
        !Object.keys(eachRoom).includes('isTrusted') && 
        (Object.keys(eachRoom).includes('isPrivate') ? !eachRoom.isPrivate : true))
      )
      .sort(this.state.filterFunctions[this.state.filters[this.state.filterInx]])
      .reverse()
      .map((room, inx) => (
        <GameRoomPreview 
          roomId={room.key}
          gameRoom={room}
          key={room.key + inx}
          navigate={navigate}
          currentUser={currentUser}
          handleDeleteRoom={handleDeleteRoom}
        />
      ));
    return (
      <div id='GameRoomList'>
        <div className="searchAndFilter">
        <div className="input-group gameListSearch">
          <span className="input-group-addon"><img src="/assets/search.png"/></span>
          <input onChange={this.handleSearchInput} type="text" className="form-control searchBar" placeholder="Search for players"/>
          <span className="input-group-addon" onClick={this.handleShowSearch}> Search</span>
        </div>
        <div className="input-group filterGameSearch">
        <span className="input-group-addon"><img src="/assets/filter.png"/></span>
        <select className='form-control filterBar' onChange={this.handleSortChange} value={this.state.filters[this.state.filterInx]}>
          { this.state.filters.map((filter) => <option key={filter} style={{ fontSize: '1.5em' }}>{filter}</option>) }
        </select>
        <span className="input-group-addon" onClick={this.handleShowSearch}>Sort By</span>
        </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {<h4 className="gamesHeader"> Game Rooms </h4>}
        </div>
        { privateGames.length ?
          <div>
            <ul className='list-group'>
              { privateGames }
            </ul>
          </div> : null
        }
        <ul className='list-group'>
          { !this.state.showSearched ?
            (publicGameRooms)
          :
          playerSearch().map((room, inx) => (
            <GameRoomPreview
              roomId={room.key}
              gameRoom={room}
              key={room.key + inx}
              navigate={navigate}
              currentUser={currentUser}
              handleDeleteRoom={handleDeleteRoom}
            />))
          }
        </ul>
      </div>
  );

  }
}

export default GameRoomList;

// (rooms.sort(this.state.filterFunctions[this.state.filters[this.state.filterInx]])
// .filter(eachRoom => (
//   !Object.keys(eachRoom).includes('isTrusted') && 
//   !Object.keys(eachRoom).includes('challengerName') &&
//   (Object.keys(eachRoom).includes('isPrivate') ? !eachRoom.isPrivate : true))
// )
// .reverse()
// .map((room, inx) => (
// <GameRoomPreview 
// gameRoom={room}
// key={room.key + inx}
// navigate={navigate}
// />
// )))
