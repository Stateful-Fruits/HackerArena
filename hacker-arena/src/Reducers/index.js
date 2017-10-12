// Put import all the reducers here

import { combineReducers } from 'redux';
import updateCurrentRoom from './updateCurrentRoom';

const testReduer = (state = 'SHOW', action = {type: 'TEST', payload: 'success!'}) => {
  switch(action.type) {
    case 'TEST':
      return state;
    default:
      return state;
  }
};

const appReducers = combineReducers({
  testReduer,
  updateCurrentRoom
});

export default appReducers;