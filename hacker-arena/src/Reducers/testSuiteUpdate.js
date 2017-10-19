const updateTestSuite = (testStatus = {}, action) => {
  switch(action.type) {
    case 'UPDATE_TESTSUITE':
    //console.log('state passed to reducer: ', testStatus);
      return action.testStatus;
    default:
      return testStatus;
  }
};

export default updateTestSuite;