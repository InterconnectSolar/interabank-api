import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({path:'../.env'});
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log("Server running on PORT: " + PORT);
})