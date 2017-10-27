// Import all of our reducers here
import gameRooms from './gameRoomsUpdate';
import testStatus from './testSuiteUpdate';
// import currentRoom from './updateCurrentRoom';
import profile from './updateUserProfile';
import problems from './updateProblems';
import addingProblem from './addingProblem';
import pendingEvents from './updatePendingEvents';
//state.gameRooms , state.addingProblem etc...
import boardRooms from './updateBoardRooms';

const appReducers = ({
  gameRooms,
  testStatus,
  problems,
  addingProblem,
  profile,
  boardRooms,
  pendingEvents
});

export default appReducers;