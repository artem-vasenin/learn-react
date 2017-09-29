import actionTypes from '../constants';

const initialState = {
    data: [],
    currentBook: {}
};

export default function reducer(state = initialState, action) {
    let newState = Object.assign({}, state),
        newData = Object.assign([], state.data),
        newCurrentBook = Object.assign([], state.currentBook);
    switch (action.type) {
        case actionTypes.ADD_BOOK:
            newData.push(action.currentBook);
            newState.data = newData;
            break;
        case actionTypes.UPDATE_BOOK:
            newData.splice(action.currentBook.index, 1, action.currentBook);
            newState.currentBook = {};
            newState.data = newData;
            break;
        case actionTypes.EDIT_BOOK:
            newCurrentBook = action.currentBook;
            newState.currentBook = newCurrentBook;
            break;
        case actionTypes.DELETE_BOOK:
            newData.splice(action.index, 1);
            newState.data = newData;
            break;
        default: return state;
    }
    return newState;
}