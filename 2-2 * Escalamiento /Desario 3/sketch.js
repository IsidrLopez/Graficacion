let tx = 300, ty = 150;
let speed = 3;

function setup() {
  createCanvas(600, 400);
  rectMode(CENTER);
}

function draw() {
  background(240);

  // Controles con teclas WASD
  if (keyIsDown(65)) tx -= speed; // A = izquierda
  if (keyIsDown(68)) tx += speed; // D = derecha
  if (keyIsDown(87)) ty -= speed; // W = arriba
  if (keyIsDown(83)) ty += speed; // S = abajo

  // translate mueve TODO el personaje junto
  push();
  translate(tx, ty);
  dibujarPersonaje();
  pop();

  // Instrucciones en pantalla
  fill(0);
  noStroke();
  textSize(13);
  text("Mueve con WASD", 10, 20);
}

function dibujarPersonaje() {
  // Cuerpo
  fill(60, 120, 220);
  noStroke();
  rect(0, 10, 50, 60);

  // Cabeza
  fill(255, 200, 150);
  circle(0, -30, 50);

  // Ojo izquierdo
  fill(0);
  circle(-10, -32, 8);

  // Ojo derecho
  fill(0);
  circle(10, -32, 8);

  // Boca
  fill(200, 80, 80);
  rect(0, -18, 20, 6);
}