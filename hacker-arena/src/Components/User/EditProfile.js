import React from 'react';

import fire from '../../Firebase/firebase';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoURL: fire.auth().currentUser.photoURL
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange =this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    let photoURL = this.state.photoURL;
    console.log('photoURL', photoURL);
    fire.auth().currentUser.updateProfile({
      photoURL: photoURL
    });

  }

  render() {
    return (
      <div>
        <input onChange={this.onChange}
          value = {this.state.photoURL}
          type= 'text'
          name= 'photoURL'
          className = 'form-control'
        />
        <button onClick={this.onSubmit}>Submit</button>
      </div>
    )
  }
}


export default EditProfile;  