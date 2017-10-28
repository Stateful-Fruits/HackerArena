import React from 'react';
import helper from '../Helper/helper';

const Row = (props) => { 
  return <div className='bdrow' key={props.i}>
    {
      props.row.map((block, i) => {
        let name = helper.setBlockPositionName(i, props);
        let current = props.i + ' ' + i;
        if (props.whirlpools.indexOf(current) !== -1) {
          name += ' whirlpool';
        }
        return <div id={props.i + ' ' + i} className={name} key={i}>
          {block[0].slice(1).join(' ')}
        </div>
      })
    }
  </div>
}

export default Row;