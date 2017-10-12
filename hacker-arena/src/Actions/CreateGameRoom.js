function CreateGameRoom (data) {
  return {
    type: `CREATE_GAME_ROOM`,
    payload: data
  }
}

export default CreateGameRoom;