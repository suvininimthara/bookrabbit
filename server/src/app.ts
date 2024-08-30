import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import UserRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import  blogRoutes from "./routes/blogRoutes";
import mongoose from "mongoose";
import morgan from "morgan";
import createHttpError, {isHttpError} from "http-errors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import cors from 'cors';

const app = express();

// Middleware to log requests
app.use(morgan("dev"));

// Middleware to parse JSON bodies
app.use(express.json());

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000, // 1 hour
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' // Use secure cookies in production
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }),
}));


// Middleware to enable CORS
app.use(cors());

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/blogs', blogRoutes);

// Simple logger middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404, "Route not found"));
});

// Error-handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        errorMessage = error.message;
        statusCode = error.status;
    }

    res.status(statusCode).json({ error: errorMessage });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });

// Fallback route for 404
app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Route not found" });
});

export default app;