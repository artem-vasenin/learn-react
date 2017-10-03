import * as React from 'react';
import BookList from './BookList';
import AddForm from './AddForm';

const Library = () => (
    <div className="library">
        <h1>Библиотека</h1>
        <AddForm />
        <BookList />
    </div>
);

export default Library;