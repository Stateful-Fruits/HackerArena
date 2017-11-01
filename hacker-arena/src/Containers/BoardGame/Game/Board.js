import React from 'react';
import Row from './Row';
import '../../../Styles/Board.css';
const Board = (props) => {
  return <div>
    <div>Board</div>
    <div className='board'>
      {props.board.map((row, i) => {
        if (i === props.board.length-1) {
          return <div key={i}><Row key={i} row={row} i={i} lastrow={true} whirlpools={props.whirlpools}/></div>;
        } else {
          return <div key={i}><Row key={i} row={row} i={i} lastrow={false} whirlpools={props.whirlpools}/></div>;
        }
      })}
    </div>
  </div>
}

export default Board;
