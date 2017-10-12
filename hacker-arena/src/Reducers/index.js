import { combineReducers } from 'redux'

// Import all of our reducers here
import gameRoomsUpdate from './gameRoomsUpdate';

const appReducers = combineReducers({
  gameRoomsUpdate
});

export default appReducers;