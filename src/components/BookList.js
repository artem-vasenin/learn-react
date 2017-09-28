import React from 'react';
import {connect} from 'react-redux';
import {deleteBook, editBook} from '../actions';
import Book from './Book';

let BookList = React.createClass({
	// componentWillReceiveProps: function(nextProps){
	// 	this.setState({data: this.props.data});
	// },
	// getInitialState: function() {
	// 	return {
	// 		data: [],
	// 		currentBook: {}
	// 	};
	// },
    deleteBook: function () {
		this.props.deleteBook(this.props.data.index);
	},
	editBook: function () {
		this.props.editeBook(this.props.data.index);
	},
	render: function () {
		console.log(this.props);
		let booksArr = this.props.data.map(function (item, index) {
			return (
				<Book
					item={item}
					count={index}
					key={index}
					index={index}
                    editBook={editBook}
                    deleteBook={deleteBook}
				/>
			);
		});

		return (
			<div className='book-list'>
				<h2>Список книг</h2>
				<div className='book-list__table'>
					<ol className='list'>
						{booksArr}
					</ol>
					<p><strong>{(this.props.data.length && ('Книг в библиотеке: ' + this.props.data.length)) || 'Библиотека пуста'}</strong></p>
				</div>
			</div>
		);
	}
});

const bookMapStateToProps = state => {
	return {
        data: state.data
    };
}
const bookMapdispatchtoprops = dispatch => {
	return {
		deleteBook: (index) => {
			dispatch(deleteBook(index));
		},
		updateBook: (index) => {
			dispatch(editBook(index));
		}
	};
}

export default connect(bookMapStateToProps, bookMapdispatchtoprops)(BookList);