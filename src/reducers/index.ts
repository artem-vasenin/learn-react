import actionTypes from '../constants';
import {IGlobalState, IActions} from '../models';

const initialState: IGlobalState = {
	data: [],
	currentBook: {}
};

export function reducer(state: IGlobalState = initialState, action: IActions) {
	let newState = {...state},
		newData = [...state.data],
		newCurrentBook = {...state.currentBook};
	switch (action.type) {
		case actionTypes.ADD_BOOK:
			newData.push(action.payload);
			newState.data = newData;
			break;
		case actionTypes.UPDATE_BOOK:
			newData.splice(action.payload.index, 1, action.payload);
			newState.currentBook = {};
			newState.data = newData;
			break;
		case actionTypes.EDIT_BOOK:
			newCurrentBook = action.payload;
			newState.currentBook = newCurrentBook;
			break;
		case actionTypes.DELETE_BOOK:
			newData.splice(action.payload, 1);
			newState.data = newData;
			break;
		default: return state;
	}
	return newState;
}