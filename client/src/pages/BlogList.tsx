import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BlogPage.css';

const BlogPage = () => {
    interface Blog {
        _id: string;
        title: string;
        content: string;
        name: string;
        date: string;
    }
    
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await axios.get('/api/blogs');
                // Assuming the date field is in ISO format, convert it to Date object for sorting
                const sortedBlogs = response.data.sort((a: Blog, b: Blog) => 
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                );
                setBlogs(sortedBlogs);
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
            }
        }
        fetchBlogs();
    }, []);

    return (
        <div className="blog-page">
            <h2>Blogs</h2>
            <div className="blogs-list">
                {blogs.map(blog => (
                    <div key={blog._id} className="blog-card">
                        <h3>{blog.title}</h3>
                        <p>{blog.content}</p>
                        <span className="blog-details">
                            {blog.name} - {new Date(blog.date).toLocaleDateString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
