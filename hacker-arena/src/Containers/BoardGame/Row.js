import React from 'react';

const Row = (props) => { 
  return <div className='bdrow' key={props.i}>
    {
      props.row.map((block, i) => {
        if (!props.lastrow) {
          if (i === props.row.length-1) {
            if (props.i === 3) {
            } else {
              return <div id={props.i + ' ' + i} className={'bdblock lastblock'} key={i}>
                {block[0].join(' ')}
              </div>
            }
          } else {
            return <div id={props.i + ' ' + i} className={'bdblock'} key={i}>
              {block[0].join(' ')}
            </div>
          }
        } else {
          if (i === props.row.length-1) {
            return <div id={props.i + ' ' + i} className={'bdblock lastrowblock'} key={i}>
              {block[0].join(' ')}
            </div>
          } else {
            return <div id={props.i + ' ' + i} className={'bdblock lastrow'} key={i}>
              {block[0].join(' ')}
            </div>
          }
        }
      })
    }
  </div>
}

export default Row;