import React from 'react';
import fire from '../../../Firebase/firebase';
import '../../../Styles/TestSuite.css';

/* Check if user is challenger or creator*/
class TestSuite extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      testSuite: '',
      room: '',
      username: '',
      problem: '',
      userInfo: ''
    }
  }
  componentDidMount () {
    let { room, currentUser } = this.props;
    let username = currentUser.username;
    let userInfo = room.playerInfo[username];
    let userPos = userInfo.position;
    let problem = room.board[userPos[0]][userPos[1]][1];
    let testSuite = <div>
      <h3 className="problemTitle"> {problem.title} </h3>
      <h4> PROBLEM DESCRIPTION  </h4>
      <p id="description">{problem.description}</p>
      <h4 className="testTitle"> TESTS </h4>
    </div>

    this.setState({
      testSuite,
      room,
      username,
      problem,
      userInfo
    });
  }
  render () {
    let testSuite = this.state.testSuite;   
    let { room, currentUser } = this.props;
    let username = currentUser.username;
    let userInfo = room.playerInfo[username];
    let results = (userInfo.testStatus && userInfo.testStatus.length > 1) ? 
      (<div className="testHolder">{userInfo.testStatus.map((tests, i) => {
        let passing = "PASSED!"
        if(!tests.passed){
          passing = "FAILED!"
        }
        return <div key={tests.inputs + i}>
          {passing === "FAILED!" ? 
          <span className="failure">{passing} </span>
          : <span className="success">{passing} </span>
          }
          <span>{` Inputs: "${tests.inputs}" Expected: "${tests.expected}" Actual: "${tests.actual}"`}</span>
        </div>
      })}</div>) : null;

    return <div id="testSuite">
      {testSuite}
      {results}
    </div>
  }
}

export default TestSuite;

// const TestSuite = (props) => {
//   let username = fire.auth().currentUser.email.split('@')[0];
//   let {room} = props;
//   let userInfo = room.playerInfo[username];
//   let userPos = userInfo.position;
//   let problem = room.board[userPos[0]][userPos[1]][1];
//   if (problem) {
//     return(
//       <div id="testSuite">
//         <h3 className="problemTitle"> {problem.title} </h3>
//         <h4> PROBLEM DESCRIPTION  </h4>
//         <p id="description">{problem.description}</p>
//         <h4 className="testTitle"> TESTS </h4>
//         {(userInfo.testStatus && userInfo.testStatus.length > 1) ? 
//           (<div className="testHolder">{userInfo.testStatus.map((tests, i) => {
//             let passing = "PASSED!"
//             if(!tests.passed){
//               passing = "FAILED!"
//             }
//             return <div key={tests.inputs + i}>
//               {passing === "FAILED!" ? 
//               <span className="failure">{passing} </span>
//               : <span className="success">{passing} </span>
//               }
//               <span>{` Inputs: "${tests.inputs}" Expected: "${tests.expected}" Actual: "${tests.actual}"`}</span>
//             </div>
//           })}</div>) : null
//           }
//       </div>
//     )
//   } else {
//     return (
//       <div id="testSuite">
//       <h3 className="problemTitle"> No Problem Yet </h3>
//       <h4> PROBLEM DESCRIPTION  </h4>
//       <p id="description"> No Problem Description Yet</p>
//       <h4 className="testTitle"> TESTS </h4>
//       {(props.room.playerInfo[username].testStatus && props.room.players[username].testStatus.length > 1) ? 
//         (<div className="testHolder">{props.room.players[username].testStatus.map((tests, i) => {
//           let passing = "PASSED!"
//           if(!tests.passed){
//             passing = "FAILED!"
//           }
//           return <div key={tests.inputs + i}>
//             {passing === "FAILED!" ? 
//             <span className="failure">{passing} </span>
//             : <span className="success">{passing} </span>
//             }
//             <span>{` Inputs: "${tests.inputs}" Expected: "${tests.expected}" Actual: "${tests.actual}"`}</span>
//           </div>
//         })}</div>) : null
//         }
//     </div>
//     )
//   }
// }