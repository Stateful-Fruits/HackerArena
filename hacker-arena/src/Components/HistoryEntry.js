import React from 'react';
import '../Styles/HistoryEntry.css';

const HistoryEntry = (props) => {  
  let players = Object.keys(props.game[0].players)
  let { navigate } = props;
  let tagsArr = props.game[0].problem.tags.replace(/ /g, "").split(',');
  let winners = Object.values(props.game[0].winners);
  let losers = players.filter(items => {
    return winners.indexOf(items) === -1;
  }) 
  return (
    <div className="historyEntry card text-center" >
      <div className="card-header">
        {(Object.values(props.game[0].winners).filter(items=>{
          return items === (props.profile.username)
        }).length > 0 ) ? <h2 className="historyWin"><strong>WIN</strong></h2> : <h2 className="historyLoss"><strong>LOSS</strong></h2>}
        
      </div> 
      <div className="card-body">
      <span> <strong>Players</strong>: </span> 
      {winners.map(items => {
        return (
          <a href='' className="winnerLink userNameLinks" onClick={() => {navigate(`/User/${items}`) }}>{items} </a>
        )
      })}
      {losers.map(items => {
        return (
          <a href='' className="loserLink userNameLinks" onClick={() => {navigate(`/User/${items}`) }}>{items} </a>
        )
      })}
        <h3 className="card-title">{props.game[0].problem.title}</h3>
        <p className="card-text">{props.game[0].problem.description}</p>
        <p className="card-text"><strong>Tags</strong>: {tagsArr.map((items,i) => {
          return <span className="badge badge-primary" key={i}>{items}</span>
        }) }</p>
        <p className="card-text"><strong>Duration</strong> : {Math.floor(props.game[0].timeTaken)} seconds</p>
        <p className="card-text"><strong>Date</strong> : {(new Date(props.game[0].timeStamp)+"").slice(0,15)}</p>
      </div>
    </div>
)};

export default HistoryEntry;