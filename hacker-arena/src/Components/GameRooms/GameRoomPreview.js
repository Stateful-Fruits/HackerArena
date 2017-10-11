import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const GameRoomPreview = ({ dispatch, gameRoom }) => (
  <div>
    <h4>{ gameRoom.roomName }</h4>
    <span> This is a game room preview!!! </span>
    <button onClick={ () => dispatch(push('/About')) }>
      <h3>Join Game</h3>
    </button>
  </div>
);

export default connect()(GameRoomPreview);