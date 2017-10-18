const updateBoardRooms = (gameRooms) => {
  return ({
    type: 'UPDATE_BOARD_GAMEROOMS',
    payload: gameRooms
  })
};

export default updateBoardRooms;