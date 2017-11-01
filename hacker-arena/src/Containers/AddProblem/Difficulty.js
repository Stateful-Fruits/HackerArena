import React from 'react';

const Difficulty = (props) => {
  let problem = props.problem;
  let handleChange = props.handleChange;
  return (
    <div>
      <input value={problem.difficulty}
      className='difficulty createGameInput' 
      onChange={handleChange}
      data-property='difficulty'
      placeholder="1 - 10"
      />
    </div>
  )
}

export default Difficulty;