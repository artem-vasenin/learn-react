import React from 'react';

const Book = React.createClass({
	getInitialState: function () {
		return {
			description: ' hide',
			update: false
		};
	},
	handleReadmore: function (e) {
		e.preventDefault();

		if (this.state.description) {
			this.setState({description: ''});
		} else {
			this.setState({description: ' hide'});
		}		
	},
	handleDelete: function () {
		this.props.deleteBook(this.props.index);
	},
	handleUpdate: function () {
		this.props.editBook(this.props.index);
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

export default Book;