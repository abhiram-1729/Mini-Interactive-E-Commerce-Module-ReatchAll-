import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error middleware
app.use((err, req, res, next) => {
    console.error(`ERROR at ${req.method} ${req.path}:`, err.message);

    // Multer file validation errors should return 400
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    if (err.status === 400 || err.code === 'LIMIT_FILE_SIZE' || err.code === 'LIMIT_UNEXPECTED_FILE') {
        statusCode = 400;
    }

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
