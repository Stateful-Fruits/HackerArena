const gameRoomsUpdate = (gameRooms = [], action) => {
  switch(action.type) {
    case 'UPDATE_GAMEROOMS':
      return action.payload;
    default:
      return gameRooms;
  }
};

export default gameRoomsUpdate;