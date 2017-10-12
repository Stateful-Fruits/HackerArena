// create your action creators in seperate folders and import them here
// export all of the action creators from this file
import axios from 'axios';

const userSignupRequest = (userData) => {
    return dispatch => {
        return axios.post('api/users', userData);
    }
}
export default {
    userSignupRequest,
};