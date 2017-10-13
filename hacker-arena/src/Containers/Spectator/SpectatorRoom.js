import React, { Component } from 'react';
import { connect } from 'react-redux';

import SpectatorEditors from '../../Components/Spectator/SpectatorEditors';
import SpectatorChat from '../../Components/Spectator/SpectatorChat';

class SpectatorRoom extends Component {
  componentWillMount() {
    // connect to the gameroom in the database here
  }

  render() {
    return (
      <div>
        {/* 
          - need to get the game room information from mapStateToProps
          - create a view for the problem prompt
          - create a view for each player's editor and allow the 
          spectator to run that players code in the editor's console
          - have a chat for the spectators
        */}
        <h1>Spectate a game here!!!</h1>
        <SpectatorEditors 
          gameRoom={ this.props.gameRooms[this.props.gameRoomId] }
        />
        <SpectatorChat />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameRooms: state.gameRooms,
  gameRoomId: state.router.location.pathname.split('/')[2]
});

export default connect(mapStateToProps, null)(SpectatorRoom);