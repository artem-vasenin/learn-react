<<<<<<< HEAD
=======
import React from 'react'
import ReactDOM from 'react-dom'

import './css/style.css';

const container = document.getElementById('root');

const Library = React.createClass({
	getInitialState: function(){
		return {
			data: []
		};
	},
	addBook: function(itemObj) {
		let booksArr = this.state.data,
			tmpData = this.state.data;
		booksArr.push(itemObj);
		this.setState({data: booksArr});
	},
	// updateBook: function(index, item) {

	// },
	deleteBook: function(index) {
		let booksArr = this.state.data,
			tmpData = this.state.data,
			i = index;
			booksArr.splice(i, 1);
		this.setState({data: booksArr});
	},
	render: function(){
		return (
			<div className='library'>
				<h1>Библиотека</h1>
				<AddForm add={this.addBook} />
				<BookList books={this.state.data} update={this.updateBook} delete={this.deleteBook} />
			</div>
		);
	}
});

const AddForm = React.createClass({
	componentDidMount: function() {
		ReactDOM.findDOMNode(this.refs.titleField).focus();
	},
	getInitialState: function() {
		return {
			textValue: '',
			submit: ' disabled'
		};
	},
	onBtnClickHandler: function(e) {
		e.preventDefault();
		if(this.state.submit == ' disabled') return;
		let title = this.refs.titleField.value.trim(),
			author = this.refs.authorField.value.trim(),
			year = this.refs.yearField.value.trim(),
			pages = this.refs.pagesField.value.trim(),
			desc = this.refs.descField.value.trim();

		this.props.add({title: title, author: author, year: year || '---', pages: pages || '---', desc: desc || '---'});

		ReactDOM.findDOMNode(this.refs.titleField).value = '';
		ReactDOM.findDOMNode(this.refs.authorField).value = '';
		ReactDOM.findDOMNode(this.refs.yearField).value = '';
		ReactDOM.findDOMNode(this.refs.pagesField).value = '';
		ReactDOM.findDOMNode(this.refs.descField).value = '';
		this.setState({submit: ' disabled'});

		ReactDOM.findDOMNode(this.refs.titleField).focus();

	},
	fieldChange: function(){
		if(this.refs.titleField.value.trim().length > 0 && this.refs.authorField.value.trim().length > 0){
			this.refs.submit.disabled = false;
			this.setState({submit: ''});
		}else{
			this.refs.submit.disabled = true;
			this.setState({submit: ' disabled'});
		}
		this.state
	},
	render: function(){
		return (
			<form className='add-form'>
				<label className='label'>
					<span className='label__text'>Заголовок*:</span>
					<input className='textfield textfield--title' onChange={this.fieldChange} defaultValue='' ref='titleField' />
				</label>
				<label className='label'>
					<span className='label__text'>Автор*:</span>
					<input className='textfield textfield--author' onChange={this.fieldChange} defaultValue='' ref='authorField' />
				</label>
				<label className='label'>
					<span className='label__text'>Дата:</span>
					<input className='textfield textfield--year' defaultValue='' ref='yearField' />
				</label>
				<label className='label'>
					<span className='label__text'>Страниц:</span>
					<input className='textfield textfield--pages' defaultValue='' ref='pagesField' />
				</label>
				<label className='label'>
					<span className='label__text'>Подробнее:</span>
					<textarea className='textfield textfield--desc' defaultValue='' ref='descField' ></textarea>
				</label>
				<div className='button-block'>
					<button className={'button' + this.state.submit} onClick={this.onBtnClickHandler} ref='submit'>Добавить книгу</button>
				</div>
			</form>
		);
	}
});

const BookList = React.createClass({
	render: function(){
		let books = this.props.books,
			update = this.props.update,
			del = this.props.delete;

		let booksArr = books.map(function(item, index) {
			return (
				<Book item={item} count={index} key={index} index={index} update={update} delete={del} />
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
	getInitialState: function() {
		return {
			description: ' hide'
		};
	},
	readmore: function(e) {
		e.preventDefault();
		if(this.state.description)
			this.setState({description: ''});
		else
			this.setState({description: ' hide'});
	},
	deleteBook: function(){
		this.props.delete(this.props.index);
	},
	render: function(){
		let item = this.props.item,
			count = this.props.count;

		return (
			<li className='list__item'>
				<i className='list__index'>{count + 1}</i>
				{item.author} <b>"{item.title}"</b> - {item.year}г ({item.pages} стр)
				<p className={'desc' + this.state.description}>{item.desc}</p>
				<span className='list__buttons'>
					<button className='button' onClick={this.readmore}>&#63;</button>
					<button className='button button--green'>&#9998;</button>
					<button className='button button--red' onClick={this.deleteBook}>&otimes;</button>
				</span>
			</li>
		);
	}
});

ReactDOM.render(
	<Library />,
	container
);
>>>>>>> origin/v2.0
