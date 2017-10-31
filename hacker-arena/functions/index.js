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
  console.log('addusername to auth running');
  cors(req, res, function() {
    console.log('req.body', req.body);
    let { uid, username } = req.body

    admin.auth().setCustomUserClaims(uid, {username: username})
    .then(() => {
      return admin.auth().getUser(uid)
        .then((userRecord) => {
          console.log('userrecord is now', userRecord);
          res.sendStatus(201);
        })
    })
    .catch(err => {
      console.log(err)
      res.status(404).send(err)
    });
  })
});

exports.checkUserClaims =  functions.https.onRequest((req, res) => {
  cors(req, res, function() {
    console.log('req.body', req.body);
    let { uid } = req.body

    admin.auth().getUser(uid)
    .then((userRecord) => {
      console.log('userrecord is currently', userRecord);
      res.status(200).send(userRecord);
    })
    .catch(err => {
      console.log('err:', err)
      res.status(404).send(err)
    });
  })
});

exports.setUserAsAdmin = functions.https.onRequest((req, res) => {
  cors(req, res, function() {
    console.log('req.body', req.body)
    const { password, uid } = req.body;

    if (password === functions.config().admin.password) {
      admin.auth().setCustomUserClaims(uid, {admin: true})
      .then(() => {
        console.log('set custom user claim for ', uid)
        res.status(201).send(JSON.stringify({ uid }));        
      })
      .catch(err => {
        console.log(err)
        res.status(404).send(err)
      })
    } else {
      res.status(404).send('wrong password!!')
    }
  })
});

exports.checkIfUserIsAdmin =  functions.https.onRequest((req, res) => {
  cors(req, res, function() {
    console.log('req.query.uid', req.query)
    admin.auth().getUser(req.query.uid).then((userRecord) => {
      console.log('userRecord.customClaims', userRecord.customClaims)
      const adminStatus = userRecord.customClaims.admin || false;
      const username = userRecord.customClaims.username;
      const payload = {
        adminStatus,
        username
      }

      console.log('payload about to be sent back from check if user is admin', payload)

      res.status(200).send(JSON.stringify(payload));
    })
    .catch(err => {
      console.log(err)
      res.status(404).send(err)
    })
  })
});