import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCardComponent';
import { Book } from '../models/bookModel';
import './RecentBookPage.css';

const BookPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const response = await axios.get('/api/books/recent-books');
                if (response.data) {
                    const sortedBooks = response.data.sort((a: Book, b: Book) => {
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    });
                    setBooks(sortedBooks);
                } else {
                    setError('No books found.');
                }
            } catch (error: any) {
                console.error('Error fetching books:', error.message);
                setError('Failed to fetch books. Please try again.');
            } finally {
                setLoading(false);
            }
        }
        fetchBooks();
    }, []);

    if (loading) {
        return <p>Loading book details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="book-page">
            <h2>Recent Books</h2>
            <div className="book-list">
            {books.map(book => (
            <BookCard
                title={book.title}
                imageUrl={book.imageUrl}
                author={book.author}
                year={book.year}
                _id={book._id}
                genre={book.genre}
                description={book.description}
                date={book.date}
                createdAt={book.createdAt}
            />
        ))}
            </div>
        </div>
    );
};

export default BookPage;
