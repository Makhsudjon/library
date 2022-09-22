import { user } from '../controllers/index.js';
import express from 'express';

const router = express.Router();

router.get('/', user.getAll);
router.get('/:id', user.getById);
router.post('/', user.create);
router.put('/:id', user.update);
router.delete('/:id', user.remove);

//User books routes
router.get('/:id/books', user.getAllBooks);
router.put('/:id/books', user.addBook);
router.post('/:id/books', user.removeBook);


export default router;