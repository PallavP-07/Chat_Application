import chalk from 'chalk'
import  express from 'express';
import userRouter from './src/routes/user-router.js';
import chatRoutre from './src/routes/chat-router.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {connectDB} from './src/config/dbConnection.js'
dotenv.config({
    path:'./.env',
});

const app =express()

const port = process.env.PORT;
connectDB()
app.use(express.json());
app.use(cookieParser());
app.use('/user',userRouter);
app.use('/chat',chatRoutre);
app.get ("/",(req,res)=>{
res.send("Backend Server Running Fine.👌");
})

app.listen (port,()=>{
    console.log(chalk.blue(`backend server is running on: ${port}`));
})
