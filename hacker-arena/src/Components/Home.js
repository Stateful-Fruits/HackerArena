import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const Home = (props) => (
  <div>
    <button onClick={ () => props.dispatch(push('/About')) }><h1>About</h1></button>
    <h2>Welcome to Hacker Arena</h2>
  </div>
);

export default connect()(Home);