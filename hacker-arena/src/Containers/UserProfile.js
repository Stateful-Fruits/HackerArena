import React from 'react';
import { connect } from 'react-redux';
import updateUserProfile from '../Actions/updateUserProfile';
import fire from '../Firebase/firebase';
import getUsernameFromEmail from '../Util';
import EditProfile from '../Components/User/EditProfile.js';

class UserProfile extends React.Component {
  componentWillMount () {
    console.log('componentWillMountRunning')
    console.log('this.props.profile', this.props.profile)

    if (!this.props.profile.username) {
      const db = fire.database();
      let profileUsername = this.props.profileUsername;
      let clientUsername = fire.auth().currentUser.email.split('@')[0];

      console.log('profileusername', profileUsername)

      db.ref('users/'+ profileUsername).once('value').then(snapshot => {
        let user = snapshot.val();
        user.username = profileUsername;
        this.props.update(user)
      })
    }
  }

  render () {
    let profile = this.props.profile;
    let profileUsername = this.props.profileUsername;
    let clientUsername = fire.auth().currentUser.email.split('@')[0];
    console.log('this.props', this.props);

    return (
      <div>
        <div>
          <div>Username: {profile.username}</div><br/>
          <div>Wins: {profile.wins}</div><br/>
          <div>Losses: {profile.losses}</div>
        </div>
        
        {(profileUsername === clientUsername) ?
          <EditProfile /> :
          null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let profile = state.profile;
  let profileUsername = state.router.location.pathname.split('/')[2];
  return { profile, profileUsername };
};

const mapDispatcherToProps = (dispatch) => {
  return {
    update: (profile) => {
      dispatch(updateUserProfile(profile));
    }
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(UserProfile);