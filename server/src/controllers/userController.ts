/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import User from '../models/user';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticateUser = req.session.userId;

    try {
        if (!authenticateUser) {
            throw createHttpError(401, 'User not authenticated');
        }

        const user = await User.findById(authenticateUser).exec();

        if (!user) {
            throw createHttpError(404, 'User not found');
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
};

interface SignUpBody {
    username?: string,
    email?: string,
    password?: string,
}


export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        if (!username || !email || !passwordRaw) {
            throw createHttpError(400, "Parameters missing");
        }

        const existingUsername = await User.findOne({ username: username }).exec();

        if (existingUsername) {
            throw createHttpError(409, "Username already taken. Please choose a different one or log in instead.");
        }

        const existingEmail = await User.findOne({ email: email }).exec();

        if (existingEmail) {
            throw createHttpError(409, "A user with this email address already exists. Please log in instead.");
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const newUser = await User.create({
            username: username,
            email: email,
            password: passwordHashed,
        });

        req.session.userId = newUser._id as mongoose.Types.ObjectId;

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

interface LoginBody {
    username?: string,
    password?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) {
            throw createHttpError(400, "Parameters missing");
        }

        const user = await User.findOne({ username: username }).select("+password +email").exec();

        if (!user) {
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }

        req.session.userId = user._id as mongoose.Types.ObjectId;
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};


export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    });
};


export const createUser = async (req: Request, res: Response) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  export const updateUser: RequestHandler = async (req, res, next) => {
    const userId = req.session.userId;
    const { firstName, lastName, phoneNumber, address, favoriteBook, favoriteGenres } = req.body;

    try {
        if (!userId) {
            throw createHttpError(401, 'User not authenticated');
        }

        const user = await User.findById(userId).exec();

        if (!user) {
            throw createHttpError(404, 'User not found');
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.phoneNumber = phoneNumber;
        user.address = address;
        user.favoriteBook = favoriteBook;
        user.favoriteGenres = favoriteGenres;

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            res.json({ message: 'User deleted' });
        } else {
            throw createHttpError(404, 'User not found');
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};