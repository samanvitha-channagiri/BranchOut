import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import authRoutes from './routes/auth.route.js'
dotenv.config()
import { connectDB } from './config/db.config.js';


const app=express()
connectDB()

app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoutes)
// app.use('/api/users',userRoutes);
// app.use('/api/links',linkRoutes);
// app.get("/api/notes",(req,res)=>{
//     res.send(" You got 5 notes ");
// })

const PORT=process.env.PORT||5003;
app.listen(5003,()=>{
    console.log(`Server running in mode on port ${PORT}`);
    
})