import React from 'react';
import helper from '../Helpers/helper';
import {connect} from 'react-redux';
import fire from '../../../Firebase/firebase';

class Row extends React.Component {
  constructor (props) {
    super (props);
    this.handleMove = this.handleMove.bind(this);
  }
  handleMove (e) {
    e.preventDefault();
    let {room, user} = this.props;
    if (room.playerInfo[user] && room.playerInfo[user].canMove) {
      let userPos = room.playerInfo[user].position;
      let strBP = e.target.id.split(' ');
      let blockx = parseInt(strBP[0],10);
      let blocky = parseInt(strBP[1],10);
      let ydiff = blockx - userPos[0];
      let xdiff = blocky - userPos[1];
      let difference = Math.abs(xdiff) + Math.abs(ydiff);
      let direction;
      if (difference === 1) {
        if (ydiff === 1) {
          direction = 'Down';
        } else if (ydiff === -1) {
          direction = 'Up';
        } else if (xdiff === 1) {
          direction = 'Right';
        } else if (xdiff === -1) {
          direction = 'Left';
        }
        helper.movePlayer(direction, room, user);
      }
    }
  }
  render () {
    let props = this.props;
    return <div className='bdrow' key={props.i}>
      {
        props.row.map((block, i) => {
          let name = helper.setBlockPositionName(i, props);
          let current = props.i + ' ' + i;
          if (props.whirlpools.indexOf(current) !== -1) {
            name += ' whirlpool';
          }
          return <div id={props.i + ' ' + i} className={name} key={i} onClick={this.handleMove}>
            {block[0].slice(1).join(' ')}
          </div>
        })
      }
    </div>
  }
}

const mapStoP = (state) => {
  return {
    user: fire.auth().currentUser.email.split('@')[0],
    room: state.boardRooms ? state.boardRooms[state.router.location.pathname.split('/')[2]] : undefined
  }
}

export default connect(mapStoP)(Row);