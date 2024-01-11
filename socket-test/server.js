const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // CORS 미들웨어 적용

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // React 앱의 URL을 허용
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
    console.log('New client connected');

	process.stdin.on('data', (data) => {
        const message = data.toString().trim();
		console.log(`"send message ${message}`);
        socket.emit('serverMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});



// 5초마다 모든 클라이언트에게 현재 시간을 전송
setInterval(() => {
    io.emit('time', { time: new Date().toTimeString() });
}, 1000);

server.listen(4000, () => {
    console.log('Listening on port 4000');
});
