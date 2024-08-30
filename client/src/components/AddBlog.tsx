import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddBlog.css';

const AddBlogForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/blogs');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newBlog = {
            title,
            content,
            createdAt: new Date(),
            name,
            // Add other fields as needed
        };

        try {
            await axios.post('/api/blogs', newBlog);
            setMessage('Blog added successfully!');
            setMessageType('success');
            // Reset form fields
            setTitle('');
            setContent('');
            setName('');
        } catch (error) {
            console.error('Failed to add blog:', error);
            setMessage('Failed to add blog. Please try again.');
            setMessageType('error');
        }
    };

    return (
        <div className="add-blog-form">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Blog Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                {message && (
                    <div className={`message ${messageType}`}>
                        {message}
                    </div>
                )}
                <button type="submit">Add Blog</button>
            </form>
            <button type="button" onClick={handleBackClick}>
                Back to Blogs
            </button>
        </div>
    );
};

export default AddBlogForm;
