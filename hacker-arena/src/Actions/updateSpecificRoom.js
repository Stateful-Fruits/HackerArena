const updateSpecificRoom = (gameRoom) => {
  return ({
    type: 'UPDATE_ONE_ROOM',
    payload: gameRoom
  });
}

export default updateSpecificRoom;