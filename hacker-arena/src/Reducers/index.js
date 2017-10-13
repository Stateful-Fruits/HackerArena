// Import all of our reducers here
import gameRooms from './gameRoomsUpdate';
import testStatus from './testSuiteUpdate';
import currentRoom from './updateCurrentRoom';

const appReducers = ({
  gameRooms,
  testStatus,
  currentRoom
});

export default appReducers;