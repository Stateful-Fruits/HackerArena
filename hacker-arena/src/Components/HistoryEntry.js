import React from 'react';
import '../Styles/HistoryEntry.css';

const HistoryEntry = (props) => {  
  let games  = props.games;
  return (
    <div className="historyEntry card text-center" >
      <div className="card-header">
        {props.game[0].winner === props.profile.username ? <h1 className="historyWin">WIN</h1> : <h1 className="historyLoss">LOSS</h1>}
        <p>Winner : {props.game[0].winner} </p>
      </div>
      <div className="card-body">
        <h3 className="card-title">{props.game[0].problem.title}</h3>
        <p className="card-text">{props.game[0].problem.description}</p>
        <p className="card-text">Tags : {props.game[0].problem.tags}</p>
        <p className="card-text">Duration : {Math.floor(props.game[0].timeTaken)} seconds</p>
        <p className="card-text">Date : {(new Date(props.game[0].timeStamp)+"")}</p>
      </div>
    </div>
)};

export default HistoryEntry;