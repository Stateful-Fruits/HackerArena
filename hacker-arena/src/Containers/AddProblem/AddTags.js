import React from 'react';

const AddTags = (props) => {
  let problem = props.problem;
  let handleChange = props.handleChange;
  return (
    <div>
      <input value={problem.tags}
      className='tags' 
      onChange={handleChange}
      data-property='tags'/>
    </div>
  )
}

export default AddTags;
