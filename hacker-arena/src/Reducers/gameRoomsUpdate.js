const updateGameRooms = (state = [], action) => {
  switch(action.type) {
    case 'UPDATE_GAMEROOMS':
      return [...action.payload.gameRooms];
    default:
      return state;
  }
};

export default updateGameRooms;