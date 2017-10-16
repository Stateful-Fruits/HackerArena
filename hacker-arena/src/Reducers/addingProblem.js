let start = {
  description: '',
  difficulty: '',
  tests: [],
  title: '',
  userFn: '',
  addingTest: 'Test.assertEquals( userFn(  ),  )'
}
// {
//   title: '',
//   problemDescription: '',
//   difficulty: '',
//   fxnName: '',
//   allTests: [],
//   oneTest: ''
// };

const addingProblem = (state=start, action) => {
  switch (action.type) {
    case 'ADD_PROBLEM':
      console.log('update addProblem ', action)
      return action.payload;
    case 'UPDATE_ADD_PROBLEM_TESTS':
      console.log('updated tests ', action);
      let problem = Object.assign({},state);
      problem.tests.push(action.payload);
      return problem;
    default:
      return state;
  }
}

export default addingProblem;