let x = 50, y = 120;
let vx = 2, vy = 1;
let w = 80, h = 50;

function setup() {
  createCanvas(600, 300);
}

function draw() {
  background(240);

  // Mover el rectángulo
  x += vx;
  y += vy;

  // Rebotar en bordes horizontales
  if (x < 0 || x + w > width) {
    vx *= -1;
  }

  // Rebotar en bordes verticales
  if (y < 0 || y + h > height) {
    vy *= -1;
  }

  rect(x, y, w, h);
}