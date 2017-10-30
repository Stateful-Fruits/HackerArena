import firebase from '../Firebase/firebase';
import provider from '../Firebase/oauth/oauth';
import facebookProvider from '../Firebase/oauth/facebook';

// ~~~~~~~~~~~ LOGIN/SIGNUP ~~~~~~~~~~ //

const normalLogin = function(email, password, navigate) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
  .then((res) => navigate('/'));
};

const normalSignUp = function(email, password, navigate) {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((res)=> _checkIfUserIsNewAndHandleIfSo(res, navigate))
};

const googleAuth = function(navigate) {
  return firebase.auth().signInWithPopup(provider)
  .then((res) => _checkIfUserIsNewAndHandleIfSo(res, navigate));
}

const fbookAuth = function(navigate) {
  return firebase.auth().signInWithPopup(facebookProvider)
  .then((res)=> _checkIfUserIsNewAndHandleIfSo(res, navigate));
};

// ~~~~~~~~~~~ OTHER ~~~~~~~~~~ //

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
  });
}

const getUsernameFromEmail = function(str) {
  const position = str.indexOf('@');
  return str.slice(0, position);
}

// ~~~~~~~~~~~ INTERNAL HELPERS ~~~~~~~~~~ //

const _checkIfUserIsNewAndHandleIfSo = function(res, navigate) {
  const { uid, email} = res.user || res;
  console.log('res', res);
  
  return _checkIfUserIsNewAsync(uid, email)
  .then((isNew) => {
    if (isNew) {
      return _addUsernameToAuth(uid, email)
      .then(() => _addNewUserToDb(uid, email))
      .then(() => navigate('/'))
    } else {
      return navigate('/');
    }
  });
}

const _checkIfUserIsNewAsync = function(uid, email) {
  let username = getUsernameFromEmail(email);
  let db = firebase.database();

  return db.ref('users/' + username).once('value').then(data => {
    let user = data.val();
  
    console.log('isUserNew', !user);
    return !user;
  });
}

const _addNewUserToDb = function(uid, email) {
  let username = getUsernameFromEmail(email);
  let db = firebase.database();

  return db.ref('users/' + username).set({
    id : uid,
    email: email,
    username: username
  });
}

const _addUsernameToAuth = function(uid, email) {
  let username = getUsernameFromEmail(email)

  let body = {
    uid,
    username
  };

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("cache-control", "no-cache");
  
  const myInit = {
    method: 'POST',
    headers: myHeaders,
    mode: 'cors',
    async: true,
    crossDomain: true,
    body: JSON.stringify(body)
  };

  const url = `https://us-central1-hacker-arena.cloudfunctions.net/addUsernameToAuth`
  
  return fetch(url, myInit)
  .then(payload => console.log('username added to auth!'))
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
