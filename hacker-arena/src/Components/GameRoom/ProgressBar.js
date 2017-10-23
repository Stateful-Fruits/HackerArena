import React, { Component } from 'react';
import fire from '../../Firebase/firebase';

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.handleTargetChange = this.handleTargetChange.bind(this);
  }

  componentWillUpdate() {
    let { room } = this.props;
    let username = fire.auth().currentUser.email.split('@')[0];
    let isSpectator = !(Object.keys(room.players).includes(username));
    let otherUsers = Object.keys(room.players).filter(name => name !== username);
    // if there is no targeted player for this user
    console.log('Component should target a player now');
    if (!isSpectator && !room.players[username].targetedPlayer) {
      // set the first other player as targeted
      console.log('Logic running determining whether or not to target a player');
      if (otherUsers.length) fire.database().ref(`/rooms/${room.key}/players/${username}/targetedPlayer`).set(otherUsers[0]);
      else fire.database().ref(`/rooms/${room.key}/players/${username}/targetedPlayer`).set(undefined);
    } else if (!isSpectator && !otherUsers.includes(room.players[username].targetedPlayer)) {
      fire.database().ref(`/rooms/${room.key}/players/${username}/targetedPlayer`).set(undefined);
    }
  }

  handleTargetChange(otherUserName) {
    let { room } = this.props;
    let username = fire.auth().currentUser.email.split('@')[0];
    // firebase query to update this user's targetedPlayer obejct in firebase
    fire.database().ref(`/rooms/${room.key}/players/${username}/targetedPlayer`).set(otherUserName);
  }

  render() {
    let { room } = this.props;
    let username = fire.auth().currentUser.email.split('@')[0];
    let total = room.problem.tests.length;
    let eachPlayerTestProgress = {}
    let otherUsers = [];
    // see if this is being rendered by a player or spectator
    let isSpectator = !(Object.keys(room.players).includes(username));
    let targetedPlayer = this.props.room.players[username].targetedPlayer || undefined;
    for (let playerName in room.players) {
      if (playerName !== username) otherUsers.push(playerName);
      let playerProgress = room.players[playerName].testStatus ? room.players[playerName].testStatus.filter((items) => items.passed).length : 0;
      eachPlayerTestProgress[playerName] = (playerProgress / total) * 100;
    }
    return (
      <div> 
        <div>
        { 
          !isSpectator ? 
          <div style={{float:"left", margin: "10px"}}>
           <span className="usernameLabels">You: </span>
           <span className="usernames">{username}</span>
         </div> : null
        }
        { 
          otherUsers.map((otherUserName, i) => (
            <div style={{float:"right", margin: "10px"}} key={otherUserName+i}>
              <div style={(!isSpectator && targetedPlayer && targetedPlayer === otherUserName) ? { border: '20px solid red'} : {}}>
              <span className="opponentLabels">Player: </span>
              <span className="opponent" onClick={isSpectator ? null : () => this.handleTargetChange(otherUserName)}>{otherUserName}</span>
            </div>
          </div>
          ))
        }
          <div className="thebars">
        { 
          !isSpectator ?
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-success progress-bar-animated" role="progressbar" aria-valuenow="70"
              aria-valuemin="0" aria-valuemax="100" style={{width: `${eachPlayerTestProgress[username]}%`}}>
              <span className="sr-only">bobo Complete</span>
            </div>
          </div> : null
        }
        {
          otherUsers.map((otherUserName, i) => (
            <div className="progress" key={otherUserName+i}>
              <div className="progress-bar progress-bar-striped progress-bar-danger progress-bar-animated" role="progressbar" aria-valuenow="70"
                aria-valuemin="0" aria-valuemax="100" style={{width: `${eachPlayerTestProgress[otherUserName]}%`}}>
                <span className="sr-only">bobo Complete</span>
              </div>
            </div>
          ))
        }
          </div>
          </div>
      </div>
    )
  }
}

export default ProgressBar;