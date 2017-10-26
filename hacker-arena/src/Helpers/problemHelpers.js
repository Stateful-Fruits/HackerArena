const chooseRandomProblem = function(problems) {
  let keys = Object.keys(problems);
  let random = Math.floor(Math.random() * keys.length);

  return keys[random];
}

const filterProblemsByDifficulty = function(minDifficulty = 0, maxDifficulty = 8, problems) {
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
  
  return filteredProblems;
}

export {
  chooseRandomProblem,
  filterProblemsByDifficulty
}
