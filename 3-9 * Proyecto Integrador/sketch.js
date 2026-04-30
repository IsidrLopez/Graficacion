// CAPÍTULO 9 Proyecto Integrador
// Variables de control
let rotX = 0;
let rotY = 0;
let escala = 1;
let posX = 0;
let posY = 0;
let posZ = 0;

function setup() {
  createCanvas(800, 500, WEBGL);
}

function draw() {
  background(30);
  orbitControl();

  // Objeto principal: Cubo con transformaciones completas
  push();
  translate(posX, posY, posZ);
  rotateX(rotX);
  rotateY(rotY + frameCount * 0.01);
  scale(escala);
  fill(255, 100, 100);
  noStroke();
  box(100);
  pop();

  // Esfera (derecha)
  push();
  translate(220, 0, 0);
  fill(100, 180, 255);
  noStroke();
  sphere(60);
  pop();

  // Cono (izquierda)
  push();
  translate(-220, 0, 0);
  fill(100, 220, 120);
  noStroke();
  rotateX(frameCount * 0.015);
  cone(50, 120);
  pop();

  // HUD de controles
  push();
  translate(-380, -220, 0);
  fill(255);
  noStroke();
  textSize(12);
  text("A/D - Mover X   W/S - Mover Z", 0, 0);
  text("Q/E - Escalar   Flechas - Rotar", 0, 18);
  text("Mouse - Orbitar camara", 0, 36);
  pop();
}

function keyPressed() {
  if (key === 'A') posX -= 20;
  if (key === 'D') posX += 20;
  if (key === 'W') posZ += 20;
  if (key === 'S') posZ -= 20;
  if (key === 'Q') escala += 0.1;
  if (key === 'E') escala = max(0.1, escala - 0.1);
  if (keyCode === UP_ARROW)    rotX -= 0.1;
  if (keyCode === DOWN_ARROW)  rotX += 0.1;
  if (keyCode === LEFT_ARROW)  rotY -= 0.1;
  if (keyCode === RIGHT_ARROW) rotY += 0.1;
}
