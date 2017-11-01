const updateBoardRooms = (gameRooms) => {
  let action = {
    type: 'UPDATE_BOARD_GAMEROOMS',
    payload: gameRooms
  }
  return action
};

export default updateBoardRooms;