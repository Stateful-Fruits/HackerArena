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

    if (!this.props.profile.username) {
      const db = fire.database();
      let profileUsername = this.props.profileUsername;

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
    let wins = 0;
    let losses = 0;

    if(profile.history){
      wins = Object.values(this.props.profile.history).filter(game => {
        return (Object.values(game[0].winners).indexOf(this.props.profile.username) > -1);
      }).length;
      losses = Object.values(this.props.profile.history).filter(game => {
        return (Object.values(game[0].winners).indexOf(this.props.profile.username) === -1);
      }).length;
    }
    let currentUser = fire.auth().currentUser;
    return (
      <div>
        <div className="leftSideProfile">
          <div style={{display: 'flex'}}>
          <div style={{width: '30vw'}}>
            <div className="ProfileInfo" style={{display: "flex"}}>
              <div className="profPic">
                <img className="profile-photo  accProfPic"
                  src={currentUser.photoURL || 'https://static.pexels.com/photos/428339/pexels-photo-428339.jpeg'}
                  alt='profile'
                >
                </img>
              </div>
              <div className="userInfo">
                <div><strong>Username</strong>: {profile.username}</div><br/>
                <div><strong>Wins</strong>: {wins}</div>
                <div><strong>Losses</strong>: {losses}</div>
                <div><strong>Contact</strong>: myEmail@gmail.com</div>
              </div>
            </div>
              <div> <strong>Description</strong>: Hey its me kfspfksdfk okfspadfksdpfoksdfpakpsdokfpsdofksapfk </div>
            {
              (profileUsername === clientUsername) ?
              <EditProfile navigate={this.props.navigate} pathname={this.props.pathname}/> :
              null
            }
            </div>
          
            <div className="WinLossStats">
              {this.props.profile.history ? <Stats profile={profile}/> : null}
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