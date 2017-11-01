const updateUserProfile = (profile) => {
  return ({
    type: 'UPDATE_PROFILE',
    payload: profile
  })
};

export default updateUserProfile;