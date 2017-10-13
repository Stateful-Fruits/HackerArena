const updateTestSuite = (testStatus) => {
  return ({
    type: 'UPDATE_TESTSUITE',
    testStatus 
  })
};

export default updateTestSuite;