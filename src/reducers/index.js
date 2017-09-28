import actionTypes from '../constants';

const initialState = {
    data: [],
    currentBook: {}
};

export default function reducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case actionTypes.ADD_BOOK: 
            newState.data.push(action.book);
            break;
        case actionTypes.UPDATE_BOOK:
            newState.currentBook = action.book;
            newState.data.splice(action.book.index, 1, action.book);
            break;
        case actionTypes.EDIT_BOOK:
            // newState.data.splice(action.index, 1);
            break;
        case actionTypes.DELETE_BOOK:
            newState.data.splice(action.index, 1);
            break;
        default: return state;        
    }
    return newState;
}