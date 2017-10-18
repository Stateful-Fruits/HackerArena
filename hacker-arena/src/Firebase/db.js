import fire from './firebase.js';
import populateDB from './dbFiller/populateDb.js';

const db = {};

db.Users = fire.database().ref('users');
db.Problems = fire.database().ref('problems');
db.Rooms = fire.database().ref('rooms');
db.populateDB = populateDB;

export default db;
