const updateProblems = (problems) => {
  return ({
    type: 'UPDATE_PROBLEMS',
    payload: problems
  })
};

export default updateProblems;