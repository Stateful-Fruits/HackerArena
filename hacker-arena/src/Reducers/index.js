// Import all of our reducers here
import gameRooms from './gameRoomsUpdate';
import testStatus from './testSuiteUpdate';
import updateCurrentRoom from './updateCurrentRoom';

const appReducers = ({
  gameRooms,
  testStatus,
  updateCurrentRoom
});

export default appReducers;