import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const About = (props) => (
  <div>
    <button onClick={ () => props.dispatch(push('/')) }><h1>Home</h1></button>
    <h2>This is a game for coders to compete against each other!</h2>
  </div>
);

export default connect()(About);