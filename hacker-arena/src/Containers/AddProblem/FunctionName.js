import React from 'react';

const FunctionName = (props) => {
  let problem = props.problem;
  let handleChange = props.handleChange;
  return (
    <div>
      <input value={problem.userFn} 
        onChange={handleChange}
        className='fxn createGameInput'
        data-property='userFn'
        placeholder='e.g. sudokuSolver'
        />
    </div>
  )
}

export default FunctionName;