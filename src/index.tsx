import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './store/store';
import Library from './components/Library';

import './css/style.css';

const container = document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
		<Library />
	</Provider>,
	container
);
