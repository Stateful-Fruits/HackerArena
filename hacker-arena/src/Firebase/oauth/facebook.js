import firebase from 'firebase'

const facebookProvider = new firebase.auth.FacebookAuthProvider();

const scopes = [
  'public_profile',
  'user_likes',
]

scopes.forEach(scope => facebookProvider.addScope(scope));

export default facebookProvider

