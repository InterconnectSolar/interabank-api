import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import routes from './route';

dotenv.config({path:'../.env'});
const app = express();

app.use(express.json());

const corsOptions = {
    origin: 'https://interabank.vercel.app',
    optionsSuccessStatus: 200
};


app.use(cors(corsOptions));
app.use(routes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log("Server running on PORT: " + PORT);
})