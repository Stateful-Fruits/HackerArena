const removeTest = (test) => {
  return {
    type: 'REMOVE_TEST_FROM_ADDING_PROBLEM',
    payload: test
  }
}

export default removeTest;