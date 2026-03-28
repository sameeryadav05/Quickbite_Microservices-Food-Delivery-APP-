import express, { Errback } from 'express';
import { Request,Response,NextFunction, ErrorRequestHandler } from "express"
import dotenv from 'dotenv'
import ConnectDatabase from './Config/Db.js';
import authRouter from './Routes/auth.js';
import ExpressError from './Utils/ExpressError.js';
import cors from 'cors';
import compression from 'compression'
import morgan from 'morgan'
dotenv.config();

const app = express();

const PORT:number= Number(process.env.PORT) || 5001;
const DB_URL:string= process.env.MONGODB_URL as string;

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','PATCH','DELETE'],
    credentials:true
}))
app.use(morgan('dev'))
app.use(compression())


// Routes 
app.use('/api/auth',authRouter)

//404 handler
app.use('/',(req:Request,res:Response,next:NextFunction)=>{
    next(new ExpressError(404,'Resource Not Found !'));
})
//global Error handler
const globalErrorHandler:ErrorRequestHandler  = (err,req,res,next)=>{
    const status =  err.status || 500;
    const message = err.message || "Internal Server Error !"

    res.status(status).json({sucess:false,message})
}
app.use(globalErrorHandler)

ConnectDatabase(DB_URL,"QuickBite")
.then(()=>{
    app.listen(PORT,()=>{
    console.log(`Auth Service Running On Port : ${PORT}`)}) 
})





