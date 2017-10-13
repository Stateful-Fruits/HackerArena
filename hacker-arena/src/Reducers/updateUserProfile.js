const updateUserProfile = (state = {}, action) => {
  switch(action.type) {
    case 'SHOW_PASS':
      return Object.assign(state,{showPass: !state.showPass});
    default:
      return state;
  }
};

export default updateUserProfile;