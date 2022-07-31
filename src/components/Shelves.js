import React from 'react';
import Shelf from './Shelf';


const Shelves = ({books, updateBookShelf}) => {

    const Reading = books.filter((book) => book.shelf === "currentlyReading");
    const Like = books.filter((book) => book.shelf === "wantToRead");
    const Dislike = books.filter((book) => book.shelf === "read");

    return (
        <div>
            <Shelf title="Reading" books={Reading} updateBookShelf={updateBookShelf}/>
            <Shelf title="Like" books={Like} updateBookShelf={updateBookShelf}/>
            <Shelf title="Dislike" books={Dislike} updateBookShelf={updateBookShelf}/>
        </div>
    )

}

export default Shelves;