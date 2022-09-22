import pool from '../config/db/connectdb.js';


const getAll = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users ORDER BY id ASC;');
        res.status(200).send(result.rows);
    } catch (e) {
        console.log(e);
    }
};

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query('SELECT * FROM users WHERE id=$1;', [id]);
        res.status(200).send(result.rows);
    } catch (e) {
        console.log(e)
    }
};

const create = async (req, res) => {
    try {
        const currentTime = new Date();
        const { firstName, lastName, age } = req.body;
        const result = await pool.query('INSERT INTO users (firstName, lastName, age, updatedAt) VALUES ( $1, $2, $3, $4);', [firstName, lastName, age, currentTime]);
        res.status(201).send(`User added`);
    } catch (e) {
        console.log(e);
    }
};

const update = async (req, res) => {
    try {
        const currentTime = new Date();
        const id = req.params.id;
        const { firstName, lastName, age } = req.body;
        const result = await pool.query('UPDATE users SET firstName=$1, lastName=$2, age=$3, updatedAt=$4 WHERE id=$5;', [firstName, lastName, age,currentTime, id]);
        console.log(result);
        res.status(200).send(`User modified with id: ${id}`);
    } catch (e) {
        console.log(e);
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query('DELETE FROM users WHERE id=$1;', [id]);
        console.log(result);
        res.status(200).send(`User deleted with ID: ${id}`)
    } catch (e) {
        console.log(e);
    }
};

//User read books

const getAllBooks = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await pool.query('SELECT * FROM users WHERE id=$1;', [id]);
        const books = await pool.query('SELECT b.id, b.title, b.author FROM books AS b JOIN user_read_books AS ub ON ub.book_id=b.id WHERE ub.user_id=$1;', [id]);
        const result = {
            ...user.rows[0],
            'books': books.rows
        }
        res.status(200).send(result);
    } catch (e) {
        console.log(e);
    }
};

const addBook = async (req, res) => {
    try {
        const id = req.params.id;
        const bookId = req.body.bookId;
        console.log(`User id: ${id}, book id: ${bookId}`);
        const result = await pool.query('INSERT INTO user_read_books (user_id, book_id) VALUES ($1, $2);', [id, bookId]);
        res.status(200).send(result.rows);
    } catch (e) {
        console.log(e);
    }
};

const removeBook = async (req, res) => {
    try {
        const id = req.params.id;
        const bookId = req.body.bookId;
        const result = await pool.query('DELETE FROM user_read_books WHERE user_id=$1 AND book_id=$2;', [id, bookId]);
        console.log(result);
        res.status(200).send(`Book with id: ${bookId} deleted from user id: ${id}`);
    } catch (e) {
        console.log(e);
    }
};


export default {
    getAll,
    getById,
    create,
    update,
    remove,

    //User book controllers
    getAllBooks,
    addBook,
    removeBook
}