import React from 'react';
import fire from '../../Firebase/firebase';

const ProgressBar = ({ room }) => {
  let username = fire.auth().currentUser.email.split('@')[0];
  let total = room.problem.tests.length;
  let eachPlayerTestProgress = {}
  let otherUsers = [];
  for (let playerName in room.players) {
    if (playerName !== username) otherUsers.push(playerName);
    let playerProgress = room.players[playerName].testStatus ? room.players[playerName].testStatus.filter((items) => items.passed).length : 0;
    eachPlayerTestProgress[playerName] = (playerProgress / total) * 100;
  }
  return (
    <div> 
      <div>
        <div style={{float:"left", margin: "10px"}}>
         <span className="usernameLabels">You: </span>
         <span className="usernames">{username}</span>
       </div>

      {
        otherUsers.map((otherUserName) => (
          <div style={{float:"right", margin: "10px"}}>
            <div>
            <span className="opponentLabels">Opponent: </span>
            <span className="opponent">{otherUserName}</span>
          </div>
        </div>
        ))
      }
        <div className="thebars">
        <div className="progress">
          <div className="progress-bar progress-bar-striped progress-bar-success progress-bar-animated" role="progressbar" aria-valuenow="70"
            aria-valuemin="0" aria-valuemax="100" style={{width: `${eachPlayerTestProgress[username]}%`}}>
            <span className="sr-only">bobo Complete</span>
          </div>
        </div>
        {
          otherUsers.map((otherUserName) => (
            <div className="progress">
              <div className="progress-bar progress-bar-striped progress-bar-danger progress-bar-animated" role="progressbar" aria-valuenow="70"
                aria-valuemin="0" aria-valuemax="100" style={{width: `${eachPlayerTestProgress[otherUserName]}%`}}>
                <span className="sr-only">bobo Complete</span>
              </div>
            </div>
          ))
        }
        </div>
        </div>)
    </div>
  )
}

export default ProgressBar;