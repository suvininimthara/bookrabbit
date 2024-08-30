import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import './BlogSection.css';

const BlogSection = () => {
    interface Blog {
        _id: string;
        title: string;
        content: string;
        username: string;
        date: string;
    }

    const [blogs, setBlogs] = useState<Blog[]>([]);
    const handleReadAllClick = () => {
        window.location.href = '/blogs';
    };

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await axios.get('/api/blogs/recent');
                setBlogs(response.data);
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
            }
        }
        fetchBlogs();
    }, []);

    return (
        <section className="blog-section">
            <h2>Latest Blogs</h2>
            <h6>Read the latest blogs from our contributors</h6>
            <br />
            <div className="blogs-list">
                {blogs.map(blog => (
                    <div key={blog._id} className="blog-card">
                        <h3>{blog.title}</h3>
                        <p>{blog.content.substring(0, 100)}...</p>
                        <span className="blog-details">{blog.username} - {new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                ))}
                <br />
                <div className='mx-auto text-center'>
                <Button onClick={handleReadAllClick} variant="primary" >Read All</Button></div>
                </div>
        </section>
    );
};

export default BlogSection;
