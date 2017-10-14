import React, { Component } from 'react';
import { connect } from 'react-redux';

import SpectatorEditors from '../../Components/Spectator/SpectatorEditors';
import SpectatorChat from '../../Components/Spectator/SpectatorChat';
import SpectatorGameDescription from '../../Components/Spectator/SpectatorGameDescription';
import SpectatorError from '../../Components/Spectator/SpectatorError';

class SpectatorRoom extends Component {
  componentWillMount() {
    // connect to the gameroom in the database here
  }

  render() {
    let gameRoom = this.props.gameRooms[this.props.gameRoomId];
    return gameRoom ? (
      <div>
        {/* 
          - include the list of disruptions and progress bar in 
            the problem description
          - create a view for each player's editor and allow the 
          spectator to run that players code in the editor's console
          - have a chat for the spectators
        */}
        <SpectatorGameDescription
          gameRoom={gameRoom} 
        />
        <SpectatorEditors 
          gameRoom={gameRoom}
        />
        <SpectatorChat />
      </div>
    ) : (
      <SpectatorError 
        errorMessage='You Need To Enter A Game Room First'
      />
    );
  }
}

const mapStateToProps = (state) => ({
  gameRooms: state.gameRooms,
  gameRoomId: state.router.location.pathname.split('/')[2]
});

export default connect(mapStateToProps, null)(SpectatorRoom);