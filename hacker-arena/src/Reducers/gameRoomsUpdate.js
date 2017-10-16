const gameRoomsUpdate = (gameRooms = {}, action) => {
  switch(action.type) {
    case 'UPDATE_GAMEROOMS':
      return action.payload;
    case 'UPDATE_ONE_ROOM':
      let room = Object.assign(gameRooms,{[action.id]:action.payload});
      return room;
    default:
      return gameRooms;
  }
};

export default gameRoomsUpdate;