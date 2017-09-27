import Redux from 'redux';
import {addBook, deleteBook, updateBook} from '../actions'

const initialState = {
    data: [],
    update: false
};

function addBookReducer(state = initialState, action){
    switch(action.type){
        case ADD_BOOK: return Object.assign({}, state, {
            data: [
                ...state.data,
                {
                    title: action.book.title,
                    author: action.book.author,
                    year: action.book.year,
                    pages: action.book.pages,
                    desc: action.book.desc
                }
            ]
        });
        default: return state;
    }
}

//https://rajdee.gitbooks.io/redux-in-russian/content/docs/basics/Reducers.html