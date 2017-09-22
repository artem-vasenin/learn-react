import React from 'react'
import ReactDOM from 'react-dom'

import './css/style.css';

const place = document.getElementById('root');

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

let Booklist = React.createClass({
  edit: function(){
    console.log('Редактирование');
  },
  delete: function(){
    console.log('Удаление');
  },
  render: function(){
    var data = this.props.data;
    var booksListTemplate;
    if(data.length){
      booksListTemplate = data.map(function(item, index){
        return (
          <li className='list__item' key={index}>
            <i className='list__index'>{index}</i>
            {item.author} <b>"{item.title}"</b> - {item.year}г ({item.pages} стр)
            <span className='list__buttons'>
              <button onClick={this.edit} className='button button--green'>Редактировать</button>
              <button onClick={this.del} className='button button--red'>Удалить</button>
            </span>
          </li>
        );
      });
    }else{
      booksListTemplate = <li className='list__item'>Библиотека пока пуста.</li>
    }
    return (
      <div className='book-list'>
        <h2>Список книг</h2>
        <div className='book-list__table'>
          <ol className='list'>
            {booksListTemplate}
          </ol>
          <p><strong>Добавлено книг: {data.length}</strong></p>
        </div>
      </div>
    );
  }
});

let Library = React.createClass({
  render: function(){
    var books = [
      {author: 'Жуковский', title: 'Баллады', year: 2014, pages: 40},
      {author: 'Дяченко', title: 'Vite Nostra', year: 2007, pages: 450},
      {author: 'Олди', title: 'Герой должен быть один', year: 2000, pages: 560},
      {author: 'Стругацкие', title: 'Трудно быть богом', year: 1963, pages: 760}
    ];

    return (
      <div className='library'>
        <h1>Библиотека</h1>
        <Addform />
        <Booklist data={books} />
      </div>
    );
  }
});

ReactDOM.render(
  <Library />,
  place
);
