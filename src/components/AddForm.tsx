import React from 'react';
import {connect} from 'react-redux';
import {addBook, updateBook} from '../actions';
import {IBook} from '../models';

interface IProps {
	updateBook: (currentBook: IBook) => void;
	addBook: (currentBook: IBook) => void;
	currentBook: IBook;
	data: IBook[];
}

interface IState {
	submit: string;
	currentBook: IBook;
}

class AddForm extends React.Component<IProps, IState> {
	constructor (props) {
		super(props);
		this.state = {
			submit: ' disabled',
			currentBook: {}
		};
	}
	componentWillReceiveProps(newProps) {
		this.setState({currentBook: newProps.currentBook});
	}
	handleSaveClick = (e) => {
		e.preventDefault();

		let currentBook = {
			title: this.state.currentBook.title,
			author: this.state.currentBook.author,
			year: this.state.currentBook.year,
			pages: this.state.currentBook.pages,
			desc: this.state.currentBook.desc
		};

		if (this.state.submit === ' disabled' || (!currentBook.title && !currentBook.author)) {
			return;
		}

		if (this.props.currentBook.index !== undefined){
			currentBook.index = this.props.currentBook.index;
			this.props.updateBook(currentBook);
		} else {
			this.props.addBook(currentBook);
		}

		this.setState({
			submit: ' disabled',
			currentBook: {}
		});
	}
	handleFieldChange =  (e) => {
		const value = e.target.value,
			name = e.target.name;

		let newBook = {...this.state.currentBook};

		switch (name) {
			case 'title': newBook.title = value; break;
			case 'author': newBook.author = value; break;
			case 'year': newBook.year = value; break;
			case 'pages': newBook.pages = value; break;
			case 'desc': newBook.desc = value; break;
		}

		if (this.state.currentBook.title && this.state.currentBook.author) {
			this.setState({submit: '', currentBook: newBook});
		} else {
			this.setState({submit:  ' disabled', currentBook: newBook});
		}
	}
	render() {
		return (
			<form className='add-form'>
				<label className='label'>
					<span className='label__text'>Заголовок:</span>
					<input
						className='textfield textfield--title'
						name='title'
						onBlur={this.handleFieldBlur}
						onChange={this.handleFieldChange}
						value={this.state.currentBook.title !== undefined ? this.state.currentBook.title : ''}
						placeholder='Обязательно для заполнения'
						autoFocus
					/>
				</label>
				<label className='label'>
					<span className='label__text'>Автор:</span>
					<input
						className='textfield textfield--author'
						name='author'
						onBlur={this.handleFieldBlur}
						onChange={this.handleFieldChange}
						value={this.state.currentBook.author !== undefined ? this.state.currentBook.author : ''}
						placeholder='Обязательно для заполнения'
					/>
				</label>
				<label className='label'>
					<span className='label__text'>Дата:</span>
					<input
						className='textfield textfield--year'
						name='year'
						onBlur={this.handleFieldBlur}
						onChange={this.handleFieldChange}
						value={this.state.currentBook.year !== undefined ? this.state.currentBook.year : ''}
					/>
				</label>
				<label className='label'>
					<span className='label__text'>Страниц:</span>
					<input
						className='textfield textfield--pages'
						name='pages'
						onBlur={this.handleFieldBlur}
						onChange={this.handleFieldChange}
						value={this.state.currentBook.pages !== undefined ? this.state.currentBook.pages : ''}
					/>
				</label>
				<label className='label'>
					<span className='label__text'>Подробнее:</span>
					<textarea
						className='textfield textfield--desc'
						name='desc'
						onBlur={this.handleFieldBlur}
						onChange={this.handleFieldChange}
						value={this.state.currentBook.desc !== undefined ? this.state.currentBook.desc : ''}
					></textarea>
				</label>
				<div className='button-block'>
					<button
						className={'button' + this.state.submit}
						onClick={this.handleSaveClick}
						disabled={this.state.submit}
					>
						{this.props.currentBook.index === undefined ? 'Добавить книгу' : 'Редактировать'}
					</button>
				</div>
			</form>
		);
	}
}

const mapStateToProps = state => {
	return {
        currentBook: state.currentBook
    };
}
const mapDispatchToProps = dispatch => {
	return {
		addBook: (itemObject) => {
			dispatch(addBook(itemObject));
		},
		updateBook: (itemObject) => {
			dispatch(updateBook(itemObject));
		}
	};
}



export default connect(mapStateToProps, mapDispatchToProps)(AddForm);