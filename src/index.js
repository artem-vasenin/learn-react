import React from 'react'
import ReactDOM from 'react-dom'

import './css/style.css';

const container = document.getElementById('root');

let data = [
	{author: 'Крапивин', 	title: 'Голубятня на жёлтов поляне', 	year: 2000, pages: 400},
	{author: 'Дяченко', 	title: 'Vite Nostra', 					year: 2007, pages: 450},
	{author: 'Олди', 		title: 'Герой должен быть один', 		year: 2000, pages: 560},
	{author: 'Стругацкие', 	title: 'Трудно быть богом', 			year: 1963, pages: 760},
	{author: 'Семёнова', 	title: 'Волкодав', 						year: 2014, pages: 40},
	{author: 'Пехов', 		title: 'Искры и ветер', 				year: 2007, pages: 450},
	{author: 'Орлов', 		title: 'Тени войны', 					year: 2000, pages: 560},
	{author: 'Перумов', 	title: 'Череп на рукаве', 				year: 1963, pages: 760}
];

const Library = React.createClass({
	render: function(){
		return (
			<div className='library'>
				<h1>Библиотека</h1>
				<AddForm />
				<BookList books={data} />
			</div>
		);
	}
});

const AddForm = React.createClass({
	render: function(){
		return (
			<div className='add-form'>
				<label className='label'>
					<span className='label__text'>Заголовок:</span>
					<input className='textfield textfield--title' />
				</label>
				<label className='label'>
					<span className='label__text'>Автор:</span>
					<input className='textfield textfield--author' />
				</label>
				<label className='label'>
					<span className='label__text'>Дата:</span>
					<input className='textfield textfield--date' />
				</label>
				<label className='label'>
					<span className='label__text'>Страниц:</span>
					<input className='textfield textfield--pages' />
				</label>
				<div className='button-block'>
					<button className='button'>Добавить книгу</button>
				</div>
			</div>
		);
	}
});

const BookList = React.createClass({
	render: function(){
		let books = this.props.books;

		let booksArr = books.map(function(item, index) {
			return (
				<li className='list__item' key={index}>
					<i className='list__index'>{index + 1}</i>
					{item.author} <b>"{item.title}"</b> - {item.year}г ({item.pages} стр)
					<span className='list__buttons'>
						<button className='button button--green'>Редактировать</button>
						<button className='button button--red'>Удалить</button>
					</span>
				</li>
			);
		});

		return (
			<div className='book-list'>
				<h2>Список книг</h2>
				<div className='book-list__table'>
					<ol className='list'>
						{booksArr}
					</ol>
					<p><strong>Добавлено книг: 0</strong></p>
				</div>
			</div>
		);
	}
});

ReactDOM.render(
	<Library />,
	container
);
