import fire from '../../Firebase/firebase';
import { filterProblemsByDifficulty, chooseRandomProblem } from '../../Helpers/problemHelpers';
import { calculateResultsByPlayer, calculateMostTotalWins } from '../../Helpers/resultsHelpers'

let eventHandler = {};

eventHandler.helpers = {};

// ---------------- Helpers ----------------

eventHandler.helpers.handleConfirmAlert = function(isClientWinner, roomName, roomId, username, problems) {
  fire.database().ref(`rooms/${roomId}`).once('value', snapshot => {
    // this now only runs if it is NOT the last round
    let room = snapshot.val()
        
    let numPlayers = Object.keys(room.players).length;
    
    room.playersReady = room.playersReady + 1 || 1;
    
    if (room.playersReady === numPlayers) {
      console.log('everyone is ready for next round!')
      room.currentRound = room.currentRound + 1;
      room.roomStatus = 'playing';
      room.playersReady = 0;

      // new problem
      let filteredProblems = filterProblemsByDifficulty(room.minDifficulty, room.maxDifficulty, problems);
      console.log('filteredProblems in eventhandler', filteredProblems)
      room.problemID = chooseRandomProblem(filteredProblems);
      room.problem = problems[room.problemID]

      room.activity = [];

      // reset each player
      for (let username in room.players) {
        let player = room.players[username];
        player.disruptions = [''];
        player.testStatus = ['']
        player.credits = room.startingCredits;
      }

    } else if (room.playersReady < numPlayers) {
      console.log('everyone is NOT ready yet.');

      room.roomStatus = 'intermission';
    }
    
    return fire.database().ref(`rooms/${roomId}`).set(room);
  })
}


// ---------------- Events ----------------

eventHandler.winner = function(room, roomId, username, eventValue, problems) {
  let resultsSoFar = room.results.slice();
  let resultsByPlayer = calculateResultsByPlayer(resultsSoFar);
  let mostTotalWins = calculateMostTotalWins(resultsByPlayer);
  let isLastRound = parseInt(mostTotalWins.wins, 10) === parseInt(room.rounds, 10);
  let isPairRoom = room.isPairRoom

  if (isLastRound) {
    fire.database().ref(`users/${username}/history/${roomId}`).set(resultsSoFar);
    fire.database().ref(`rooms/${roomId}/roomStatus`).set('completed');
  }

  let winners = eventValue.winners;
  let timeTaken = eventValue.timeTaken.toFixed(2);
  let isClientWinner = winners.driver === username || winners.navigator === username || winners.hacker === username;
  let currentRound = room.currentRound;

  let scoreMessage = ``;

  for (let player in resultsByPlayer) {
    let result = resultsByPlayer[player];
    scoreMessage = scoreMessage + `<div>${player}: ${result.wins} wins \n</div>`;
  }

  let loserMessage;
  let winnerMessage;

  if (isPairRoom) {
    loserMessage = `The winners of round ${currentRound} are ${winners.driver} and ${winners.navigator}!`
    winnerMessage = `You are the winners of round ${currentRound}!`
  } else {
    loserMessage = `The winner of round ${currentRound} is ${winners.hacker}!`
    winnerMessage = `You are the winner of round ${currentRound}!`
  }
  
  return (() => {
    if (isClientWinner) {
      return window.swal(
        `<div>Good job! Finished in ${timeTaken} seconds!</div>`,
        `<div>${winnerMessage}</div>
        <div>Best out of ${room.rounds} wins! </div>
        <div>Current score is:</div>
        ${scoreMessage}`,
        'success')
    } else {
      return window.swal({
        title: loserMessage,
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
  .then(() => {
    !isLastRound ? this.helpers.handleConfirmAlert(isClientWinner, room, roomId, username, problems) : null
  })
}

export default eventHandler;