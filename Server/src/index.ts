import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/index';
const app = express();

app.use(cors({credentials: true,origin:"http://localhost:5173"}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, ()=>{
    console.log('Running')
})

const MONGO_URL = 'mongodb+srv://0abdullahansari:dgbwatnomd@to-do.wpi1wer.mongodb.net/?retryWrites=true&w=majority'

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error)=> console.log(error));

app.use('/', router());



