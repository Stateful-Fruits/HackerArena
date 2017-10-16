import React from 'react';
import fire from '../../Firebase/firebase';

const ProgressBar = ({ room }) => {
  let total = room.problem.tests.length;
  let creatorProgress = room.creatorTestStatus.filter(items=>{
    return items.passed === true;
  }).length;

  let challengerProgress = room.challengerTestStatus.filter(items=>{
    return items.passed === true;
  }).length;

  //let progress = room.creatorTestPassed;
  // let total = room.problem.tests.length;
  let percent = (creatorProgress/total) * 100;
  let challengerPercent = (challengerProgress/total) * 100;

  return (
    <div> 
      {fire.auth().currentUser.email.split('@')[0] === room.creatorName ?
       (<div>
       <div>
         <span className="usernameLabels">Creator: </span>
         <span className="usernames">{room.creatorName}</span> | Passed: {room.creatorTestPassed}
       </div>
        <div className="progress">
          <div className="progress-bar progress-bar-striped progress-bar-success progress-bar-animated" role="progressbar" aria-valuenow="70"
            aria-valuemin="0" aria-valuemax="100" style={{width: `${percent}%`}}>
            <span className="sr-only">bobo Complete</span>
          </div>
        </div>
        <div>
         <span className="opponentLabels">Challenger: </span>
         <span className="opponent">{room.challengerName}</span> | Passed: {room.challengerTestPassed}
       </div>
        <div className="progress">
          <div className="progress-bar progress-bar-striped progress-bar-danger progress-bar-animated" role="progressbar" aria-valuenow="70"
            aria-valuemin="0" aria-valuemax="100" style={{width: `${challengerPercent}%`}}>
            <span className="sr-only">bobo Complete</span>
          </div>
        </div>
        </div>)
      :
      (<div>
        <div>
         <span className="usernameLabels">Challenger: </span>
         <span className="usernames">{room.challengerName}</span> | Passed: {room.challengerTestPassed}
       </div>
        <div className="progress">
          <div className="progress-bar progress-bar-striped progress-bar-success progress-bar-animated" role="progressbar" aria-valuenow="70"
            aria-valuemin="0" aria-valuemax="100" style={{width: `${challengerPercent}%`}}>
            <span className="sr-only">bobo Complete</span>
          </div>
        </div>
        <div>
         <span className="opponentLabels">Creator: </span>
         <span className="opponent">{room.creatorName}</span> | Passed: {room.creatorTestPassed}
       </div>
        <div className="progress">
          <div className="progress-bar progress-bar-striped progress-bar-danger progress-bar-animated" role="progressbar" aria-valuenow="70"
            aria-valuemin="0" aria-valuemax="100" style={{width: `${percent}%`}}>
            <span className="sr-only">bobo Complete</span>
          </div>
        </div>
        </div>)
      }
    </div>
  )
}

export default ProgressBar;