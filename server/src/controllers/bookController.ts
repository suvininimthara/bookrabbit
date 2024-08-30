/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import Book from '../models/book';


export const createBook = async (req: Request, res: Response) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getBookById = async (req: Request, res: Response) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json(book);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching book details', error: error.message });
    }
};


export const updateBook = async (req: Request, res: Response) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteBook = async (req: Request, res: Response) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (book) {
            res.json({ message: 'Book deleted' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getRecentBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(5); 
        res.json(books);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const rateBook = async (req: Request, res: Response) => {
    const { id } = req.params; // Book ID
    const { rating } = req.body; // Rating value

    console.log('Received request to rate book:', id, 'with rating:', rating);

    try {
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Invalid rating value' });
        }

        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Update the book's rating logic here
        const totalRatings = book.reviews.length;
        const newRating = (book.ratings * totalRatings + rating) / (totalRatings + 1);
        book.ratings = newRating;
        book.reviews.push(rating); // Add the new rating to the reviews array
        await book.save();

        res.status(200).json(book);
    } catch (error: any) {
        console.error('Error rating book:', error);
        res.status(500).json({ message: 'Failed to rate book' });
    }
};