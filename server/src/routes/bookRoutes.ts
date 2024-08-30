import { Router } from 'express';
import { createBook, getAllBooks, getBookById, updateBook, deleteBook, getRecentBooks, rateBook } from '../controllers/bookController';

const router = Router();

router.post('/', createBook);
router.get('/recent-books', getAllBooks);
router.get('/recent', getRecentBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);
router.post('/rate/:id', rateBook);

export default router;
