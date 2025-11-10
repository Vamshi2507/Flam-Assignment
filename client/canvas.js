const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 40;
canvas.height = window.innerHeight - 140;

let drawing = false;
let color = '#000';
let size = 3;
let strokes = [];

document.getElementById('colorPicker').addEventListener('input', e => color = e.target.value);
document.getElementById('brushSize').addEventListener('input', e => size = e.target.value);

canvas.addEventListener('mousedown', e => {
  drawing = true;
  strokes.push({ points: [], color, size });
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
  socket.emit('draw', strokes[strokes.length - 1]);
});

canvas.addEventListener('mousemove', e => {
  if (!drawing) return;
  const x = e.offsetX, y = e.offsetY;
  const stroke = strokes[strokes.length - 1];
  stroke.points.push({ x, y });
  drawStroke(stroke);
});

function drawStroke(stroke) {
  ctx.strokeStyle = stroke.color;
  ctx.lineWidth = stroke.size;
  ctx.lineCap = 'round';
  ctx.beginPath();
  const pts = stroke.points;
  for (let i = 0; i < pts.length - 1; i++) {
    ctx.moveTo(pts[i].x, pts[i].y);
    ctx.lineTo(pts[i + 1].x, pts[i + 1].y);
  }
  ctx.stroke();
}

function redrawCanvas(history) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  history.forEach(drawStroke);
}

window.drawStroke = drawStroke;
window.redrawCanvas = redrawCanvas;
