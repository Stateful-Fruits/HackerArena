import React, { Component } from 'react';

class WaitingForPlayer extends Component { 
  render() {
    let playerSpans = [];
    if (this.props.room) {
      let { room } = this.props;
      let { playerCapacity } = room;
      let players = room.players || {};
      let playerNames = Object.keys(players);
      for (let i = 0; i < playerCapacity; i++) {
        playerSpans.push(
          <li className='list-group-item' key={(playerNames[i] || "OPEN") + i}>
            <h4>
              Player {i} -> { playerNames[i] ? playerNames[i] : <span style={{color: 'darkgreen'}}>OPEN</span> }
            </h4>
          </li>);
      }
    }
    return (
      <div>
        <h3>Waiting For Players</h3>
        <ul style={{ margin: '10%', marginBottom: '5%', marginTop: '5%'}}>
          { this.props.room ? playerSpans : null}
        </ul>
        <i className="fa fa-circle-o-notch fa-spin" style={{fontSize: "300px", color: 'grey'}}></i>
      </div>
    );
  }
}

export default WaitingForPlayer;