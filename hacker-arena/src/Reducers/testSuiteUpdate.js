const updateTestSuite = (state = {testStatus : {}}, action) => {
  console.log('state passed to reducer: ', state);
  switch(action.type) {
    case 'UPDATE_TESTSUITE':
      return Object.assign({}, state, { testStatus: action.testStatus });
    default:
      return state;
  }
};

export default updateTestSuite;