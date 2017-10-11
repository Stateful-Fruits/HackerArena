import {
    connect
} from 'react-redux';
import Result from '../components/Result';
import * as actions from '../actions';

const mapStateToProps = (state) => {
    return {
        // in this case we want the value for Result component action
        value: state.result.value,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeValue: (event) => {
            dispatch(actions.changeValue(event));
        },
    };
};

const IntelligentResult = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Result);

export default IntelligentResult;