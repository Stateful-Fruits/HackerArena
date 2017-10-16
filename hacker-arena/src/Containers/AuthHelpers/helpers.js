import firebase from '../../Firebase/firebase';
import provider from '../../Firebase/oauth/oauth';
import facebookProvider from '../../Firebase/oauth/facebook';

import getUsernameFromEmail from '../../Util';

const auth = {};

auth.normalLogin = function(email, password, navigate) {
  firebase.auth().signInWithEmailAndPassword(email, password).then((val)=> {
      navigate('/') 
  })
  .catch(function(error) {
  console.log(error)
  })
};

auth.normalSignUp = function(email, password, navigate) {
  const db = firebase.database();
  firebase.auth().createUserWithEmailAndPassword(email, password).then((res,b)=> {
    const username = getUsernameFromEmail(res.email); 
    db.ref('users/'+username).set({
      id : res.uid,
      email: res.email,
      wins: 0,
      losses: 0
    });
    navigate('/');
  })
  .catch((err)=> {
    this.setState({errmsg: err.message})
  })
};

auth.googleAuth = function(navigate) {
  firebase.auth().signInWithPopup(provider)
  .then((data) => {
    navigate('/');
  });
};

auth.fbookAuth = function(navigate) {
  firebase.auth().signInWithPopup(facebookProvider)
  .then((data) => {
    console.log('data', data)
    console.log('current user', firebase.auth().currentUser);
    navigate('/');
  });
};

export default auth;