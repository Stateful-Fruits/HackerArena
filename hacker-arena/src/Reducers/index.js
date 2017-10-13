// Import all of our reducers here
import gameRooms from './gameRoomsUpdate';
import testStatus from './testSuiteUpdate';
import currentRoom from './updateCurrentRoom';
import problems from './updateProblems';


const appReducers = ({
  gameRooms,
  testStatus,
  currentRoom,
  problems
});

export default appReducers;