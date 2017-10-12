// const makeGameRoom = (state, action) => {
//   switch(action.type) {
//     case 'MAKE_GAME_ROOM':
//       var newState = Object.assign({},state);
//       newState.gameRoom = action.
//       return newState;
//     default:
//       return state;
//   }
// };
const CreateGameRoom = (state, action) => {
  switch (action.type) {
    case 'CREATE_GAME_ROOM':
      var newState = Object.assign({}, state);
      newState.gameRoom = action.payload;
      return newState;
    default:
      return state;
  }
}

export default CreateGameRoom;