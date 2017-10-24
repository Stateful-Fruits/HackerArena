import React from 'react';
import HistoryEntry from './HistoryEntry';
import '../Styles/History.css';

const History = (props) => {  
  let games = Object.values(props.profile.history);
  return (
    <div className="history">
      {games.map((item,i) => {
         return <HistoryEntry game={item} profile={props.profile} key={i}/>
      })}
    </div>
)};

export default History;