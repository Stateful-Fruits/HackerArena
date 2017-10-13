const updateGameRooms = (gameRooms) => {
  return ({
    type: 'UPDATE_GAMEROOMS',
    payload: gameRooms
  })
};

export default updateGameRooms;