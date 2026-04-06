import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRouter from './route/userRoutes.js'
import imageRouter from './route/imageRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["https://imagify-pi-opal.vercel.app", "http://localhost:5173"]
}));

app.get('/', (req, res) => {
    res.send("API Working!")
})

//routes
app.use('/api/auth', userRouter)
app.use('/api/image', imageRouter)

const PORT = 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, ()=>{
            console.log(`Server running at localhost ${PORT}`)
        })
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
}

startServer();
