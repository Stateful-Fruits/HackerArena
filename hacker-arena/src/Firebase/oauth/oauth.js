import firebase from 'firebase'

const provider = new firebase.auth.GoogleAuthProvider();

const scopes = [
  'https://www.googleapis.com/auth/plus.login',
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/classroom.courses',
  'https://www.googleapis.com/auth/userinfo.profile'
]

scopes.forEach(scope => provider.addScope(scope));

export default provider

