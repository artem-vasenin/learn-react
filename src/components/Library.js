import React from 'react';
import BookList from './BookList';
import AddForm from './AddForm';

const Library = React.createClass({
	render: function () {
		return (
			<div className='library'>
				<h1>Библиотека</h1>
				<AddForm/>
				<BookList/>
			</div>
		);
	}
});

export default Library;