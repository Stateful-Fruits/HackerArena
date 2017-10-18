const updateBR = (state={}, action) => {
  // console.log('hello ', action);
  switch (action.type) {
    case 'UPDATE_BOARD_GAMEROOMS':
      return action.payload;
    case 'UPDATE_SPECIFIC_BOARD_ROOM':
      let rooms = Object.assign({}, state, {[action.id]:action.payload});
      return rooms;
    default:
      return state;
  }
}

export default updateBR;