const canvas = document.getElementById('canv');
const ctx = canvas.getContext('2d');

function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

setCanvasSize();


const cols = Math.floor(canvas.width / 20) + 1;
const ypos = Array(cols).fill(0);

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);

function matrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#0f0';
  const fontSize = Math.min(canvas.width / 50, 15);
  ctx.font = fontSize + 'pt monospace';

  ypos.forEach((y, ind) => {
    const text = String.fromCharCode(Math.random() * 128);
    const x = ind * 20;
    ctx.fillText(text, x, y);
    if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
    else ypos[ind] = y + fontSize;
  });
}

setInterval(matrix, 50);

window.addEventListener('resize', () => {
  setCanvasSize();
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  cols = Math.floor(canvas.width / 20) + 1;
  ypos.fill(0);
});