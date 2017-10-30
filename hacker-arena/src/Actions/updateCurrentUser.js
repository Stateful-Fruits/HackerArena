const updateCurrentUser = (profile) => {
    return ({
      type: 'UPDATE_CURRENT_USER',
      payload: profile
    })
  };
  
  export default updateCurrentUser;