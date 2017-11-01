import { getRoleFromUsername, getPartnerName, getPartnerRole } from './pairHelpers.js'

const prepResultsObjectFromWinner = function(username, players, teams = [], problem, timeTaken, timeStamp) {
  // send win event (in room.players), update results object (in room), and increment user's wins (in database)
  let room = {}
  room.teams = teams || {};

  let playersByRole = Object.keys(players).reduce((playerObj, playerName) => {
    playerObj[playerName] = getRoleFromUsername(room, playerName) || 'hacker';
    return playerObj;
  }, {});


  let roleName = getRoleFromUsername(room, username) || 'hacker';
  let partnerName = getPartnerName(room, username);
  let partnerRole = getPartnerRole(room, username);
  
  let resultForThisRound = {
    players: playersByRole,
    winners: {
      [roleName]: username,
    },
    problem: problem,
    timeTaken: timeTaken,
    timeStamp: timeStamp
  }

  if (partnerName) {
    resultForThisRound.winners[partnerRole] = partnerName;
  }

  return resultForThisRound;
}

const calculateResultsByPlayer = function(results) {
  let baseObj = {}
  let playersObj = results[0].players
  

  for (let playerName in playersObj) {
    baseObj[playerName] = {
      role: playersObj[playerName],
      wins: 0
    }
  }
  

  return results.reduce((resultsObj, result) => {
    let winners = result.winners;

    for (let roleName in winners) {
      let username = winners[roleName];
      resultsObj[username].wins++
    }

    return resultsObj;
  }, baseObj)
}

const calculateMostTotalWins = function(winsObj) {
  let biggest = {
    winners: {},
    wins: 0
  };

  for (let username in winsObj) {
    let userObj = winsObj[username];
    if (userObj.wins > biggest.wins) {
      biggest.winners = {
        [userObj.role]: username
      }
      biggest.wins = userObj.wins;
    } else if (userObj.wins === biggest.wins) {
      biggest.winners[userObj.role] = username;
    }
  }

  return biggest
}

export {
  prepResultsObjectFromWinner,
  calculateResultsByPlayer,
  calculateMostTotalWins
}