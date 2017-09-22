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
  getInitialState: function(){
    return { edit: false };
  },
  edit: function(){
    this.setState({edit: true})
  },
  save: function(){
    let author = this.refs.author.value;
    let title = this.refs.title.value;
    let year = this.refs.year.value;
    let pages = this.refs.pages.value;
    let i = this.props.index;
    this.setState({edit: false});
    // this.props.updateBook({author: author, title: title, year: year, pages: pages}, this.props.index);
    let arr = this.state.data;
    arr[i] = {author: author, title: title, year: year, pages: pages};
    this.setState({data: arr});
  },
  delete: function(){
    // this.props.deleteBook(this.props.index);
    let i = this.props.index;
    let arr = this.state.data;
    arr.splice(i, 1);
    this.setState({data: arr});
  },
  render: function(){
    let data = this.props.data;
    let booksListTemplate;
    if(data.length){
      booksListTemplate = data.map(function(item, index){
        if(this.state.edit){
          return (
            <li className='list__item' key={index} index={index} updateBook={this.updateBook} deleteBook={this.deleteBook}>
              <i className='list__index'>{index + 1}</i>
              {item.author} <b>"{item.title}"</b> - {item.year}г ({item.pages} стр)
              <span className='list__buttons'>
                <button onClick={this.edit} className='button button--green'>Редактировать</button>
                <button onClick={this.delete} className='button button--red'>Удалить</button>
              </span>
            </li>
          );
        }else{
          return (
          <li className='list__item' key={index} index={index} updateBook={this.updateBook} deleteBook={this.deleteBook}>
            <i className='list__index'>{index + 1}</i>
            <input ref='author' className='editfield editfield--author' type='text' defaultValue={item.author} />
            <input ref='title' className='editfield editfield--title' type='text' defaultValue={item.title} /> -
            <input ref='year' className='editfield editfield--year' type='text' defaultValue={item.year} />г
            (<input ref='pages' className='editfield editfield--pages' type='text' defaultValue={item.pages} /> стр)
            <span className='list__buttons'>
              <button onClick={this.save} className='button'>Сохранить</button>
            </span>
          </li>
          );
        }
      },this);
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
  // deleteBook: function(i){
  //   let arr = this.state.data;
  //   arr.splice(i, 1);
  //   this.setState({data: arr});
  // },
  // updateBook: function(args, i){
  //   let arr = this.state.data;
  //   arr[i] = args;
  //   this.setState({data: arr});
  // },
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
