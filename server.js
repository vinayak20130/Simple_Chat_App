const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let userCount = 0;  // To give a unique name to each user

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  userCount++;
  const userName = "User " + userCount;  // Assign a name to the user
  
  console.log(`${userName} connected`);

  socket.on('disconnect', () => {
    console.log(`${userName} disconnected`);
  });

  socket.on('chat message', (msg) => {
    const messageObj = {
      sender: userName,
      content: msg
    };
    io.emit('chat message', messageObj);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
