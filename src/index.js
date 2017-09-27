import React from 'react';
import ReactDOM from 'react-dom';

import './css/style.css';

const container = document.getElementById('root');

const Library = React.createClass({
	getInitialState: () => {
		return {
			data: [],
			update: false
		};
	},
	handleSaveBook: function (itemObj, index) {
		const tmpState = Object.assign({}, this.state);
		
		if (index === undefined){
			tmpState.data.push(itemObj);
		} else {
			this.handleUpdate(index, itemObj);
		}

		this.setState({data: tmpState});
		this.handleUpdate(false, false, true);
	},
	handleUpdate: function (index, itemObj, clearUpdateState) {		
		let tmpState = Object.assign({}, this.state);
				
		if (clearUpdateState) {
			tmpState.update = false;
		} else {
			tmpState.update = { index: index, item: itemObj };
			tmpState.data.splice(index, 1, itemObj);
		}
		this.setState(tmpState);
	},
	handleDeleteBook: function (index) {
		const tmpState = Object.assign({}, this.state);
		tmpState.data.splice(index, 1);
		this.setState(tmpState);
	},
	render: function () {
		return (
			<div className='library'>
				<h1>Библиотека</h1>
				<AddForm 
					save={this.handleSaveBook} 
					update={this.state.update} 
				/>
				<BookList 
					books={this.state.data} 
					update={this.handleUpdate} 
					delete={this.handleDeleteBook} 
				/>
			</div>
		);
	}
});

const AddForm = React.createClass({
	componentWillReceiveProps(nextProps) {
		if(nextProps.update){
			const {update} = nextProps,
				{item} = update;

			this.setState({
				...this.stzte,
				update,
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
			update: this.props.update,
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

		if (this.state.update){
			this.props.save(item, this.state.update.index);
		} else {
			this.props.save(item);
		}

		this.setState({
			update: false,
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

const BookList = React.createClass({
	render: function () {
		const books = this.props.books,
			update = this.props.update,
			del = this.props.delete;

		let booksArr = books.map(function (item, index) {
			return (
				<Book 
					item={item}
					count={index}
					key={index}
					index={index}
					update={update}
					delete={del}
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
					<p><strong>{(books.length && ('Книг в библиотеке: ' + books.length)) || 'Библиотека пуста'}</strong></p>
				</div>
			</div>
		);
	}
});

const Book = React.createClass({
	getInitialState: function () {
		return {
			description: ' hide',
			update: false
		};
	},
	handleReadmore: function (e) {
		e.preventDefault();

		if (this.state.description)
			this.setState({description: ''});
		else
			this.setState({description: ' hide'});
	},
	handleDelete: function () {
		this.props.delete(this.props.index);
	},
	handleUpdate: function () {
		this.props.update(this.props.index, this.props.item);
		this.setState({update: true});
	},
	render: function () {
		const item = this.props.item,
			count = this.props.count;

		return (
			<li className='list__item'>
				<span className='list__info' onClick={this.handleReadmore}>
					<i className='list__index'>{count + 1}</i>
					{item.author} 
					<b>"{item.title}"</b> - 
					{item.year || '---'}г 
					({item.pages || '---'} стр)
				</span>
				<p className={'desc' + this.state.description}>{item.desc || 'Описание отсутствует'}</p>
				<span className='list__buttons'>
					<button className='button button--green' onClick={this.handleUpdate} >&#9998;</button>
					<button className='button button--red' onClick={this.handleDelete}>&otimes;</button>
				</span>
			</li>
		);
	}
});

ReactDOM.render(
	<Library />,
	container
);
