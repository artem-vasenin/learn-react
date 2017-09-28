import actionTypes from '../constants';

const initialState = {
    data: [],
    update: false
};

export default function reducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case actionTypes.ADD_BOOK: 
            newState.data.push(action.itemObj);
            break;
        case actionTypes.UPDATE_BOOK:
            newState.update = { index: action.index, item: action.itemObj };
            newState.data.splice(action.index, 1, action.itemObj);
            break;
        case actionTypes.SEND_TO_FORM:
            // newState.data.splice(action.index, 1);
            break;
        case actionTypes.DELETE_BOOK:
            newState.data.splice(action.index, 1);
            break;
        case actionTypes.UPDATE_SUCCESS:
            newState.update = action.update;
            break;
        default: return state;        
    }
    return newState;
}