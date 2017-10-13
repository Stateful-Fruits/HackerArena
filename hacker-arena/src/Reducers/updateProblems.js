const updateProblems = (problems = [], action) => {
  switch(action.type) {
    case 'UPDATE_PROBLEMS':
      return action.payload;
    default:
      return problems;
  }
};

export default updateProblems;