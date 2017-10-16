import React from 'react';
import { connect } from 'react-redux';
import updateAddProblem from '../../Actions/addProblem';


class AddProblem extends React.Component {
  constructor (props) {
    super (props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (e) {
    e.preventDefault();
    let value = e.target.value;
    let property = e.target.dataset.property;
    let problem = Object.assign({}, this.props.problem);
    problem[property] = value;
    this.props.submit(problem);
  }

  handleSubmit (e) {
    e.preventDefault();

  }
  componentWillReceiveProps () {
    
  }
  componentDidMount () {
    console.log ('props is ',this.props);
  }

  render () {
    let problem = this.props.problem;

    return (
      <div>
        <div>Adding Toy Problem</div>
        <form onSubmit={this.handleSubmit}>
          Title: <input value={problem.title} 
          onChange={this.handleChange}
          data-property='title'/><br/>

          Problem description: <textarea 
          value={problem.problemDescription} 
          onChange={this.handleChange}
          rows="10" 
          cols="70"
          data-property='problemDescription'/><br/>

          Difficulty: <input value={problem.difficulty} 
          onChange={this.handleChange}
          data-property='difficulty'/><br/>

          Function Name: <input value={problem.fxnName} 
          onChange={this.handleChange}
          data-property='fxnName'/><br/>

          Tests: <input value={problem.oneTest} 
          onChange={this.handleChange}
          data-property='oneTest'/><br/>

          {/* {JSON.stringify(props.allTests)} */}
          <button type='submit'></button>
        </form>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    problem: state.addingProblem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (problem) => {
      dispatch(updateAddProblem(problem));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProblem);
