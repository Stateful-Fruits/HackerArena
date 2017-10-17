import React from 'react';

const Title = (props) => {
  let problem = props.problem;
  let handleChange = props.handleChange;
  return (
    <div>
      <input value={problem.title}
          className='title' 
          onChange={handleChange}
          data-property='title'/><br/>
    </div>
  )
}

export default Title;