import React from 'react';
import { Blog } from '../models/blogModel';

interface BlogCardProps extends Blog {
    onEdit: () => void;
    onDelete: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ _id, title, content, username, date, onEdit, onDelete }) => {
    return (
        <div className="blog-card">
            <h3>{title}</h3>
            <p>{content}</p>
            <small>By {username} on {new Date(date).toLocaleDateString()}</small>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default BlogCard;