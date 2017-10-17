// Import all of our reducers here
import gameRooms from './gameRoomsUpdate';
import testStatus from './testSuiteUpdate';
// import currentRoom from './updateCurrentRoom';
import profile from './updateUserProfile';
import problems from './updateProblems';
import addingProblem from './addingProblem';
//state.gameRooms , state.addingProblem etc...


const appReducers = ({
  gameRooms,
  testStatus,
  problems,
  addingProblem,
  profile
});

export default appReducers;