import React from 'react';

import fire from '../../Firebase/firebase';

import '../../Styles/EditProfile.css'

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoURL: fire.auth().currentUser.photoURL,
      photoFiles: [],
      uploadProgress: 0,
      showEdit: false
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange =this.onChange.bind(this);

    this.onFileChange =this.onFileChange.bind(this);    
    this.onFileSubmit =this.onFileSubmit.bind(this);
    this.handleEditPhoto = this.handleEditPhoto.bind(this);
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
    })
    .then(() => this.props.navigate(this.props.pathname))
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
    const task = storageRef.put(file)
    // .then(ss => {
    //   console.log('ss.downloadURL', ss.downloadURL)
    //   fire.auth().currentUser.updateProfile({
    //     photoURL: ss.downloadURL
    //   })
    //   .then(() => this.props.navigate(this.props.pathname))
    // });

    console.log('task', task)
    task.on('state_changed', (snapshot) => {
      let percentage = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      console.log('percentage', percentage);
      this.setState({
        uploadProgress: percentage
      })
    })

    task.then(ss => {
      console.log('ss.downloadURL', ss.downloadURL)
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

  handleEditPhoto(){
    if(this.state.showEdit){
      this.setState({showEdit: false});
    } else {
      this.setState({showEdit: true});
    }
  }

  render() {
    let currentUser = fire.auth().currentUser;
    return (
      <div className="edit-profile">
        <img className="profile-photo"
          src={currentUser.photoURL || 'https://static.pexels.com/photos/428339/pexels-photo-428339.jpeg'}
          alt='profile'
        >
        </img>
        <div> Description: Hey its me kfspfksdfk okfspadfksdpfoksdfpakpsdokfpsdofksapfk </div>
        <button onClick={this.handleEditPhoto} > Edit Profile Picture </button>
        {this.state.showEdit ?
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
        :
        null
        }
      </div>
    )
  }
}


export default EditProfile;  