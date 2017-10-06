import * as React from 'react';
import {IBook} from '../models';

interface IProps {
	item: IBook;
	index: number;
	count: number;
	editBook: (item: IBook) => void;
	deleteBook: (index: number) => void;
}

interface IState {
	update: boolean;
	description: string;
}

export default class Book extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			description: 'hide',
			update: false
		};
	}
	handleReadmore = (e) => {
		e.preventDefault();

		if (this.state.description) {
			this.setState({description: ''});
		} else {
			this.setState({description: 'hide'});
		}
	}

	handleDelete = () => {
		this.props.deleteBook(this.props.index);
	}

	handleEdit = () => {
		this.props.editBook(this.props.item);
	}

	render () {
		const item = this.props.item,
			count = this.props.count;

		return (
			<li className="list__item">
				<span className="list__info" onClick={this.handleReadmore}>
					<i className="list__index">{count + 1}</i>
					{item.author}
					<b>"{item.title}"</b> -
					{item.year || '---'}г
					({item.pages || '---'} стр)
				</span>
				<p className={`desc ${this.state.description}`}>{item.desc || 'Описание отсутствует'}</p>
				<span className="list__buttons">
					<button className="button button--green" onClick={this.handleEdit} >&#9998;</button>
					<button className="button button--red" onClick={this.handleDelete}>&otimes;</button>
				</span>
			</li>
		);
	}
}