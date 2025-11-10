const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const { DrawingState } = require('./drawing-state');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

const rooms = {}; // { roomId: DrawingState }

app.use(express.static(path.join(__dirname, '../client')));

io.on('connection', socket => {
  let currentRoom = null;

  socket.on('join-room', roomId => {
    if (!rooms[roomId]) rooms[roomId] = new DrawingState();
    currentRoom = roomId;
    socket.join(roomId);
    socket.emit('init-canvas', rooms[roomId].getState());
    io.to(roomId).emit('user-joined', socket.id);
  });

  socket.on('draw', data => {
    if (!currentRoom) return;
    rooms[currentRoom].addStroke(data);
    socket.to(currentRoom).emit('draw', data);
  });

  socket.on('undo', () => {
    if (!currentRoom) return;
    rooms[currentRoom].undo();
    io.to(currentRoom).emit('sync-canvas', rooms[currentRoom].getState());
  });

  socket.on('redo', () => {
    if (!currentRoom) return;
    rooms[currentRoom].redo();
    io.to(currentRoom).emit('sync-canvas', rooms[currentRoom].getState());
  });

  socket.on('disconnect', () => {
    if (currentRoom) io.to(currentRoom).emit('user-left', socket.id);
  });
});

server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
