import React from 'react';
import {connect} from 'react-redux';
import {addBook, updateBook} from '../actions';

let AddForm = React.createClass({
	componentWillReceiveProps(nextProps) {
		if(nextProps.currentBook.index){
			const {currentBook} = nextProps,
				{item} = currentBook;

			this.setState({
				...this.state,
                index: item.index,
				title: item.title,
				author: item.author,
				year: item.year,
				pages: item.pages,
				desc: item.desc
			});
		}
	},
	getInitialState: function () {
		return {
			submit: ' disabled',
			currentBook: this.props.currentBook,
			title: '',
			author: '',
			year: '',
			pages: '',
			desc: ''
		};
	},
	handleSaveClick: function (e) {
		e.preventDefault();

		let item = {
			title: this.state.title,
			author: this.state.author,
			year: this.state.year,
			pages: this.state.pages,
			desc: this.state.desc
		};

		if (this.state.submit === ' disabled' || (!item.title && !item.author)) {
			return;
		}

		if (this.state.currentBook.index){
			this.props.updateBook(item);
		} else {
			this.props.addBook(item);
		}

		this.setState({
			currentBook: {},
			title: '',
			author: '',
			year: '',
			pages: '',
			desc: '',
			submit: ' disabled'
		});
	},
	handleFieldChange: function (e) {
		const value = e.target.value,
			name = e.target.name;

		switch (name) {
			case 'title': this.setState({title: value}); break;
			case 'author': this.setState({author: value}); break;
			case 'year': this.setState({year: value}); break;
			case 'pages': this.setState({pages: value}); break;
			case 'desc': this.setState({desc: value}); break;
		}
	},
	handleFieldBlur: function () {
		if (this.state.title.trim() && this.state.author.trim()) {
			this.setState({submit: ''});
		} else {
			this.setState({submit:  ' disabled'});
		}
	},
	render: function () {
		return (
			<form className='add-form'>
				<label className='label'>
					<span className='label__text'>Заголовок:</span>
					<input
						className='textfield textfield--title'
						name='title'
						onBlur={this.handleFieldBlur}
						onChange={this.handleFieldChange}
						value={this.state.title}
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
						value={this.state.author}
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
						value={this.state.year}
					/>
				</label>
				<label className='label'>
					<span className='label__text'>Страниц:</span>
					<input
						className='textfield textfield--pages'
						name='pages'
						onBlur={this.handleFieldBlur}
						onChange={this.handleFieldChange}
						value={this.state.pages}
					/>
				</label>
				<label className='label'>
					<span className='label__text'>Подробнее:</span>
					<textarea
						className='textfield textfield--desc'
						name='desc'
						onBlur={this.handleFieldBlur}
						onChange={this.handleFieldChange}
						value={this.state.desc}
					></textarea>
				</label>
				<div className='button-block'>
					<button
						className={'button' + this.state.submit}
						onClick={this.handleSaveClick}
					>
						{!this.props.update ? 'Добавить книгу' : 'Редактировать'}
					</button>
				</div>
			</form>
		);
	}
});

const mapStateToProps = state => {
	return {
        currentBook: state.currentBook
    };
}
const formMapdispatchtoprops = dispatch => {
	return {
		addBook: (index, itemObject) => {
			dispatch(addBook(index, itemObject));
		},
		updateBook: (index, itemObject) => {
			dispatch(updateBook(index, itemObject));
		}
	};
}

AddForm = connect(mapStateToProps, formMapdispatchtoprops)(AddForm);

export default AddForm;