import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoginSuccess = false,
    isLoginPending = false,
    isLoginError = null
};
// const handleFullNameChange = (e) => {
//     this.setState({
//         fullName: e.target.value
//     })
// }
// const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(this.state.fullName)
// }
const user = (state = initialState, action) => {
    // usually reducer core is just a switch on action.type
    // if you need to perform operations on values, create an external function and use it
    switch (action.type) {
        case SET_LOGIN_SUCCESS: // the function in actiontype;
            return OBJECT.assign({}, state, {
                isLoginSuccess: action.isLoginSuccess
            })
        default:
            return state;
    }
};
export default user;