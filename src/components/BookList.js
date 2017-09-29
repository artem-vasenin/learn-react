import React from 'react';
import {connect} from 'react-redux';
import {deleteBook, editBook} from '../actions';
import Book from './Book';

let BookList = React.createClass({
    deleteBook: function (index) {
		this.props.deleteBook(index);
	},
	editBook: function (itemObj) {
		this.props.editBook(itemObj);
	},
	render: function () {
		let booksArr = this.props.data.map(function (item, index) {
			item.index = index;
			return (
				<Book
					item={item}
					count={index}
					key={index}
					index={index}
                    editBook={this.editBook}
                    deleteBook={this.deleteBook}
				/>
			);
		}, this);

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

const mapStateToProps = state => {
	return {
        data: state.data
    };
}
const mapdispatchtoprops = dispatch => {
	return {
		deleteBook: (index) => {
			dispatch(deleteBook(index));
		},
		editBook: (itemObj) => {
			dispatch(editBook(itemObj));
		}
	};
}

export default connect(mapStateToProps, mapdispatchtoprops)(BookList);