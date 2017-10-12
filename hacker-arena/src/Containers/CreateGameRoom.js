import React from 'react';
import { connect } from 'react-redux';

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
const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatcherToProps = (dispatcher) => {
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