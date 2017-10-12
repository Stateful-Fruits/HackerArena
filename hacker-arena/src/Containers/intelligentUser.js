import {
    connect
} from 'react-redux';
import User from '../components/Result';
import * as actions from '../actions';

const mapStateToProps = (state) => {
    return {
        value: state.user.value,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeValue: (event) => {
            dispatch(actions.changeValue(event));
        },
    };
};

const IntelligentUser = connect(
    mapStateToProps,
    mapDispatchToProps,
)(User);

export default IntelligentUser;