import axios from 'axios';

const userSignupRequest = (userData) => {
    return dispatch => {
        return axios.post('api/users', userData);
    }
}
const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
const setLoginSuccess = (isLoginSuccess) =>{
    return{
        type: SET_LOGIN_SUCCESS,
        isLoginSuccess
    };
}
const login = (username) => {
  return dispatch => {
      dispatch(setLoginSuccess(true))
  }
}




export default {
    userSignupRequest,
    login,
}