// типы действий

export const ADD_BOOK = 'ADD_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';

// генераторы действий

export function addBook(bookInfo){
    return {type: ADD_BOOK, bookInfo};
}

export function deleteBook(bookIndex){
    return {type: DELETE_BOOK, bookIndex};
}

export function updateBook(bookObject){
    return {type: ADD_BOOK, bookObject};
}