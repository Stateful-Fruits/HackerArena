import firebase from '../../Firebase/firebase';
import provider from '../../Firebase/oauth/oauth';
import facebookProvider from '../../Firebase/oauth/facebook';

import helpers from '../../Helpers/helpers';

import syncToDb from '../../Firebase/syncToDb'

const auth = {};

auth.normalLogin = function(email, password, navigate) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
  .then(() => navigate('/'))
};

auth.normalSignUp = function(email, password, navigate) {
  const db = firebase.database();
  return firebase.auth().createUserWithEmailAndPassword(email, password).then((res,b)=> {
    const username = helpers.getUsernameFromEmail(res.email); 
    db.ref('users/'+username).set({
      id : res.uid,
      email: res.email,
      wins: 0,
      losses: 0
    });
    return navigate('/');
  })
};

auth.googleAuth = function(navigate) {
  return firebase.auth().signInWithPopup(provider)
  .then((data) => navigate('/'));
};

auth.fbookAuth = function(navigate) {
  return firebase.auth().signInWithPopup(facebookProvider)
  .then((data) => navigate('/'))
};

export default auth;