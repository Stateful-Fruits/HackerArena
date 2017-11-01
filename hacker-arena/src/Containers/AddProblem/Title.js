import React from 'react';

const Title = (props) => {
  let problem = props.problem;
  let handleChange = props.handleChange;
  return (
    <div>
      <input value={problem.title}
          className='title createGameInput' 
          onChange={handleChange}
          data-property='title'
          placeholder='Problem Title'
          /><br/>
    </div>
  )
}

export default Title;