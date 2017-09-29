import actionTypes from '../constants';

export function addBook(itemObj) {
    return {
        type: actionTypes.ADD_BOOK,
        book: itemObj
    };
}

export function updateBook(itemObj) {
    return {
        type: actionTypes.UPDATE_BOOK, 
        book: itemObj
    };
}

export function editBook(itemObj) {
    return {
        type: actionTypes.EDIT_BOOK, 
        book: itemObj
    };
}

export function deleteBook(index) {
    return {
        type: actionTypes.DELETE_BOOK, 
        index: index
    };
}