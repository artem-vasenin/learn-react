export interface IBook {
	title?: string;
	author?: string;
	year?: number;
	pages?: number;
	desc?: string;
	index?: number;
}

export interface IGlobalState {
	data: IBook[];
	currentBook: IBook;
}

export interface IActions {
	type: string;
	payload: any;
}