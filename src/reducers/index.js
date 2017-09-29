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
            newData.push(action.book);
            newState.data = newData;
            break;
        case actionTypes.UPDATE_BOOK:
            newState.currentBook = action.book;
            newState.data.splice(action.book.index, 1, action.book);
            break;
        case actionTypes.EDIT_BOOK:
            newCurrentBook = action.book;
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