import express, { response } from "express"
import { PORT, mongoBDURL } from './config.js'
import mongoose from 'mongoose'
import { router as booksRoute } from './routes/booksRoute.js';
import cors from 'cors';

const app = express();


//Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );


// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
    console.log(req)
    // res.send('hello world')
    return res.status(234).send('Welcome!')
})


app.use('/books',booksRoute);


mongoose
    .connect(mongoBDURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`)
        })

    })
    .catch((error) => {
        console.log(error);
    })

