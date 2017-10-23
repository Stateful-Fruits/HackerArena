import helpers from '../Helpers/helpers'

const { prepResultsObjectFromWinner, calculateResultsByPlayer, calculateMostTotalWins,  } = helpers;

describe('prepResultsObjectFromWinner', () => {
  console.log('prepResults is running')
  let username = 'paabrown';
  
  let players = {
    paabrown: true,
    123: true,
    111: true,
    222: true,
  };

  let teams = [
    {
      driver: 'paabrown',
      navigator: '111'
    }, {
      driver: '123',
      navigator: '222'
    }
  ]

  let problem = {}

  let timeTaken = {}

  let timeStamp = 'today'

  test('handle pair results', () => {
    expect(prepResultsObjectFromWinner(username, players, teams, problem, timeTaken, timeStamp)).toEqual({
      players: {
        paabrown: 'driver',
        111: 'navigator',
        123: 'driver',
        222: 'navigator'
      },
      winners: {
        driver: 'paabrown',
        navigator: '111'
      },
      problem: {},
      timeTaken: {},
      timeStamp: 'today'
    })
  })

  let noTeams = undefined;

  test('handle nonpair results', () => {
    expect(prepResultsObjectFromWinner(username, players, noTeams, problem, timeTaken, timeStamp)).toEqual({
      players: {
        paabrown: 'hacker',
        111: 'hacker',
        123: 'hacker',
        222: 'hacker'
      },
      winners: {
        hacker: 'paabrown',
      },
      problem: {},
      timeTaken: {},
      timeStamp: 'today'
    })
  })
});

describe('calculateResultsByPlayer', () => {
  // Pair Tests

  let exampleResultsObjPair = {
    players: {
      paabrown: 'driver',
      111: 'navigator',
      123: 'driver',
      222: 'navigator'
    },
    winners: {
      driver: 'paabrown',
      navigator: '111'
    }
  }

  let exampleResultsObjPair2 = {
    players: {
      paabrown: 'driver',
      111: 'navigator',
      123: 'driver',
      222: 'navigator'
    },
    winners: {
      driver: '123',
      navigator: '222'
    },
  }

  let exampleResultsObjPair3 = {
    players: {
      paabrown: 'driver',
      111: 'navigator',
      123: 'driver',
      222: 'navigator'
    },
    winners: {
      driver: 'paabrown',
      navigator: '111'
    }
  }

  let resultsArrPair = [exampleResultsObjPair, exampleResultsObjPair2, exampleResultsObjPair3];

  // Non-pair tests

  let exampleResultsObj1 = {
    players: {
      paabrown: 'hacker',
      111: 'hacker',
      123: 'hacker',
      222: 'hacker'
    },
    winners: {
      hacker: 'paabrown',
    }
  }

  let exampleResultsObj2 = {
    players: {
      paabrown: 'hacker',
      111: 'hacker',
      123: 'hacker',
      222: 'hacker'
    },
    winners: {
      hacker: '222'
    }
  }

  let exampleResultsObj3 = {
    players: {
      paabrown: 'hacker',
      111: 'hacker',
      123: 'hacker',
      222: 'hacker'
    },
    winners: {
      hacker: '111'
    }
  }

  let exampleResultsObj4 = {
    players: {
      paabrown: 'hacker',
      111: 'hacker',
      123: 'hacker',
      222: 'hacker'
    },
    winners: {
      hacker: 'paabrown'
    }
  }

  let resultsArr = [exampleResultsObj1, exampleResultsObj2, exampleResultsObj3, exampleResultsObj4];  

  test('handle pair results', () => {
    expect(calculateResultsByPlayer(resultsArrPair)).toEqual({
      "111": {"role": "navigator", "wins": 2},
      "123": {"role": "driver", "wins": 1},
      "222": {"role": "navigator", "wins": 1},
      "paabrown": {"role": "driver", "wins": 2}
    });
  });

  test('handle non-pair results', () => {
    expect(calculateResultsByPlayer(resultsArr)).toEqual({
      "111": {"role": "hacker", "wins": 1},
      "123": {"role": "hacker", "wins": 0},
      "222": {"role": "hacker", "wins": 1},
      "paabrown": {"role": "hacker", "wins": 2}
    });
  });
})

describe('calculateMostTotalWins', () => {
  let resultsObjPair = {
    "111": {"role": "navigator", "wins": 2},
    "123": {"role": "driver", "wins": 1},
    "222": {"role": "navigator", "wins": 1},
    "paabrown": {"role": "driver", "wins": 2}
  }

  let resultsObj = {
    "111": {"role": "hacker", "wins": 1},
    "123": {"role": "hacker", "wins": 0},
    "222": {"role": "hacker", "wins": 1},
    "paabrown": {"role": "hacker", "wins": 2}
  }

  test('handle pair results', () => {
    expect(calculateMostTotalWins(resultsObjPair)).toEqual({
      winners: {
        driver: 'paabrown',
        navigator: '111'
      },
      wins: 2
    });
  });

  test('handle non-pair results', () => {
    expect(calculateMostTotalWins(resultsObj)).toEqual({
    winners: {
      hacker: 'paabrown'
    },
    wins: 2
    });
  });

})
