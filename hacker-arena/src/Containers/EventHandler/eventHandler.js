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

eventHandler.helpers.calculateResultsByPlayer = function(results) {
  return results.reduce((resultsObj, result) => {
    let winner = result.winner
    resultsObj[winner] = resultsObj[winner] || 0;
    resultsObj[winner]++;
    return resultsObj[winner]
  }, {})
}

eventHandler.helpers.calculateMostTotalWins = function(winsObj) {
  let biggest = 0;
  for (let username in winsObj) {
    if (winsObj[username] > biggest) {
      biggest = winsObj[username];
    }
  }

  return biggest
}

eventHandler.helpers.handleConfirmAlert = function(isClientWinner, room, username) {
  console.log('handleConfirmAlert running. room is:', room)
  let resultsSoFar = room.results;
  let resultsByPlayer = this.helpers.calculateResultsByPlayer(results);
  let mostTotalWins = this.helpers.calculateMostTotalWins(resultsByPlayer);

  let isLastRound = mostTotalWins === room.rounds;
  console.log('room.currentRound, room.rounds, isLastRound', room.currentRound, room.rounds, isLastRound)  

  let numPlayers = Object.keys(room.players).length;
  
  let playerObj = room.players;
  
  room.playersReady = room.playersReady + 1 || 1;
  console.log('room.players after add', room.playersReady)
    
  if (room.playersReady === numPlayers && !isLastRound) {
    console.log('everyone is ready for next round! status to playing')
    room.currentRound = room.currentRound + 1;
    room.roomStatus = 'playing';
    room.playersReady = 0;
  } else if (room.playersReady < numPlayers) {
    console.log('everyone is NOT ready yet. status to intermission')
    room.roomStatus = 'intermission';
  } else if (isLastRound) {
    console.log('everyone is ready and it is the last round, set to completed')
    room.roomStatus = 'completed';
  }
  
  return room;
}

// ---------------- Events ----------------

eventHandler.winner = function(room, username, eventValue) {
  let winner = eventValue.winner;
  let isClientWinner = winner === username

  return (() => {
    if (isClientWinner) {
      this.helpers.incrementWins(username)

      return window.swal({
        title: `You Win!`,
        width: 600,
        padding: 100,
        background: '#fff url(//bit.ly/1Nqn9HU)'
      })
    } else {
      this.helpers.incrementLosses(username)

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

export default eventHandler;