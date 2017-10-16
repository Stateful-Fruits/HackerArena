const updateAddProblem = (problem) => {
  return {
    type: 'ADD_PROBLEM', 
    payload: problem
  }
}
export default updateAddProblem;