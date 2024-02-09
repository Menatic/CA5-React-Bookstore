import React, { useState, useEffect } from 'react';
import './Books.css'; 

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://reactnd-books-api.udacity.com/books',
          {
            headers: {
              Authorization: 'whatever-you-want',
            },
          }
        );
        const data = await response.json();
        setBooks(data.books);
      } catch (error) {
        console.error('Error fetching data from Udacity Books API:', error);
      }
    };

    fetchData();
  }, []);

  const getAmazonLink = (book) => {
    const amazonSearchTerm = encodeURIComponent(book.title); 
    return `https://www.amazon.in/s?k=${amazonSearchTerm}`;
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="books-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Books"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="books-list">
        {filteredBooks.map((book) => (
          <a
            key={book.id}
            href={getAmazonLink(book)}
            target="_blank"
            rel="noopener noreferrer"
            className="book-item"
          >
            <img src={book.imageLinks.thumbnail} alt={book.title} />
            <div>
              <h3 className="book-title">{book.title}</h3> 
              <p>{book.authors.join(', ')}</p>
              <p>Rating: {book.averageRating || '4.5'}</p>
              <p>{book.price === 0 ? 'Free' : `Price: Free`}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};



export default Books;
