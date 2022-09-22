import dotEnv from 'dotenv';
dotEnv.config();

import router from './routes/index.js';

import express from 'express';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(router);

app.listen(process.env.PORT, (e) => {
    if(e){
        return console.log(`Error on connecting server !`);
    }
    console.log('Server started !');
});