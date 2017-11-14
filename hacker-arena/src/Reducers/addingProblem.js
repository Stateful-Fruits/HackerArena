let start = {
  description: '',
  difficulty: '',
  tests: [],
  tags: '',
  title: '',
  userFn: '',
  addingTest: 'Test.assertEquals( userFn(  ),  )'
}

const addingProblem = (state=start, action) => {
  let problem = Object.assign({},state);
  switch (action.type) {
    case 'ADD_PROBLEM':
      //console.log('update addProblem ', action)
      return action.payload;
    case 'UPDATE_ADD_PROBLEM_TESTS':
      problem.tests.push(action.payload);
      //console.log('updated tests ', problem, action.payload);
      return problem;
    case 'REMOVE_TEST_FROM_ADDING_PROBLEM':
      problem.tests = problem.tests.filter(test => test !== action.payload);
      return problem;
    case 'RESET_ADD_PROBLEM':
      return start;
    default:
      return state;
  }
}

export default addingProblem;