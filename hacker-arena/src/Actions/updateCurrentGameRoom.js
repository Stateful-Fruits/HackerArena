function updateCurrentGameRoom (room) {
  return {
    type: `UPDATE_GAME_ROOM`,
    payload: room
  }
}

export default updateCurrentGameRoom;