import pool from '../config/db/connectdb.js';


const getAll = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books ORDER BY id ASC;');
        res.status(200).send(result.rows);
    } catch (e) {
        console.log(e);
    }
};

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query('SELECT * FROM books WHERE id=$1;', [id]);
        res.status(200).send(result.rows);
    } catch (e) {
        console.log(e)
    }
};

const create = async (req, res) => {
    try {
        const { title, author } = req.body;
        const result = await pool.query('INSERT INTO books (title, author) VALUES ( $1, $2);', [title, author]);
        res.status(201).send(`Book added`);
    } catch (e) {
        console.log(e);
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, author } = req.body;
        const result = await pool.query('UPDATE books SET title=$1, author=$2 WHERE id=$3;', [title, author, id]);
        console.log(result);
        res.status(200).send(`User modified with id: ${id}`);
    } catch (e) {
        console.log(e);
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query('DELETE FROM books WHERE id=$1;', [id]);
        console.log(result);
        res.status(200).send(`User deleted with ID: ${id}`)
    } catch (e) {
        console.log(e);
    }
};

export default {
    getAll,
    getById,
    create,
    update,
    remove 
}