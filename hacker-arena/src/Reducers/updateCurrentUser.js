const updateCurrentUser = (user = {}, action) => {
  switch(action.type) {
    case 'UPDATE_CURRENT_USER':
    return action.payload;
    default:
    return user;
  }
};
  
  export default updateCurrentUser;