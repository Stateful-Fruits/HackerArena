import React from 'react';

const AddTags = (props) => {
  let problem = props.problem;
  let handleChange = props.handleChange;
  return (
    <div>
      <input value={problem.tags}
      className='tags createGameInput' 
      onChange={handleChange}
      data-property='tags'
      placeholder='Primary tag, Secondary tag, ...'
      />
    </div>
  )
}

export default AddTags;
