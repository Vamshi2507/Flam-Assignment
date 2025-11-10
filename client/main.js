document.getElementById('undoBtn').addEventListener('click', () => socket.emit('undo'));
document.getElementById('redoBtn').addEventListener('click', () => socket.emit('redo'));
