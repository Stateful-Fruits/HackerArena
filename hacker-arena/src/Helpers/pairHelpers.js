const _getTeam = function(room, username) {
  let teams = room.teams;
  
    if (teams) {
      return teams.find((team) => {
        return team ? (team.driver === username || team.navigator === username) : null;
      })
    }
  
    return null;
}

const getTeamIndex = function(room, username) {
  let teams = room.teams;

  if (teams) {
    return teams.findIndex((team) => {
      return team ? (team.driver === username || team.navigator === username) : null;
    })
  }

  return null;
}

const getRoleFromUsername = function(room, username) {
  let team = _getTeam(room, username);

  if (team && team.driver === username) {
    return 'driver';
  } else if (team && team.navigator === username) {
    return 'navigator';
  }

  return null;
}

const getPartnerName = function(room, username) {
  let team = _getTeam(room, username);

  if (team && team.driver === username) {
    return team.navigator;
  } else if (team && team.navigator === username) {
    return team.driver;
  }

  return null;
}

const getPartnerRole = function(room, username) {
  let team = _getTeam(room, username);

  if (team && team.driver === username) {
    return 'navigator';
  } else if (team && team.navigator === username) {
    return 'driver';
  }

  return null;
}

export {
  getTeamIndex,
  getRoleFromUsername,
  getPartnerName,
  getPartnerRole
};