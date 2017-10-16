import React from 'react';
import { connect } from 'react-redux';
import updateAddProblem from '../../Actions/addProblem/updateAddProblem';
import fire from '../../Firebase/firebase';

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
    this.props.update(problem);
  }

  handleSubmit (e) {
    e.preventDefault();
    let problem = this.props.problem;
    let truth = true;
    for (var key in problem) {
      if (problem[key].length === 0) {
        truth = false;
      }
    }
    if (truth) {
      let added = fire.database().ref('problems').push(problem).key;
      console.log('id of problem that was added ',added);
    } else {
      console.log('has empty fields', problem);
    }
  }
  componentDidMount () {
    //console.log ('props is ',this.props);
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
          data-property='description'/><br/>

          Difficulty: <input value={problem.difficulty} 
          onChange={this.handleChange}
          data-property='difficulty'/><br/>

          Function Name: <input value={problem.fxnName} 
          onChange={this.handleChange}
          data-property='userFn'/><br/>
          Format: Test.assertEquals(userFn(2012, 2016), 4028)<br/>
          Add Test: <input value={problem.oneTest} 
          onChange={this.handleChange}
          data-property='addingTest'/><br/>

          <div>Tests so far: {JSON.stringify(problem.tests)}</div>

          {/* {JSON.stringify(props.allTests)} */}
          <button type='submit'> Add This Problem </button>
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
    update: (problem) => {
      dispatch(updateAddProblem(problem));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProblem);
