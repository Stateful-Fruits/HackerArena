let start = {
  description: '',
  difficulty: '',
  tests: [],
  title: '',
  userFn: '',
  addingTest: ''
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
    default:
      return state;
  }
}

export default addingProblem;