import * as React from 'react';
import {connect, Dispatch} from 'react-redux';
import {IBook, IGlobalState, IActions} from '../models';
import {deleteBook, editBook} from '../actions';
import Book from './Book';

interface IProps {
	data: IBook[];
	deleteBook: (index: number) => void;
	editBook: (item: IBook) => void;
}

interface IState {
	data: IBook[];
}

class BookList extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			data: []
		};
	}
	componentWillReceiveProps(newProps: IProps) {
		this.setState({data: newProps.data});
	}
	deleteBook = (index: number) => {
		this.props.deleteBook(index);
	}
	editBook = (itemObj: IBook) => {
		this.props.editBook(itemObj);
	}
	render () {
		let booksArr = this.state.data.map((item: IBook, index: number) => {
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
		});

		return (
			<div className="book-list">
				<h2>Список книг</h2>
				<div className="book-list__table">
					<ol className="list">
						{booksArr}
					</ol>
					<p><strong>{(this.state.data.length && ('Книг в библиотеке: ' + this.state.data.length)) || 'Библиотека пуста'}</strong></p>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: IGlobalState) => {
	return {
		data: state.data
	};
};

const mapDispatchToProps = (dispatch: Dispatch<IActions>) => {
	return {
		deleteBook: (index: number) => {
			dispatch(deleteBook(index));
		},
		editBook: (itemObj: IBook) => {
			dispatch(editBook(itemObj));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);