import fire from '../../Firebase/firebase';

let eventHandler = {};

// ---------------- Helpers ----------------
eventHandler.helpers = {};

eventHandler.helpers.calculateResultsByPlayer = function(results) {
  console.log('results before calc', results);
  return results.reduce((resultsObj, result) => {
    let winner = result.winner
    resultsObj[winner] = resultsObj[winner] || 0;
    resultsObj[winner]++;
    return resultsObj
  }, {})
}

eventHandler.helpers.calculateMostTotalWins = function(winsObj) {
  let biggest = {
    winner: '',
    wins: 0
  };

  for (let username in winsObj) {
    if (winsObj[username] > biggest.wins) {
      biggest.winner = username
      biggest.wins = winsObj[username];
    }
  }

  return biggest
}

eventHandler.helpers.handleConfirmAlert = function(isClientWinner, room, roomId, username) {
  fire.database().ref(`rooms/${roomId}`).once('value', snapshot => {
    let room = snapshot.val();
    console.log('handleConfirmAlert running. room is:', room)
    let resultsSoFar = room.results;
    console.log('this', this);
    let resultsByPlayer = this.calculateResultsByPlayer(resultsSoFar);
    console.log('resultsByPlayer', resultsByPlayer);
    let mostTotalWins = this.calculateMostTotalWins(resultsByPlayer);
    console.log('mostTotalWins', mostTotalWins);
  
    let isLastRound = parseInt(mostTotalWins.wins, 10) === parseInt(room.rounds, 10);
    console.log('room.currentRound, mostTotalWins.wins, room.rounds, isLastRound', room.currentRound, mostTotalWins.wins, room.rounds, isLastRound)  
  
    let numPlayers = Object.keys(room.players).length;
      
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
    
    return fire.database().ref(`rooms/${roomId}`).set(room);
  })
}

// ---------------- Events ----------------

eventHandler.winner = function(room, roomId, username, eventValue) {
  let resultsSoFar = room.results.slice();
  let resultsByPlayer = this.helpers.calculateResultsByPlayer(resultsSoFar);

  let winner = eventValue.winner;
  let timeTaken = eventValue.timeTaken.toFixed(2);
  let isClientWinner = winner === username
  let currentRound = room.currentRound

  let scoreMessage = ``;

  for (let player in resultsByPlayer) {
    let result = resultsByPlayer[player];
    scoreMessage = scoreMessage + `<div>${player}: ${result} wins \n</div>`
  }

  return (() => {
    if (isClientWinner) {
      return window.swal(
        `<div>Good job! Finished in ${timeTaken} seconds!</div>`,
        `<div>You are the winner of round ${currentRound} </div>
        <div>Best out of ${room.rounds} wins! </div>
        <div>Current score is:</div>
        ${scoreMessage}`,
        'success')
    } else {
      return window.swal({
        title: `The Winner of round ${currentRound} is ${winner}!`,
        html: `
          <div>Best out of ${room.rounds} wins!</div>
          <div>Current score is:</div>
          ${scoreMessage}
          `,
        width: 600,
        padding: 100,
        background: '#fff url(//bit.ly/1Nqn9HU)'
      })
    }
  })()
  .then(() => this.helpers.handleConfirmAlert(isClientWinner, room, roomId, username))
  
}   

export default eventHandler;