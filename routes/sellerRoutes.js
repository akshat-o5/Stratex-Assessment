import express from 'express';
import { uploadBooksCSV, getBooks, editBook, deleteBook } from '../controllers/sellerController.js';
import authenticateJWT from '../middleware/authMiddleware.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: '/uploads' });

router.use(authenticateJWT);

router.post('/upload', upload.single('file'), authenticateJWT, uploadBooksCSV);
router.get('/books', authenticateJWT, getBooks);
router.put('/book/:id', authenticateJWT, editBook);
router.delete('/book/:id', authenticateJWT, deleteBook);

export default router;
