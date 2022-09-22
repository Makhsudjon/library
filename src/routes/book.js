import { book } from '../controllers/index.js';
import express from 'express';

const router = express.Router();

router.get('/', book.getAll);
router.get('/:id', book.getById);
router.post('/', book.create);
router.put('/:id', book.update);
router.delete('/:id', book.remove);


export default router;