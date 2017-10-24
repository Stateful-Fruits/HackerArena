import React from 'react';
import { connect } from 'react-redux';
import updateUserProfile from '../Actions/updateUserProfile';
import fire from '../Firebase/firebase';
import EditProfile from '../Components/User/EditProfile.js';
import ActivityHeatMap from '../Components/ActivityHeatMap';
import Stats from '../Components/Stats';
import History from '../Components/History';
import { push } from 'react-router-redux';
import '../Styles/UserProfile.css';

class UserProfile extends React.Component {
  componentWillMount () {
    console.log('componentWillMountRunning')
    console.log('this.props.profile', this.props.profile)

    if (!this.props.profile.username) {
      const db = fire.database();
      let profileUsername = this.props.profileUsername;

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
        <div className="leftSideProfile">
          <div style={{display: "flex"}}>
            <div className="ProfileInfo">
              <div>Username: {profile.username}</div><br/>
              <div>Wins: {profile.wins}</div><br/>
              <div>Losses: {profile.losses}</div>
            {
              (profileUsername === clientUsername) ?
              <EditProfile navigate={this.props.navigate} pathname={this.props.pathname}/> :
              null
            }
            </div>
          
            <div className="WinLossStats">
              {this.props.profile.wins ? <Stats profile={profile}/> : null}
            </div>
          </div>
          <div  className="ActivityHeatMap">
            {this.props.profile.history ? <ActivityHeatMap profile={profile}/> : null}
          </div>
        </div>
        {this.props.profile.history ? <History profile={profile}/> : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let profile = state.profile;
  let profileUsername = state.router.location.pathname.split('/')[2];
  let pathname = state.router.location.pathname;
  
  
  return { profile, profileUsername, pathname};
};

const mapDispatcherToProps = (dispatch) => {
  return {
    update: (profile) => {
      dispatch(updateUserProfile(profile));
    },
    navigate : (route) => dispatch(push(route)),    
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(UserProfile);