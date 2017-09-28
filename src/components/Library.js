import React from 'react';
import BookList from './BookList';
import AddForm from './AddForm';


const Library = React.createClass({
	handleSaveBook: function (itemObj, index) {
		const tmpState = Object.assign({}, this.state);

		if (index === undefined){ //todo !index
			tmpState.data.push(itemObj);
		} else {
			this.handleUpdate(index, itemObj);
		}

		this.setState({data: tmpState});
		this.handleUpdate(false, false, true);
	},
	handleUpdate: function (index, itemObj, clearUpdateState) {
		let tmpState = Object.assign({}, this.state);

		if (clearUpdateState) {
			tmpState.update = false;
		} else {
			tmpState.update = { index: index, item: itemObj };
			tmpState.data.splice(index, 1, itemObj);
		}
		this.setState(tmpState);
	},
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