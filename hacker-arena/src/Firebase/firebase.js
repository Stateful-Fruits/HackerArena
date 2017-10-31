import firebase from 'firebase'
// import provider from './oauth/oauth.js'
let config;

if (process.env.DEBUG === 'true') {
  config = {
    apiKey: "AIzaSyAaZT8MsBg65ro8atazwpd-AwpVdNmS5eo",
    authDomain: "hacker-arena-debug.firebaseapp.com",
    databaseURL: "https://hacker-arena-debug.firebaseio.com",
    projectId: "hacker-arena-debug",
    storageBucket: "hacker-arena-debug.appspot.com",
    messagingSenderId: "930192823367"
  };
} else {
  config = {
    apiKey: 'AIzaSyBh-fU3BoBvdgOvCjzDb8Gql86RlWwsfxU',
    authDomain: 'hacker-arena.firebaseapp.com',
    databaseURL: 'https://hacker-arena.firebaseio.com',
    projectId: 'hacker-arena',
    storageBucket: 'hacker-arena.appspot.com',
    messagingSenderId: '194372044318'
  };
}

const fire = firebase.initializeApp(config);

export default fire;