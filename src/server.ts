import express from "express";

import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv";
import forumsRouter from './forums.js'
import { defaultErrorHandler } from "./utils.js";
import { ErrorRequestHandler } from 'express';

dotenv.config();
console.log(dotenv);


const app = express();
app.use(cors());
app.use(express.json()); // controla els erq i els res en json
app.use(morgan("dev"))

app.use('/forums',forumsRouter);


app.get('/hola/:n',async(req,res,next)=>{
    const {n}=req.params
    if(n==="42"){
        res.status(200).json({hola:true});
        
    }else{
        next("error 42")
    }
} )

app.use(((err,req,res,next)=>{
    console.error("soc un intermediari",err);
    next(err);
}) as ErrorRequestHandler);

app.use(defaultErrorHandler);
const { SERVER_PORT } = process.env
app.listen(SERVER_PORT, () => {
    console.log(`lisenting on: ${SERVER_PORT}`);

});
