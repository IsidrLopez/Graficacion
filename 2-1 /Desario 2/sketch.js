let x = 300, y = 150;
let alpha = 0.05; // Factor de suavizado (0 < α < 1)

function setup() {
  createCanvas(600, 300);
  rectMode(CENTER);
}

function draw() {
  background(240);

  // Interpolación: x se acerca poco a poco a mouseX
  // Ecuación: x ← x + α(mouseX − x)
  x = x + alpha * (mouseX - x);
  y = y + alpha * (mouseY - y);

  fill(80, 120, 200);
  rect(x, y, 80, 50);
}