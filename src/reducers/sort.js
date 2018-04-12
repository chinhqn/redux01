import * as types from './../constants/ActionTypes';

var initialState = {
    by: 'name',
    value1: 1, //1: tang, -1: giam
};

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SORT:
            return {
                by: action.sort.by,
                value1: parseInt(action.sort.value1, 10),
            };
        default:
            return state;
    }
}

export default myReducer;