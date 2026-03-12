// CAPÍTULO 3 — Desafío 1: Rotación controlada por mouse
// θ = map(mouseX, 0, width, 0, TWO_PI)
let theta; // ángulo de rotación en radianes
 
function setup() {
  createCanvas(600, 400);
  theta = 0;
}
 
function draw() {
  background(245);
  theta = map(mouseX, 0, width, 0, TWO_PI);
 
  // Aplicar Rotacion con pivote
  push();
    translate(width / 2, height / 2);
    rotate(theta);
    dibujarFlecha();
  pop();
 
  // Mostrar Arco del Angulo
  noFill();
  stroke(200, 80, 80, 120);
  strokeWeight(1);
  arc(width/2, height/2, 80, 80, -HALF_PI, -HALF_PI + theta);
 
  // HUD
  noStroke();
  fill(40);
  textSize(12);
  textFont('monospace');
  text(`θ = {nf(theta, 1, 3)} rad`, 10, 20);
  text(`θ = {nf(degrees(theta), 1, 1)}°`, 10, 36);
  text('mueve el mouse horizontalmente para rotar', 10, height - 10);
}
 
function dibujarFlecha() {
  // Flecha apuntando hacia arriba en coordenadas locales
  stroke(60, 130, 220);
  strokeWeight(2);
  fill(60, 130, 220, 50);
 
  // Cuerpo de la flecha
  rectMode(CENTER);
  rect(0, 20, 20, 80);
 
  // Punta de la flecha
  fill(60, 130, 220, 100);
  triangle(-22, -20, 22, -20, 0, -70);
 
  // Punto en el pivote
  fill(220, 80, 80);
  noStroke();
  circle(0, 0, 8);
}