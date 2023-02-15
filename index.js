import express from 'express';
import http from 'http';
import morgan from 'morgan';
import cors from 'cors';
import {Server as socketServer } from 'socket.io';
import { PORT as port } from './config.js';

const app = express();
const server = http.createServer(app);
const io = new socketServer(server);

app.use(cors());
app.use(morgan('dev'));
app.listen(port);

console.log('Server started on port ', port);