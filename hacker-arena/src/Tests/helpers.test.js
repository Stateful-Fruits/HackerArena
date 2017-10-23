import helpers from '../Helpers/helpers'

const {calculateResultsByPlayer, calculateMostTotalWins } = helpers;

let exampleResultsObj = {
  players: ['paabrown', '123', '222', '111'],
  winners: {
    driver: 'paabrown',
    navigator: '111'
  }
}

let exampleResultsObj2 = {
  players: ['paabrown', '123', '222', '111'],
  winners: {
    driver: '123',
    navigator: '222'
  }
}

let exampleResultsObj3 = {

}

let exampleResultsObj3 = {
  players: ['paabrown', '123', '222'],
  winners: {
    driver: 'paabrown',
    navigator: '111'
  }
}

let resultsArr = [exampleResultsObj, exampleResultsObj2, exampleResultsObj3];

describe('calculateResultsByPlayer', () => {
  
  test('handle pair results', () => {
    expect(calculateResultsByPlayer(resultsArr)).toEqual({
      paabrown: {
        role: 'driver',
        wins: 2
      },
      111: {
        role: 'navigator',
        wins: 2
      }
    })
  })

})