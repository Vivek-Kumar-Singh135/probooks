import React from 'react';

const Book = ({ book, changeBookShelf }) => {

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                    <select defaultValue={book.shelf ? book.shelf : "none"} onChange={(e) => changeBookShelf(book, e.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Reading</option>
                        <option value="wantToRead">Like</option>
                        <option value="read">Dislike</option>
                        <option value="none">Delete</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.publisher}</div>
        </div>
    )

}

export default Book;