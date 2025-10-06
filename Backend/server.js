import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRouter from './route/userRoutes.js'
import imageRouter from './route/imageRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();
connectDB();

app.get('/', (req, res) => {
    res.send("API Working!")
})

//routes
app.use('/api/auth', userRouter)
app.use('/api/image', imageRouter)

const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`Server running at localhost ${PORT}`)
})