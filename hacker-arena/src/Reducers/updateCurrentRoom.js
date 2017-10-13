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
const updateCurrentRoom = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_GAME_ROOM':
      return action.payload;
    default:
      return state;
  }
}

export default updateCurrentRoom;