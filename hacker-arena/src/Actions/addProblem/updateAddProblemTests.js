const updateAddProblemTests = (test) => {
  return {
    type: 'UPDATE_ADD_PROBLEM_TESTS',
    payload: `Test.assertEquals(${test})`
  }
}

export default updateAddProblemTests;