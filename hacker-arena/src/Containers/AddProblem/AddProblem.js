import React from 'react';
import '../../Styles/AddProblem.css';
import { connect } from 'react-redux';
import updateAddProblem from '../../Actions/addProblem/updateAddProblem';
import updateAddProblemTests from '../../Actions/addProblem/updateAddProblemTests';
import fire from '../../Firebase/firebase';
import AllTests from './AllTests';
import Title from './Title';
import ProblemDescription from './ProblemDescription';
import FunctionName from './FunctionName';
import Difficulty from './Difficulty';
import AddingTest from './AddingTest';

class AddProblem extends React.Component {
  constructor (props) {
    super (props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addInTest = this.addInTest.bind(this);
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

  addInTest (e) {
    e.preventDefault();
    this.props.addTest(e.target.value);
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
          Title: <Title problem={problem} handleChange={this.handleChange}/> 

          Problem description: <ProblemDescription problem={problem} handleChange={this.handleChange}/>

          Difficulty: <Difficulty problem={problem} handleChange={this.handleChange}/>

          Function Name: <FunctionName problem={problem} handleChange={this.handleChange}/>
          
          Format: Test.assertEquals(userFn(2012, 2016), 4028)
          <button onClick={this.addInTest}
            type='button' 
            value={problem.addingTest}>Add To Tests:</button>
          <AddingTest problem={problem} handleChange={this.handleChange}/>
          <br/>

          <AllTests/>
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
    },
    addTest: (test) => {
      dispatch(updateAddProblemTests(test));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProblem);
