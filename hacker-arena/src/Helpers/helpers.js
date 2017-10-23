const helpers = {};

helpers.calculateResultsByPlayer = function(results) {
  console.log('results before calc', results);

  return results.reduce((resultsObj, result) => {
    let winners = result.winners;

    for (let roleName in winners) {
      let username = winners[roleName];

      resultsObj[username] = resultsObj[username] || {
        role: roleName,
        wins: 0
      };

      resultsObj[username].wins++
    }

    return resultsObj;
  }, {})
}

helpers.calculateMostTotalWins = function(winsObj) {
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

helpers.chooseRandomProblem = function(problems) {
  console.log('chooseRandomProblem running', problems)
  let keys = Object.keys(problems);
  console.log('keys', keys);
  let random = Math.floor(Math.random() * keys.length);
  console.log('random', random);
  console.log('problemID', keys[random])
  return keys[random];
}

helpers.filterProblemsByDifficulty = function(minDifficulty = 0, maxDifficulty = 8, problems) {
  console.log('arguments to filterPRoblemsby difficulty', arguments)
  let keys = Object.keys(problems);

  let filteredProblems = keys
  .filter(key => {
    let problem = problems[key];
    return (Number(problem.difficulty) >= minDifficulty && Number(problem.difficulty) <= maxDifficulty)
  })
  .reduce((problemObj, key) => {
    problemObj[key] = problems[key];
    return problemObj;
  }, {})

  console.log('problems after filter', filteredProblems)
  
  return filteredProblems;
}

helpers.getUsernameFromEmail = function(str) {
  const position = str.indexOf('@')
  return str.slice(0,position)
}

// Pair mode helpers

helpers._getTeam = function(room, username) {
  let teams = room.teams;
  
    if (teams) {
      return teams.find((team) => {
        return team.driver === username || team.navigator === username
      })
    }
  
    return null;
}

helpers._getTeamIndex = function(room, username) {
  let teams = room.teams;

  if (teams) {
    return teams.findIndex((team) => {
      return team.driver === username || team.navigator === username
    })
  }

  return null;
}

helpers.getRoleFromUsername = function(room, username) {
  let team = helpers._getTeam(room, username);

  if (team && team.driver === username) {
    return 'driver';
  } else if (team && team.navigator === username) {
    return 'navigator';
  }

  return null;
}

helpers.getPartnerName = function(room, username) {
  let team = helpers._getTeam(room, username);

  if (team && team.driver === username) {
    return team.navigator;
  } else if (team && team.navigator === username) {
    return team.driver;
  }

  return null;
}

helpers.getPartnerRole = function(room, username) {
  let team = helpers._getTeam(room, username);

  if (team && team.driver === username) {
    return 'navigator';
  } else if (team && team.navigator === username) {
    return 'driver';
  }

  return null;
}

export default helpers;