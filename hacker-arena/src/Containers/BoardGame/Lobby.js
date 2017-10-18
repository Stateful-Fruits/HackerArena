import React from 'react';
import fire from '../../Firebase/firebase';

class Lobby extends React.Component {
  componentDidMount() {
    // fire.database().ref('BoardRooms').push({
    //   test: `holder`
    // });
  }
  render () {
    return (
      <div>
        <div>Code Run</div>
        <div>Games</div>
        
      </div>
    )
  }
}

export default Lobby;