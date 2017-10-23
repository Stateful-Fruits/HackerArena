import React from 'react';
import $ from 'jquery';
import '../Styles/History.css';

const History = (props) => {  
  let games = Object.values(props.profile.history);
  
  return (
    <div>
      {/* {games.map(item => {
         return (
          {item[0].winner === props.profile.username ? <p>"WIN"</p> : <p>"LOSS"</p>}
          `<h3>${item[0].problem.title}</h3>`
          `<p>${item[0].problem.description}</p>`
          `<p>${item[0].problem.tags}</p>`
          `<p>${item[0].timeTaken}</p>`
          `<p>${item[0].timeStamp}</p>`)
      })} */}
      
    </div>
)};

export default History;