const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');


// Creating an Express application object.
const app = express();

//  Creates a raw https server. Incoming request are passed to app object.
const server = createServer(app);

//Fetch for new WebSocket connection and manages all the clients connected in real- time.
const io = new Server(server);


// .get() is a method of Express object which checks for GET method. Takes two argument: PATH and handler
// req: is incoming request and res is our response
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
