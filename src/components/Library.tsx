import React from 'react';
import BookList from './BookList';
import AddForm from './AddForm';

class Library extends React.Component{
	render() {
		return (
			<div className='library'>
				<h1>Библиотека</h1>
				<AddForm/>
				<BookList/>
			</div>
		);
	}
}

export default Library;