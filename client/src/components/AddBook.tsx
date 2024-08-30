import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddBook.css';

const AddBookForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [ratings, setRatings] = useState(0);
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [year, setYear] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/profile/:userId');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newBook = {
            title,
            author,
            genre,
            averageRating: ratings,
            description,
            imageUrl,
            year,
        };

        try {
            await axios.post('/api/books', newBook);
            setMessage('Book added successfully!');
            setMessageType('success');
            // Reset form fields
            setTitle('');
            setAuthor('');
            setGenre('');
            setDescription('');
            setImageUrl('');
            setYear('');
        } catch (error) {
            console.error('Failed to add book:', error);
            setMessage('Failed to add book. Please try again.');
            setMessageType('error');
        }
    };

    return (
        <div className="add-book-form">
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Book Image URL:</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Book Name:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <div>
                    <label>Author:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                </div>
                <div>
                    <label>Genre:</label>
                    <input
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Year:</label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                {message && (
                    <div className={`message ${messageType}`}>
                        {message}
                    </div>
                )}
                <button type="submit">Add Book</button>
                
                
            </form>
            <button type="button" onClick={handleBackClick}>
                Back to Profile
            </button>
        </div>
    );
};

export default AddBookForm;
