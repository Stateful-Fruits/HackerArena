import React from 'react';
import '../../Styles/AddProblem.css';
import { connect } from 'react-redux';
import updateAddProblem from '../../Actions/addProblem/updateAddProblem';
import updateAddProblemTests from '../../Actions/addProblem/updateAddProblemTests';
import fire from '../../Firebase/firebase';
import AllTests from './AllTests';
import Title from './Title';
import ProblemDescription from './ProblemDescription';
import AddTags from './AddTags'
import FunctionName from './FunctionName';
import Difficulty from './Difficulty';
import AddingTest from './AddingTest';
import resetAddProblem from '../../Actions/addProblem/resetAddProblem';

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
  handleDifficultyChange (e) {
    e.preventDefault();
    let value = parseInt(e.target.value, 10);
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
      this.props.resetAddProblem();
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
        <form className="createGameForm" onSubmit={this.handleSubmit}>

        <h2 className="createGameHeader"> Add Problems </h2>
          <h5>Title</h5> 
          <Title problem={problem} handleChange={this.handleChange}/> 

          <h5>Problem description</h5> 
          <ProblemDescription problem={problem} handleChange={this.handleChange}/>

          <h5>Tags</h5> 
          <AddTags problem={problem} handleChange={this.handleChange}/>

          <h5>Difficulty</h5> 
          <Difficulty problem={problem} handleChange={this.handleChange}/>

          <h5>Function Name</h5> 
          <FunctionName problem={problem} handleChange={this.handleChange}/>
          
          <h5>Add Tests</h5>
          <p className="addTestsTip">Test.assertEquals( userFn( <strong>INPUT</strong>  ), <strong>EXPECTED OUTPUT</strong> )</p>
          <AddingTest problem={problem} handleChange={this.handleChange}/>
          <button 
            className="submitCreateGame"
            onClick={this.addInTest}
            type='button' 
            value={problem.addingTest}>Add To Tests</button>

          <AllTests/>
          <button className='addProblem submitCreateGame' type='submit'> Add This Problem </button>
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
    },
    resetAddProblem: () => {
      dispatch(resetAddProblem());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProblem);
