import express from 'express';
import { getAllBooks, getBookDetails } from '../controllers/bookController.js';

const router = express.Router();


router.get('/', getAllBooks);
router.get('/:id', getBookDetails);


export default router;