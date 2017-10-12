import React from 'react';
import { connect } from 'react-redux';

const CreateGameRoom = (props) => {
  return (
    <div>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {

  }
}



export default connect(mapStateToProps)(CreateGameRoom);


// function writeUserData(userId, name, email, imageUrl) {
//   firebase.database().ref('users/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }