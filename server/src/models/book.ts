import { Schema, model, Document } from 'mongoose';

interface IBook extends Document {
    title: string;
    author: string;
    genre: string;
    ratings: number;
    averageRating: number;
    description: string;
    imageUrl: string;
    ratingsCount: number;
    reviews: number[];
    year: number;
}

const bookSchema = new Schema<IBook>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    ratings: [
        {
            rating: { type: Number, min: 1, max: 5 }
        }
    ],
    ratingsCount: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true },
    reviews: [Number]
}, { timestamps: true });

bookSchema.methods.updateAverageRating = function () {
    if (this.ratings.length > 0) {
        const total = this.ratings.reduce((acc: number, curr: { rating: number }) => acc + curr.rating, 0);
        this.averageRating = total / this.ratings.length;
    } else {
        this.averageRating = 0;
    }
    return this.averageRating;
};

const Book = model<IBook>('Book', bookSchema);
export default Book;
