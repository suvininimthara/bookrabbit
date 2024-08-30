import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BookList, BookDetail } from '../components/BookComponent';
import './BooksPage.css';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
    };
    averageRating?: number;
    previewLink?: string;
  };
}

interface GoogleBooksResponse {
  items: Book[];
}

const genres = {
  fiction: 'subject:fiction',
  politics: 'subject:politics',
  health: 'subject:health',
  science: 'subject:science',
  history: 'subject:history',
  fantasy: 'subject:fantasy',
  romance: 'subject:romance',
  mystery: 'subject:mystery',
  thriller: 'subject:thriller',
  biography: 'subject:biography',
  travel: 'subject:travel',
  cooking: 'subject:cooking',
  technology: 'subject:technology',
  art: 'subject:art',
  religion: 'subject:religion',
  business: 'subject:business',
  spirituality: 'subject:spirituality',
  young: 'subject:young',
};

type Genre = keyof typeof genres;

const BookPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<Book[]>([]);
  const [wishlistView, setWishlistView] = useState<boolean>(false);
  const [selectedGenre, setSelectedGenre] = useState<Genre>('fiction');

  const apiKey = 'AIzaSyA6Pr3EEcE-T_GUec0FmjwoXGXfliRU6UI';

  const fetchBooks = async (query: string) => {
    setLoading(true);
    try {
      const response = await axios.get<GoogleBooksResponse>(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
      );
      setBooks(response.data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isSearching) {
      fetchBooks(`${searchTerm} ${genres[selectedGenre]}`);
    } else {
      fetchBooks(genres[selectedGenre]);
    }
  }, [searchTerm, isSearching, selectedGenre]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearching(true);
    setSearchTerm((e.target as HTMLFormElement).search.value);
  };

  const handleGenreChange = (genre: Genre) => {
    setSelectedGenre(genre);
    setIsSearching(false);
  };

  const addToWishlist = (book: Book) => {
    setWishlist((prevWishlist) => [...prevWishlist, book]);
  };

  const removeFromWishlist = (bookId: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter((book) => book.id !== bookId));
  };

  const toggleWishlistView = () => {
    setWishlistView((prev) => !prev);
  };

  const LocationDisplay: React.FC = () => {
    const location = useLocation();
    const isBookDetail = location.pathname.startsWith('/book/');
    const isWishlist = location.pathname === '/wishlist';

    return (
      <div className="header-container">
        <div className="search-container">
          {isWishlist ? (
            <h1 className="wishlist-title">Wishlist</h1>
          ) : !isBookDetail ? (
            <>
              <form className="search-bar" onSubmit={handleSearch}>
                <input type="text" name="search" placeholder="Search books..." />
                <button type="submit">Search</button>
              </form>
              {!wishlistView && (
                <div className="genre-select">
                  {Object.keys(genres).map((genre) => (
                    <button
                      key={genre}
                      onClick={() => handleGenreChange(genre as Genre)}
                      className={selectedGenre === genre ? 'active-genre' : ''}
                    >
                      {genre.charAt(0).toUpperCase() + genre.slice(1)}
                    </button>
                  ))}
                </div>
              )}
              <button className="wishlist-button" onClick={toggleWishlistView}>
                {wishlistView ? 'Back to Book List' : 'Wishlist'}
              </button>
            </>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="main-content">
        <LocationDisplay />
        <Routes>
            <Route
              path="/"
              element={
                <BookList
                  books={books}
                  wishlist={wishlist}
                  toggleWishlistView={toggleWishlistView}
                  wishlistView={wishlistView}
                />
              }
            />
            <Route
              path="/:id"
              element={
                <BookDetail
                  books={books}
                  wishlist={wishlist}
                  addToWishlist={addToWishlist}
                  removeFromWishlist={removeFromWishlist}
                  toggleWishlistView={toggleWishlistView}
                />
              }
            />
            <Route
              path="/wishlist"
              element={
                <BookList
                  books={wishlist}
                  wishlist={wishlist}
                  toggleWishlistView={toggleWishlistView}
                  wishlistView={false}
                  />
                }
              />
            </Routes>
          </div>
        </div>
  );
};

export default BookPage;
