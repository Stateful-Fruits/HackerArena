const updateGameRooms = (state = {}, action) => {
  console.log('state passed to reducer: ', state);
  switch(action.type) {
    case 'UPDATE_GAMEROOMS':
      // return Object.assign({}, state, { gameRooms: action.gameRooms });
      return Object.assign({}, state, { gameRooms: action.gameRooms });
    default:
      return state;
  }
};

export default updateGameRooms;