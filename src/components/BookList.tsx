import * as React from 'react';
import {connect} from 'react-redux';
import {deleteBook, editBook} from '../actions';
import Book from './Book';
import {IBook} from '../models';

interface IProps {
	data: IBook[];
	deleteBook: (index: number) => void;
	editBook: (index: number) => void;
}

interface IState {
	data: IBook[];
}

class BookList extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
	}
	componentWillReceiveProps(newProps) {
		this.setState({data: newProps.data});
	}
    deleteBook = (index) => {
		this.props.deleteBook(index);
	}
	editBook = (itemObj) => {
		this.props.editBook(itemObj);
	}
	render () {
		let booksArr = this.state.data.map(function (item, index) {
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
					<p><strong>{(this.state.data.length && ('Книг в библиотеке: ' + this.state.data.length)) || 'Библиотека пуста'}</strong></p>
				</div>
			</div>
		);
	}
}

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