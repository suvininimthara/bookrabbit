/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import Blog from '../models/blog';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

export const createBlog = async (req: Request, res: Response) => {
    try {
        const blog = new Blog(req.body);
        await blog.save();
        res.status(201).json(blog);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs); 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blogs' });
    }
};

export const getBlogById = async (req: Request, res: Response) => {
    const blogId = req.params.id;
    try {
        if (!mongoose.isValidObjectId(blogId)) {
            throw createHttpError(400, 'Invalid blog ID');
        }
        const blog = await Blog.findById(blogId);
        if (blog) {
            res.json(blog);
        } else {
            throw createHttpError(404, 'Blog not found');
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBlog = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (blog) {
            res.json({ message: 'Blog deleted' });
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getRecentBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.find().sort({ date: -1 }).limit(6);
        res.json(blogs);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

