import actionTypes from '../constants';
import {IBook} from '../models';

export function addBook(itemObj: IBook) {
	return {
		type: actionTypes.ADD_BOOK,
		payload: itemObj
	};
}

export function updateBook(itemObj: IBook) {
	return {
		type: actionTypes.UPDATE_BOOK, 
		payload: itemObj
	};
}

export function editBook(itemObj: IBook) {
	return {
		type: actionTypes.EDIT_BOOK, 
		payload: itemObj
	};
}

export function deleteBook(index: number) {
	return {
		type: actionTypes.DELETE_BOOK, 
		payload: index
	};
}