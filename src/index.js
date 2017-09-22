import React from 'react'
import ReactDOM from 'react-dom'

import './css/style.css';

const container = document.getElementById('root');

let Library = React.createClass({
	render: function(){
		return (
			<div className='library'>
				<h1>Библиотека</h1>
				<Addform />
				<BookList />
			</div>
		);
	}
});

let Addform = React.createClass({
	render: function(){
		return (
			<div className='add-form'>
				<label className='label'>
					<span className='label__text'>Заголовок</span>
					<input className='textfield textfield--title' />
				</label>
				<label className='label'>
					<span className='label__text'>Автор</span>
					<input className='textfield textfield--author' />
				</label>
				<label className='label'>
					<span className='label__text'>Дата печати</span>
					<input className='textfield textfield--date' />
				</label>
				<label className='label'>
					<span className='label__text'>Количество страниц</span>
					<input className='textfield textfield--pages' />
				</label>
				<div className='button-block'>
					<button className='button'>Добавить книгу</button>
				</div>
			</div>
		);
	}
});

let BookList = React.createClass({
	render: function(){
		return (
			<div className='book-list'>
				<h2>Список книг</h2>
				<div className='book-list__table'>
					<ol className='list'>
					<li className='list__item'>
						<i className='list__index'>1</i>
						Автор <b>"Заголовок"</b> - 2222г (3333 стр)
						<span className='list__buttons'>
							<button onClick={this.edit} className='button button--green'>Редактировать</button>
							<button onClick={this.delete} className='button button--red'>Удалить</button>
						</span>
					</li>
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
