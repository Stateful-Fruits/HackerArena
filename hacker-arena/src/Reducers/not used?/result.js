import actionTypes from '../actions/actionTypes';

const initialState = {
    value: 'Initial value',
};
const changeValue = (state, action) => {
    return Object.assign({}, state, {
        value: action.payload.newValue,
    });
};
const result = (state = initialState, action) => {
    // usually reducer core is just a switch on action.type
    // if you need to perform operations on values, create an external function and use it
    switch (action.type) {
        case actionTypes.CHANGE_VALUE: // the function in actiontype;
            return changeValue(state, action);
        default:
            return state;
    }
};
export default result;