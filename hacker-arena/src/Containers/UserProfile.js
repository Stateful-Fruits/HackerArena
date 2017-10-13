import React from 'react';
import { connect } from 'react-redux';
import updateUserProfile from '../Actions/updateUserProfile';

class UserProfile extends React.Component {
  render () {
    let props = this.props;
    let password = '', message = '';
    if (props.showPass) {
      password = props.password;
      message = 'Hide Password';
    } else {
      password = '*'.repeat(props.password.length);
      message = 'Show Password';
    }

    return (
      <div>
        <div>Username: {props.username}</div><br/>
        <div>Password: {password}</div>
        <button onClick={props.update}
          value='SHOW_PASS'>{message}</button><br/>
        <div>Won: {props.won}</div><br/>
        <div>Lost: {props.lost}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    password: state.user.password,
    showPass: state.user.showPass,
    won: state.user.won,
    lost: state.user.lost
  }
};

const mapDispatcherToProps = (dispatch) => {
  return {
    update: (e) => {
      e.preventDefault();
      dispatch(updateUserProfile());
    }
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(UserProfile);