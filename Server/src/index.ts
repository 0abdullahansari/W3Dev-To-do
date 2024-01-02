import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/index';
import dotenv from 'dotenv';
const app = express();
dotenv.config();

app.use(cors({credentials: true,origin:process.env.ORIGIN}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(process.env.PORT, ()=>{
    console.log('Running')
})

const MONGO_URL = process.env.DB_URL;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error)=> console.log(error));

app.use('/', router());



