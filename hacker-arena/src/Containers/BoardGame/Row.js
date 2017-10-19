import React from 'react';

const Row = (props) => { 
  return <div className='bdrow' key={props.i}>
    {
      props.row.map((block, i) => {
        if (!props.lastrow) {
          if (i === props.row.length-1) {
            return <div id={props.i + ' ' + i} className={'bdblock lastblock'} key={i}>
              {block}
            </div>
          } else {
            return <div id={props.i + ' ' + i} className={'bdblock'} key={i}>
              {block}
            </div>
          }
        } else {
          if (i === props.row.length-1) {
            return <div id={props.i + ' ' + i} className={'bdblock lastrowblock'} key={i}>
              {block}
            </div>
          } else {
            return <div id={props.i + ' ' + i} className={'bdblock lastrow'} key={i}>
              {block}
            </div>
          }
        }
      })
    }
  </div>
}

export default Row;