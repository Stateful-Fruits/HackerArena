import firebase from '../../Firebase/firebase';
import provider from '../../Firebase/oauth/oauth';
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

export default auth;