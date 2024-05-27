import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/userRoutes.js';
import sellerRoutes from './routes/sellerRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import authenticateJWT from './middleware/authMiddleware.js';


const app = express()
const prisma = new PrismaClient()

app.use(cors()) // Enable all CORS requests
app.use(morgan('dev')); // Log requests to the console
app.use(bodyParser.json()); // Parse JSON bodies

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/api/users', userRoutes)
app.use('/api/sellers', authenticateJWT, sellerRoutes)
app.use('/api/books', bookRoutes)



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});