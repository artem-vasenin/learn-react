import actionTypes from '../constants';

export function addBook(itemObj, index) {
    return {
        type: actionTypes.ADD_BOOK,
        data: {index: index, itemObj: itemObj}
    };
}

export function sendToForm(itemObj, index) {
    return {
        type: actionTypes.SEND_TO_DORM, 
        data: {index: index, itemObj: itemObj}
    };
}

export function updateBook(itemObj, index) {
    return {
        type: actionTypes.UPDATE_BOOK, 
        data: {index: index, itemObj: itemObj}
    };
}

export function deleteBook(index) {
    return {
        type: actionTypes.DELETE_BOOK, 
        index: index
    };
}

export function updateSuccess() {
    return {
        type: actionTypes.UPDATE_SUCCESS, 
        update: false
    };
}