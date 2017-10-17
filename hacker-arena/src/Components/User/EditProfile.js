import React from 'react';

import fire from '../../Firebase/firebase';

import '../../Styles/EditProfile.css'

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoURL: fire.auth().currentUser.photoURL,
      photoFiles: []
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange =this.onChange.bind(this);

    this.onFileChange =this.onFileChange.bind(this);    
    this.onFileSubmit =this.onFileSubmit.bind(this);
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

  onFileChange(e) {
    console.log('e.target.files[0]', e.target.files[0])
    console.log('e.target.slice', [].slice.call(e.target.files))
    console.log('e.target.slice[0]', [].slice.call(e.target.files)[0])
    console.log('e.name', e.target.name)
    this.setState({photoFiles: [].slice.call(e.target.files)});
  }

  onFileSubmit(e) {
    e.preventDefault();
    let file = this.state.photoFiles[0];
    console.log('typeof file', typeof file);
    console.log('file', file)
    let storageRef = fire.storage().ref('user-photos/' + file.name);
    storageRef.put(file)
    .then(ss => {
      console.log('ss.downloadURL', ss.downloadURL)
      fire.auth().currentUser.updateProfile({
        photoURL: ss.downloadURL
      });
    });
  }

  render() {
    return (
      <div className="edit-profile">
        <div className="photo-url-edit">
          Enter custom url to profile photo here:
          <input className="photo-url-input" onChange={this.onChange}
            value = {this.state.photoURL}
            type= 'text'
            name= 'photoURL'
            className = 'form-control'
          />
          <button onClick={this.onSubmit}>Submit</button>
        </div>
        <div className="upload-photo">
          OR - upload you own photo!
          <br/>
          <input className="choose-file" type="file" id="input" name="photoFiles" files={this.state.photoFiles} onChange={this.onFileChange}/>
          <button className="submit-file" onClick={this.onFileSubmit}>Upload</button>
        </div>
      </div>
    )
  }
}


export default EditProfile;  