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
  constructor(props){
    super(props)
    this.state = {
      showEdit: false
    }

    this.handleEditPhoto = this.handleEditPhoto.bind(this);
  }

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
  handleEditPhoto(){
    if(this.state.showEdit){
      this.setState({showEdit: false});
    } else {
      this.setState({showEdit: true});
    }
  }
  render () {
    let { profile, currentUser, profileUsername } = this.props;   
    let clientUsername = currentUser.username;
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
    return (
      <div style={{display: 'flex'}}>
        <div className="leftSideProfile">
          <div style={{display: 'flex'}}>
          <div className="userInfoDiv">
            <div className="ProfileInfo" style={{display: "flex"}}>
              <div className="profPic">
                <div className="profile-photo accProfPic"
                  style={{backgroundImage: `url(${currentUser.photoURL || 'https://static.pexels.com/photos/428339/pexels-photo-428339.jpeg'})`}}
                  alt='profile'
                >
                </div>
              </div>
              <div className="userInfo">
                <div><strong>Username</strong>: {profile.username}</div><br/>
                <div><strong>Wins</strong>: {wins}</div>
                <div><strong>Losses</strong>: {losses}</div>
                <div><strong>Contact</strong>: <div>{profile.email}</div></div>
                <button className="btn editPhotoBtn" onClick={this.handleEditPhoto} > Edit Profile Picture </button>
              </div>
            </div>

        {this.state.showEdit ?
              ((profileUsername === clientUsername) ?
              <EditProfile navigate={this.props.navigate} pathname={this.props.pathname} currentUser={currentUser}/>
              : null)
            :
            <div> <strong>Description</strong>: Hey its me Marky Z, I enjoy creating social media websites and long walks on the beach. </div>
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
  let currentUser = state.currentUser;
  console.log('currentUser in profile', currentUser);

  return { profile, profileUsername, pathname, currentUser };
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