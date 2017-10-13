import React from 'react';
import { connect } from 'react-redux';

class UserProfile extends React.Component {
  render () {
    let props = this.props;
    return (
      <div>
        <div>username: {props.username}</div>
        <div>Won: {props.won}</div>
        <div>Lost: {props.lost}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    won: state.user.won,
    lost: state.user.lost
  }
};

// const mapDispatcherToProps = (dispatch) => {
//   return {
    
//   }
// }

export default connect(mapStateToProps)(UserProfile);