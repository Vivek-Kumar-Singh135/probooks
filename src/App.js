import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Header from './components/Header'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelves from './components/Shelves'
import Book from './components/Book'
import { TrackRecord } from './components/TrackRecord'
import { useDebounce } from 'use-debounce';

import useQuery from './hooks/useQuery'

const BooksApp = () => {

  const [books, setBooks] = useState([])
  const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());

  const [query, setQuery] = useState("");
  const [searchBooks, setSearchBooks] = useQuery(query);
  const [mergedBooks, setMergedBooks] = useState([]);

  const [bookRecord, setBookRecord] = useState([2,2,3,0]);


  useEffect(() => {

    BooksAPI.getAll()
      .then(data => {
        setBooks(data)
        setMapOfIdToBooks(createMapOfBooks(data))
      }
      );
  }, [])


  useEffect(() => {

    const combined = searchBooks.map(book => {
      if (mapOfIdToBooks.has(book.id)) {
        return mapOfIdToBooks.get(book.id);
      } else {
        return book;
      }
    })
    setMergedBooks(combined);
  }, [searchBooks])


  const createMapOfBooks = (books) => {
    const map = new Map();
    books.map(book => map.set(book.id, book));
    return map;
  }

  const updateBookShelf = (book, whereTo) => {
    let trackBooks = [...bookRecord]
    if(whereTo === 'none') trackBooks[3] = trackBooks[3] + 1
    else if(whereTo === 'currentlyReading') trackBooks[0] = trackBooks[0] + 1
    else if(whereTo === 'wantToRead') trackBooks[1] = trackBooks[1] + 1
    else if(whereTo === 'read') trackBooks[2] = trackBooks[2] + 1
    setBookRecord(trackBooks);
    const updatedBooks = books.map(b => {
      if (b.id === book.id) {
        book.shelf = whereTo;
        return book;
      }
      return b;
    })
    if (!mapOfIdToBooks.has(book.id)) {
      book.shelf = whereTo;
      updatedBooks.push(book)
    }
    setBooks(updatedBooks);
    BooksAPI.update(book, whereTo);
  }

  return (
    <div className="app">
      <Router>

        <Switch>

          {/* SEARCH */}
          <Route path="/search">
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/">
                  <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
              </div>
              <div className="search-books-results">
                <h2>{searchBooks.length} books found</h2>
                <ol className="books-grid">
                  {mergedBooks.map(b => (
                    <li key={b.id}>
                      <Book book={b} changeBookShelf={updateBookShelf} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Route>

          {/* MAIN PAGE */}
          <Route path="/">
            <div className="list-books">
            {console.log("SEARCH", searchBooks)}
              <Header />
              <div className="list-books-content">
                <Shelves books={books} updateBookShelf={updateBookShelf} />
                <TrackRecord bookRecord={bookRecord}/>
              </div>
              <div className="open-search">
                <Link to="/search">
                  <button>Add a book</button>
                </Link>
              </div>
              <div>
                
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  )

}

export default BooksApp