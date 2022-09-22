import dotEnv from 'dotenv';
dotEnv.config();

import posgres from "pg";
const { Pool } = posgres;
const pool = new Pool({
    user: process.env.DB_USER_NAME,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

export default pool;