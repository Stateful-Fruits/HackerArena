import firebase from 'firebase'

const provider = new firebase.auth.GoogleAuthProvider();

provider.addScope('https://www.googleapis.com/auth/plus.login')
provider.addScope('profile')
provider.addScope('email')

export default provider

