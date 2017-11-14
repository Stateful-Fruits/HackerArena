import React from 'react';

const ProblemDescription = (props) => {
  let problem = props.problem;
  let handleChange = props.handleChange;
  return (
    <div>
      <textarea 
        id='problemDescriptionTextArea'
        className="form-control formProblemDescription"
        value={problem.problemDescription} 
        onChange={handleChange}
        rows="10"
        data-property='description'/>
    </div>
  )
}

export default ProblemDescription;