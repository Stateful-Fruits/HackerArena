const updateBR = (state={}, action) => {
  switch (action.type) {
    case 'UPDATE_BOARD_GAMEROOMS':
      return action.payload;
    default:
      return state;
  }
}

export default updateBR;