import React from 'react';
import { connect } from 'react-redux';

<<<<<<< HEAD
const CreateGameRoom = (props) => {
  return (
    <div>
      <button onClick={props.Submit}>Create Game Room</button>

    </div>
  )
}

=======
class CreateGameRoom extends React.Component {
  constructor (props) {
    super (props);
  }
  render () {
    let {Create} = this.props;
    return (
      <div>
        <button onClick={Create}>Create Game Room</button>
        
      </div>
    )
  }
}
//snapshot.key
>>>>>>> dev
const mapStateToProps = (state) => {
  return {

  }
}

<<<<<<< HEAD
=======
const mapDispatcherToProps = (dispatcher) => {
  return {

  }
}
>>>>>>> dev


export default connect(mapStateToProps)(CreateGameRoom);


// function writeUserData(userId, name, email, imageUrl) {
//   firebase.database().ref('users/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }