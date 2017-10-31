import firebase from '../Firebase/firebase';
import provider from '../Firebase/oauth/oauth';
import facebookProvider from '../Firebase/oauth/facebook';

// ~~~~~~~~~~~ LOGIN/SIGNUP ~~~~~~~~~~ //

const normalLogin = function(email, password, navigate) {
  //checking if user is new to db just in case
  return firebase.auth().signInWithEmailAndPassword(email, password)
  .then((res)=> _checkIfUserIsNewAndHandleIfSo(res, navigate));
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
  let params = {
    uid
  };

  return _cloudHttpCall('checkIfUserIsAdmin', 'GET', null, params)
  .then(payload => payload.json())
  .then(payload => {
    console.log('userclaims stuff from check if admin', payload);  
    return payload
  })
  .catch(err => {
    console.log('err', err)
    return err;
  });
}

const setUserAsAdmin = function(uid, password) {
  let body = {
    uid,
    password
  }

  return _cloudHttpCall('setUserAsAdmin', 'POST', body, null)
  .then(payload => payload.json())
  .then(payload => {
    console.log('set as admin!!', payload);  
    return payload
  })
  .catch(err => {
    console.log('err', err)
    return err;
  });
}

const checkUserClaims = function(uid) {
  let params = {
    uid
  };

  return _cloudHttpCall('checkUserClaims', 'GET', null, params)
  .then(payload => payload.json())
  .then(payload => console.log('user claims', payload))
  .catch(err => {
    console.log('err', err)
    return err;
  })
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
      return _addNewUserToDb(uid, email)
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
    console.log('userData while checking if new', data.val());
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
  console.log('running addusernam,e to auth');
  let username = getUsernameFromEmail(email)

  let body = {
    uid,
    username
  };

  return _cloudHttpCall('addUsernameToAuth', 'POST', body)
  .then(payload => console.log('username added to auth!'))
  .catch(err => {
    console.log('err in add username to auth', err);
    return err;
  })
}

const _cloudHttpCall = function(fnName, method = 'GET', body, params) {
  console.log('about to call function', fnName)

  method = method.toUpperCase();

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("cache-control", "no-cache");
  
  const myInit = {
    method,
    headers: myHeaders,
    mode: 'cors',
    async: true,
    crossDomain: true,
  };

  if (method === 'POST' && body) {
    myInit.body = JSON.stringify(body);
  }

  let url = `https://us-central1-hacker-arena.cloudfunctions.net/${fnName}`

  if (params) {
    url = url + '?'
    for (const key in params) {
      url = url + `${key}=${params[key]}&` 
    }
    url = url.slice(0, -1);
  }
  console.log('url' + 'myinit', url, myInit);
  
  return fetch(url, myInit);
}

export {
  getUsernameFromEmail,
  normalLogin,
  normalSignUp,
  googleAuth,
  fbookAuth,
  checkIfUserIsAdminAsync,
  checkUserClaims,
  setUserAsAdmin
};
