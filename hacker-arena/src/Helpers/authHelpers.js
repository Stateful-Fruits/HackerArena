import firebase from '../Firebase/firebase';
import provider from '../Firebase/oauth/oauth';
import facebookProvider from '../Firebase/oauth/facebook';

const getUsernameFromEmail = function(str) {
  const position = str.indexOf('@')
  return str.slice(0,position)
}

const normalLogin = function(email, password, navigate) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
  .then(() => navigate('/'))
};

const normalSignUp = function(email, password, navigate) {
  const db = firebase.database();
  return firebase.auth().createUserWithEmailAndPassword(email, password).then((res,b)=> {
    const username = getUsernameFromEmail(res.email); 
    db.ref('users/'+username).set({
      id : res.uid,
      email: res.email,
      wins: 0,
      losses: 0
    });
    return navigate('/');
  })
};

const googleAuth = function(navigate) {
  return firebase.auth().signInWithPopup(provider)
  .then((data) => navigate('/'));
};

const fbookAuth = function(navigate) {
  return firebase.auth().signInWithPopup(facebookProvider)
  .then((data) => navigate('/'))
};

const checkIfUserIsAdminAsync = function(uid) {  
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("cache-control", "no-cache");
  
  const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    async: true,
    crossDomain: true
  };

  const url = `https://us-central1-hacker-arena.cloudfunctions.net/checkIfUserIsAdmin?uid=${uid}`
  
  return fetch(url, myInit)
  .then(payload => payload.json())
  .then(payload => payload.adminStatus)
  .catch(err => {
    console.log('err', err)
    return err;
  })
}

export {
  getUsernameFromEmail,
  normalLogin,
  normalSignUp,
  googleAuth,
  fbookAuth,
  checkIfUserIsAdminAsync
};
