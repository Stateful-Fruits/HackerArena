// Put import all the reducers here

import { combineReducers } from 'redux'

const testReduer = (state = 'SHOW', action = {type: 'TEST', payload: 'success!'}) => {
  switch(action.type) {
    case 'TEST':
      return state;
    default:
      return state;
  }
};

const appReducers = combineReducers({
  testReduer
});

export default appReducers;