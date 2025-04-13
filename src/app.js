import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import authRoutes from './routes/user.routes.js';
import postRoutes from './routes/posts.routes.js';
import commentRoutes from './routes/comments.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// Routes
app.use('/ping', (req, res) => {
    res.send('pong');
});
app.use('/api/user', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Root route
app.get('/', (req, res) => res.send('API is running'));
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    app
}
