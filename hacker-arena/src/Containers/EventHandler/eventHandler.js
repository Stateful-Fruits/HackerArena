import fire from '../Firebase/firebase';

let eventHandler = {};

// ---------------- Helpers ----------------
eventHandler.helpers = {};

eventHandler.helpers.incrementWins = function(username) {
  return fire.database().ref(`users/${username}`).once('value').then(snapshot => {
    let wins = snapshot.val().wins + 1;
    fire.database().ref(`users/${username}/wins`).set(wins);
  });
}

eventHandler.helpers.incrementLosses = function(username) {
  return fire.database().ref(`users/${username}`).once('value').then(snapshot => {
    let losses = snapshot.val().losses + 1;
    fire.database().ref(`users/${username}/losses`).set(losses);
  });
}

// ---------------- Events ----------------

eventHandler.winner = function(room, username, eventValue) {
  let winner = eventValue.winner;
  let isClientWinner = winner === username

  (() => {
    if (isClientWinner) {
      return window.swal({
        title: `You Win!`,
        width: 600,
        padding: 100,
        background: 'something different'
      })
    } else {
      return window.swal({
        title: `The Winner is ${this.props.currentRoom.winner}!`,
        width: 600,
        padding: 100,
        background: '#fff url(//bit.ly/1Nqn9HU)'
      })
    }
  })()
  .then(() => this.helpers.handleConfirmAlert(isClientWinner, room, username))
  
}


        if(currentRoom.players[username] !== "" && (currentRoom.winner !== username)){
          window.swal({
            title: `The Winner is ${this.props.currentRoom.winner}!`,
            width: 600,
            padding: 100,
            background: '#fff url(//bit.ly/1Nqn9HU)'
          })
          .then(this.handleConfirmAlert)
          
          fire.database().ref(`users/${username}`).once('value').then(snapshot => {
            let losses = snapshot.val().losses + 1;
            fire.database().ref(`users/${username}/losses`).set(losses);
          });
        } 
    

export default eventHandler;