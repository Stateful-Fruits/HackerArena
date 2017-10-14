import React from 'react';

const ProgressBar = ({ room }) => {
  let progress = room.creatorTestPassed;
  let total = room.problem.tests.length;
  let percent = (progress/total) * 100;
  let challengerPercent = (room.challengerTestPassed/total) * 100;
  return (
    <div>
      <div>Challenger: {room.challengerName} | Passed: {room.challengerTestPassed}</div>
      <div className="progress">
        <div className="progress-bar" role="progressbar" aria-valuenow="70"
          aria-valuemin="0" aria-valuemax="100" style={{width: `${percent}%`}}>
          <span className="sr-only">bobo Complete</span>
        </div>
      </div>
      <div>Creator: {room.creatorName} | Passed: {room.creatorTestPassed}</div>
      <div className="progress">
        <div className="progress-bar" role="progressbar" aria-valuenow="70"
          aria-valuemin="0" aria-valuemax="100" style={{width: `${challengerPercent}%`}}>
          <span className="sr-only">bobo Complete</span>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar;