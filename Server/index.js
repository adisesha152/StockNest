import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { authRoutes } from './Routes/authRoutes.js';
const app = express()

app.use(cors({
    origin : ['http://localhost:5173'],
    methods : ['GET','POST','PUT','DELETE'],
    credentials : true
}))

app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRoutes);
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})