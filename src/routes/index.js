import userRouter from './user.js';
import bookRouter from './book.js';
import express from 'express';


const router = express.Router();


router.use('/users', userRouter);
router.use('/books', bookRouter);




export default router;