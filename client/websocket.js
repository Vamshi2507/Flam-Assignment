const socket = io();
socket.emit('join-room', 'default-room');

socket.on('draw', data => drawStroke(data));
socket.on('sync-canvas', history => redrawCanvas(history));
socket.on('init-canvas', history => redrawCanvas(history));
