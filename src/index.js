import React from 'react';
import ReactDOM from 'react-dom';

import './css/style.css';

const container = document.getElementById('root');

const Library = React.createClass({
	getInitialState: function(){
		return {
			data: [],
			update: false
		};
	},
	handlleSaveBook: function(itemObj, index) {
		const tmpState = this.state,
					booksArr = tmpState.data;

		if(index === undefined)
			booksArr.push(itemObj);
		else
			this.handlleUpdate(index, itemObj);

    this.setState({data: booksArr});
    this.handlleUpdate(false, false, 0);
	},
	handlleUpdate: function(index, itemObj, flag) { 
    if(flag === 0){
      this.setState({update: false});
		}else{
			this.setState({update: {index: index, item: itemObj}});
    }
	},
	handlleDeleteBook: function(index) {
		const	tmpState = this.state,
					booksArr = tmpState.data;
    booksArr.splice(index, 1);
		this.setState({data: booksArr});
	},
	render: function(){
		return (
			<div className='library'>
				<h1>Библиотека</h1>
				<AddForm save={this.handlleSaveBook} update={this.state.update}  />
				<BookList books={this.state.data} update={this.handlleUpdate} delete={this.handlleDeleteBook} />
			</div>
		);
	}
});

const AddForm = React.createClass({
  shouldComponentUpdate(nextProps, nextState){
		if(nextProps.update){
			nextState.update = nextProps.update;
			nextState.title	 = nextProps.update.item.title;
			nextState.author = nextProps.update.item.author;
			nextState.year	 = nextProps.update.item.year;
			nextState.pages	 = nextProps.update.item.pages;
			nextState.desc	 = nextProps.update.item.desc;
    }
		return true;
  },
	getInitialState: function() {
		return {
      submit:  ' disabled',
      update: this.props.update,
      title:   '',
      author:  '',
      year:    '',
      pages:   '',
      desc:    ''
		};
	},
	handlleSaveClick: function(e) {
		e.preventDefault();
		
    let title = this.state.title,
      author 	= this.state.author,
      year 	  = this.state.year,
      pages 	= this.state.pages,
      desc 	  = this.state.desc;
		
		if(this.state.submit === ' disabled' || (!title && !author)) return;

		if(this.state.update)
			this.props.save(this.state.update.item, this.state.update.index);
		else
			this.props.save({title: title, author: author, year: year || '---', pages: pages || '---', desc: desc || '---'});
    
    this.setState({update: false}),
    this.setState({title:  ''}),
    this.setState({author: ''}),
    this.setState({year:   ''}),
    this.setState({pages:  ''}),
    this.setState({desc:   ''});
		this.setState({submit: ' disabled'});
  },
  handlleFieldChange: function(e){
    const value = e.target.value.trim(),
          name  = e.target.name;
          
    switch(name){
      case 'title':   this.setState({title: value});  break;
      case 'author':  this.setState({author: value}); break;
      case 'year':    this.setState({year: value});   break;
      case 'pages':   this.setState({pages: value});  break;
      case 'desc':    this.setState({desc: value});   break;
    }
  },
  handlleFieldBlur: function(){
    if(this.state.title.trim() && this.state.author.trim()){
      this.refs.submit.disabled = false;
      this.setState({submit: ''});
    }
    else{
      this.refs.submit.disabled = true;
      this.setState({submit: ' disabled'});
    }
  },
	render: function(){
		return (
			<form className='add-form'>
				<label className='label'>
					<span className='label__text'>Заголовок:</span>
					<input className='textfield textfield--title' name='title' onBlur={this.handlleFieldBlur} onChange={this.handlleFieldChange} defaultValue={this.state.title} ref='titleField' placeholder='Обязательно для заполнения' autoFocus />
				</label>
				<label className='label'>
					<span className='label__text'>Автор:</span>
					<input className='textfield textfield--author' name='author' onBlur={this.handlleFieldBlur} onChange={this.handlleFieldChange} defaultValue={this.state.author} ref='authorField' placeholder='Обязательно для заполнения' />
				</label>
				<label className='label'>
					<span className='label__text'>Дата:</span>
					<input className='textfield textfield--year' name='year' onBlur={this.handlleFieldBlur} onChange={this.handlleFieldChange} defaultValue={this.state.year} ref='yearField' />
				</label>
				<label className='label'>
					<span className='label__text'>Страниц:</span>
					<input className='textfield textfield--pages' name='pages' onBlur={this.handlleFieldBlur} onChange={this.handlleFieldChange} defaultValue={this.state.pages} ref='pagesField' />
				</label>
				<label className='label'>
					<span className='label__text'>Подробнее:</span>
					<textarea className='textfield textfield--desc' name='desc' onBlur={this.handlleFieldBlur} onChange={this.handlleFieldChange} defaultValue={this.state.desc} ref='descField' ></textarea>
				</label>
				<div className='button-block'>
					<button className={'button' + this.state.submit} onClick={this.handlleSaveClick} ref='submit'>{!this.props.update ? 'Добавить книгу' : 'Редактировать'}</button>
				</div>
			</form>
		);
	}
});

const BookList = React.createClass({
	render: function(){
		const books = this.props.books,
			update 	  = this.props.update,
			del 	    = this.props.delete;

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
      description: ' hide',
      update: false
		};
	},
	handlleReadmore: function(e) {
		e.preventDefault();
		if(this.state.description)
			this.setState({description: ''});
		else
			this.setState({description: ' hide'});
	},
	handlleDelete: function(){
		this.props.delete(this.props.index);
	},
	handlleUpdate: function(){
    this.props.update(this.props.index, this.props.item);
    this.setState({update: true});
	},
	render: function(){
		const item = this.props.item,
			count = this.props.count;

		return (
			<li className='list__item'>
				<i className='list__index'>{count + 1}</i>
				{item.author} <b>"{item.title}"</b> - {item.year}г ({item.pages} стр)
				<p className={'desc' + this.state.description}>{item.desc}</p>
				<span className='list__buttons'>
					<button className='button' onClick={this.handlleReadmore} >&#63;</button>
					<button className='button button--green' onClick={this.handlleUpdate} >&#9998;</button>
					<button className='button button--red' onClick={this.handlleDelete}>&otimes;</button>
				</span>
			</li>
		);
	}
});

ReactDOM.render(
	<Library />,
	container
);
