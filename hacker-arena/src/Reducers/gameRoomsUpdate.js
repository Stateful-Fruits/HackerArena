const updateGameRooms = (state, action) => {
  switch(action.type) {
    case 'UPDATE_GAMEROOMS':
      return Object.assign({}, state, {
        gameRooms: action.gameRooms
      });
    default:
      return state;
  }
};

export default updateGameRooms;