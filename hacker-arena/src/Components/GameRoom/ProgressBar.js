import React, { Component } from 'react';
import fire from '../../Firebase/firebase';

import { getPartnerName, getRoleFromUsername } from '../../Helpers/pairHelpers'

import '../../Styles/ProgressBar.css';

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.handleTargetChange = this.handleTargetChange.bind(this);
  }

  componentWillUpdate() {
    let { room, roomId, currentUser } = this.props;
    let username = currentUser.username;

    let isSpectator = !(Object.keys(room.players).includes(username));
    let partnerName = getPartnerName(room, username)

    let nameOfDisrupter = room.isPairRoom ? partnerName : username;  
    let targetedPlayer =  isSpectator ? null : room.players[nameOfDisrupter].targetedPlayer;

    let otherUsers = Object.keys(room.players).filter(name => {
        let role = getRoleFromUsername(room, name);
        
        return name !== username && role !== 'navigator' && name !== partnerName;
    });

    // if there is no targeted player for this user
    if (!isSpectator && !targetedPlayer) {
      // set the first other player as targeted
      if (otherUsers.length) fire.database().ref(`/rooms/${roomId}/players/${nameOfDisrupter}/targetedPlayer`).set(otherUsers[0]);
      else fire.database().ref(`/rooms/${roomId}/players/${nameOfDisrupter}/targetedPlayer`).set(null);
    } else if (!isSpectator && targetedPlayer && !otherUsers.includes(targetedPlayer)) {
      fire.database().ref(`/rooms/${roomId}/players/${nameOfDisrupter}/targetedPlayer`).set(null);
    }
  }

  handleTargetChange(otherUserName) {
    let { room, roomId, currentUser } = this.props;
    let username = currentUser.username;
    let partnerName = getPartnerName(room, username);

    // firebase query to update this user's targetedPlayer obejct in firebase
    fire.database().ref(`/rooms/${roomId}/players/${partnerName || username}/targetedPlayer`).set(otherUserName);
  }

  render() {
    let eachPlayerTestProgress = {}
    let otherUsers = [];

    let { room, currentUser } = this.props;
    let username = currentUser.username;

    let totalTests = room.problem.tests.length;
    
    let isSpectator = !(Object.keys(room.players).includes(username));
    let isPairRoom = room.isPairRoom;

    let partnerName = getPartnerName(room, username);
    let targetedPlayer = !isSpectator ? (this.props.room.players[partnerName || username].targetedPlayer || null) : null;
    for (let playerName in room.players) {
      let playerRole = getRoleFromUsername(room, playerName);
      // Don't display a bar as being an opponent bar if:
        // it is the user's bar
        // the bar is for a navigator (who therefore should not get one)
        // if the viewer is a navigator and it is their partner's bar
      if (playerName !== username && playerRole !== 'navigator' && playerName !== partnerName) {
        otherUsers.push(playerName);
      }
      let playerProgress = room.players[playerName].testStatus ? room.players[playerName].testStatus.filter((items) => items.passed).length : 0;
      eachPlayerTestProgress[playerName] = (playerProgress / totalTests) * 100;
    }

    let colors = this.props.colors;

    return (
      <div className="over-prog-container">
        { 
          !isSpectator ? 
          <div className="prog-container user-bar">
            <span className="usernameLabels">{isPairRoom ? 'Your partner:' : 'You'} </span>
            <span className="usernames">{partnerName || username}</span>
            <div className="thebars">
              <div className="progress">
                <div 
                  className="progress-bar progress-bar-striped progress-bar-success progress-bar-animated"
                  role="progressbar" aria-valuenow="70"
                  aria-valuemin="0"
                  aria-valuemax="100" 
                  style={{width: `${eachPlayerTestProgress[partnerName || username]}%`}}
                >
                  <span className="sr-only">bobo Complete</span>
                </div>
              </div>
            </div>
          </div> : null
        }
        <div className="opponent-bars">
        { 
          otherUsers.map((otherUserName, i) => (
            <div 
              className="prog-container opponent-bar"
              key={otherUserName+i}
              onClick={isSpectator ? null : () => this.handleTargetChange(otherUserName)}
            >
              <div style={(!isSpectator && targetedPlayer && targetedPlayer === otherUserName) ? { border: '1px solid rgba(255, 0, 0, 0.5)', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', borderRadius: '15px', marginRight: '5%'} : {}}>
                <span className="opponentLabels">Player: </span>
                <span className="opponent" style={colors ? {color: colors[i]} : {}}>{otherUserName}</span>
                <div className="thebars">
                  <div className="progress">
                    <div 
                      className="progress-bar progress-bar-striped progress-bar-danger progress-bar-animated" 
                      role="progressbar" 
                      aria-valuenow="70"
                      aria-valuemin="0" 
                      aria-valuemax="100" 
                      style={{width: `${eachPlayerTestProgress[otherUserName]}%`}}
                    >
                      <span className="sr-only">bobo Complete</span>
                    </div>
                  </div>  
                </div>
              </div>
            </div>
          ))
        }
        </div>
      </div>
    )
  }
}

export default ProgressBar;