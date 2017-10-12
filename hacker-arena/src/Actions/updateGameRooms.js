const updateGameRooms = (gameRooms) => {
  return ({
    type: 'UPDATE_GAMEROOMS',
    gameRooms 
  })
};

export default updateGameRooms;