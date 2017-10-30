const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp(functions.config().firebase);

exports.addUsernameToAuth =  functions.https.onRequest((req, res) => {
  cors(req, res, function() {
    console.log('req.body', req.body);
    let { uid, username } = req.body

    admin.auth().setCustomUserClaims(uid, {username: username})
    .then((userRecord) => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log(err)
      res.status(404).send(err)
    });
  })
});

// exports.setUser = functions.https.onRequest((req, res) => {
//   admin.auth().setCustomUserClaims('', {admin: true}).then(() => console.log('set custom user claim'));
// });

exports.checkIfUserIsAdmin =  functions.https.onRequest((req, res) => {
  cors(req, res, function() {
    admin.auth().getUser(req.query.uid).then((userRecord) => {
      const adminStatus = userRecord.customClaims.admin;
      const payload = {
        adminStatus
      }
      console.log('payload', JSON.stringify(payload))
      res.status(200).send(JSON.stringify(payload));
    })
    .catch(err => {
      console.log(err)
      res.status(404).send(err)
    })
  })
});