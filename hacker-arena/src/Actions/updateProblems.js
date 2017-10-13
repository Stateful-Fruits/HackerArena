const updateProblems = (problems) => {
  console.log('problems', problems);
  return ({
    type: 'UPDATE_PROBLEMS',
    payload: problems
  })
};

export default updateProblems;