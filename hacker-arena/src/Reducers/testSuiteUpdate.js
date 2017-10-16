const updateTestSuite = (testStatus = {}, action) => {
  console.log('state passed to reducer: ', testStatus);
  switch(action.type) {
    case 'UPDATE_TESTSUITE':
      return action.testStatus;
    default:
      return testStatus;
  }
};

export default updateTestSuite;