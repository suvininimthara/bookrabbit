import { Schema, model, Document, InferSchemaType } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password: string; 
    firstName: string;
    lastName: string;
    birthday: Date;
    phoneNumber: string;
    address: string;
    favoriteBook: string;
    favoriteGenres: string[];
    ratedBooks: { bookId: Schema.Types.ObjectId, rating: number }[];
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, select: false },
    password: { type: String, required: true, select: false },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    birthday: { type: Date },
    phoneNumber: { type: String, default: '' },
    address: { type: String, default: '' },
    favoriteBook: { type: String, default: '' },
    favoriteGenres: { type: [String], default: [] }, 
    ratedBooks: [
        {
            bookId: { type: Schema.Types.ObjectId, ref: 'Book' },
            rating: { type: Number, min: 1, max: 5 }
        }
    ]
}, { timestamps: true });

type User = InferSchemaType<typeof userSchema>;
const User = model<IUser>('User', userSchema);
export default User;