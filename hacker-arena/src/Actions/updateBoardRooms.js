const updateBoardRooms = (gameRooms) => {
  let action = {
    type: 'UPDATE_BOARD_GAMEROOMS',
    payload: gameRooms
  }
  // console.log('board action ',action)
  return action
};

export default updateBoardRooms;