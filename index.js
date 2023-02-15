import express from 'express';
import http from 'http';
import morgan from 'morgan';
import cors from 'cors';
import { Server as socketServer } from 'socket.io';
import { PORT as port } from './config.js';

const app = express();
const server = http.createServer(app);
const io = new socketServer(server, {
  cors: {
    origin: 'http://127.0.0.1:5173',
  }
});

app.use(cors());
app.use(morgan('dev'));

io.on('connection', (socket) => {
  //console.log(socket.id);
  socket.on('message', (data) => {
    if (data.length > 0) {
      socket.broadcast.emit('message', {
        body: data,
        from: socket.id
      });
    }
  })
})

server.listen(port);
console.log('Server started on port ', port);