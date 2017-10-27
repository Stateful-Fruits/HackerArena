import React from 'react';

const Row = (props) => { 
  return <div className='bdrow' key={props.i}>
    {
      props.row.map((block, i) => {
        if (!props.lastrow) {
          if (i === props.row.length-1) {
            if (props.i === 3) {
              console.log('going in whirlpool');
              return <div id={props.i + ' ' + i} className={'bdblock lastblock whirlpool'} key={i}>
                {block[0].slice(1).join(' ')}
              </div>
            } else {
              return <div id={props.i + ' ' + i} className={'bdblock lastblock water'} key={i}>
                {block[0].slice(1).join(' ')}
              </div>
            }
          } else {
            return <div id={props.i + ' ' + i} className={'bdblock water'} key={i}>
              {block[0].slice(1).join(' ')}
            </div>
          }
        } else {
          if (i === props.row.length-1) {
            return <div id={props.i + ' ' + i} className={'bdblock lastrowblock water'} key={i}>
              {block[0].slice(1).join(' ')}
            </div>
          } else {
            return <div id={props.i + ' ' + i} className={'bdblock lastrow water'} key={i}>
              {block[0].slice(1).join(' ')}
            </div>
          }
        }
      })
    }
  </div>
}

export default Row;