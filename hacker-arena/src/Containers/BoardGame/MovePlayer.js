import React from 'react';

class MovePlayer extends React.Component {
  render () {
    return <div>
      <button className='up but'>Up</button>
      <div>
        <button className='inline but'>Left</button>
        <button className='inline but'>Right</button>
      </div>
      <button className='down but'>Down</button>
    </div>
  }
}

export default MovePlayer;