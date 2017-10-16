import React from 'react';

const AddingTest = (props) => {
  let problem = props.problem;
  let handleChange = props.handleChange;
  return (
    <div>
      <input value={problem.addingTest}
      className='addingTest' 
      onChange={handleChange}
      data-property='addingTest'/>
    </div>
  )
}

export default AddingTest;
