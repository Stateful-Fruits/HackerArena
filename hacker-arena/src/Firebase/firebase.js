import firebase from 'firebase'
import provider from './oauth/oauth.js'

const config = {
    apiKey: 'AIzaSyBh-fU3BoBvdgOvCjzDb8Gql86RlWwsfxU',
    authDomain: 'hacker-arena.firebaseapp.com',
    databaseURL: 'https://hacker-arena.firebaseio.com',
    projectId: 'hacker-arena',
    storageBucket: 'hacker-arena.appspot.com',
    messagingSenderId: '194372044318'
};

const fire = firebase.initializeApp(config);

export default fire;