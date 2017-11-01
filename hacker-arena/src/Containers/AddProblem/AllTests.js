import React from 'react';
import {connect} from 'react-redux';
import removeTest from '../../Actions/addProblem/removeTest';

class AllTests extends React.Component {
  constructor (props) {
    super (props);
    this.badgeClick = this.badgeClick.bind(this);
  }
  
  badgeClick (e) {
    e.preventDefault();
    console.log('clicked', e.target.id);
    if (e.target.id) {
      this.props.removeTest(e.target.id);
    }
  }

  render () {
    let tests = this.props.problem.tests;
    console.log('tests is ', tests, this.props);
    return (
      <div>
        <h5>Current Tests</h5>
        <div>
          {tests.length > 0 ?
            tests.map((test, i) => {
              return (
                <button type="button" 
                  className="btn btn-primary rounded" 
                  key={i}
                  onClick={this.badgeClick}>
                  {test + ' '} 
                  <span className="badge" 
                    id={test}>x</span>
                </button>
              )
            })
            :
            'none'
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('state is ', state);
  return {
    problem: state.addingProblem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeTest: (test) => {
      dispatch(removeTest(test));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTests);