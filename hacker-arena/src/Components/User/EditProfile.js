import React from 'react';

import fire from '../../Firebase/firebase';

import { setUserAsAdmin } from '../../Helpers/authHelpers'

import '../../Styles/EditProfile.css'


class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoURL: props.currentUser.photoURL,
      photoFiles: [],
      uploadProgress: 0,
      showEdit: false,
      password: ''
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange =this.onChange.bind(this);

    this.onFileChange =this.onFileChange.bind(this);    
    this.onFileSubmit =this.onFileSubmit.bind(this);
    this.handleUpgradeToAdmin = this.handleUpgradeToAdmin.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    let photoURL = this.state.photoURL;
    fire.auth().currentUser.updateProfile({
      photoURL: photoURL
    })
    .then(() => this.props.navigate(this.props.pathname))
  }

  onFileChange(e) {
    this.setState({photoFiles: [].slice.call(e.target.files)});
  }

  onFileSubmit(e) {
    e.preventDefault();
    let file = this.state.photoFiles[0];
    let storageRef = fire.storage().ref('user-photos/' + file.name);
    const task = storageRef.put(file)
    // .then(ss => {
    //   console.log('ss.downloadURL', ss.downloadURL)
    //   fire.auth().currentUser.updateProfile({
    //     photoURL: ss.downloadURL
    //   })
    //   .then(() => this.props.navigate(this.props.pathname))
    // });

    task.on('state_changed', (snapshot) => {
      let percentage = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.setState({
        uploadProgress: percentage
      })
    })

    task.then(ss => {
      fire.auth().currentUser.updateProfile({
        photoURL: ss.downloadURL
      })
      .then(() => {
        this.props.navigate(this.props.pathname)        
        this.setState({
          uploadProgress: 0
        })
      })
    });
  }

  render() {
    return (
      <div className="edit-profile">
        <div className="dropDownEdits">
          <div className="photo-url-edit">
            Enter custom url to profile photo here:
            <input className="photo-url-input form-control" onChange={this.onChange}
              value = {this.state.photoURL}
              type= 'text'
              name= 'photoURL'
            />
            <button onClick={this.onSubmit}>Submit</button>
          </div>
          <div className="upload-photo">
            OR - upload you own photo!
            <br/>
            <input className="choose-file" type="file" id="input" name="photoFiles" files={this.state.photoFiles} onChange={this.onFileChange}/>
            <button className="submit-file" onClick={this.onFileSubmit}>Upload</button><br/>
            <div className="progress">
              <span className="progress-display">{this.state.uploadProgress}</span>
              <div className="upload-bar progress-bar progress-bar-striped progress-bar-success progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="70" id="uploader" style={{width: `${this.state.uploadProgress}%`}}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default EditProfile;  