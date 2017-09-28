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
        data: itemObj
    };
}

export function editBook(index) {
    return {
        type: actionTypes.EDIT_BOOK, 
        data: index
    };
}

export function deleteBook(index) {
    return {
        type: actionTypes.DELETE_BOOK, 
        index: index
    };
}