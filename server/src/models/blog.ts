import { Schema, model, Document } from 'mongoose';

interface IBlog extends Document {
    title: string;
    content: string;
    name: string;
    date: Date;
    
}

const BlogSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

const Blog = model<IBlog>('Blog', BlogSchema);
export default Blog;
