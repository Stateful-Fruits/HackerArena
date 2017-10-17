import React from 'react';

const Difficulty = (props) => {
  let problem = props.problem;
  let handleChange = props.handleChange;
  return (
    <div>
      <input value={problem.difficulty}
      className='difficulty' 
      onChange={handleChange}
      data-property='difficulty'/>
    </div>
  )
}

export default Difficulty;