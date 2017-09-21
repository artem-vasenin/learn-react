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
  render: function(){
    return (
      <div className='book-list'>
        <h2>Список книг</h2>
        <div className='book-list__table'>
          <ul className='list'>
            <li className='list__item'>Жуковский <b>"Баллады"</b> - 2014г (40 стр) <button className='button button--red'>Удалить</button></li>
            <li className='list__item'>Дяченко <b>"Vite Nostra"</b> - 2007г (450 стр) <button className='button button--red'>Удалить</button></li>
            <li className='list__item'>Олди <b>"Герой должен быть один"</b> - 2000г (560 стр) <button className='button button--red'>Удалить</button></li>
            <li className='list__item'>Стругацкие <b>"Трудно быть богом"</b> - 1963г (760 стр) <button className='button button--red'>Удалить</button></li>
          </ul>
        </div>
      </div>
    );
  }
});

let Library = React.createClass({
  render: function(){
    return (
      <div className='library'>
        <h1>Библиотека</h1>
        <Addform />
        <Booklist />
      </div>
    );
  }
});

ReactDOM.render(
  <Library />,
  place
);
