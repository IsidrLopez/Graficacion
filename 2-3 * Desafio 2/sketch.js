// CAPÍTULO 3 — Desafío 2: Pivote móvil
// El objeto rota siempre desde el punto donde hiciste clic
 
let theta;      // ángulo acumulado
let omega;      // velocidad angular (rad/frame)
let pivX, pivY; // posición del pivote
 
function setup() {
  createCanvas(600, 400);
  theta = 0;
  omega = 0.03;
  pivX  = width  / 2;
  pivY  = height / 2;
}
 
function draw() {
  background(245);
 
  // Rotación Continua
  theta += omega;
 
  // Dibujar Pivote
  stroke(220, 80, 80);
  strokeWeight(1);
  noFill();
  circle(pivX, pivY, 14);
  line(pivX - 10, pivY, pivX + 10, pivY);
  line(pivX, pivY - 10, pivX, pivY + 10);
 
  // Rotar Desde El Pivote
  push();
    translate(pivX, pivY);
    rotate(theta);
    dibujarMolino();
  pop();
 
  // HUD
  noStroke();
  fill(40);
  textSize(12);
  textFont('monospace');
  text(`θ = (theta % TWO_PI, 1, 3)} rad`, 10, 20);
  text(`ω = (omega, 1, 3)} rad/frame`, 10, 36);
  text(`pivote = ({round(pivX)}, {round(pivY)})`, 10, 52);
  text('clic: mover pivote  |  ↑↓ velocidad  |  R: reset', 10, height - 10);
}
 
function dibujarMolino() {
  // 4 aspas separadas 90° (PI/2) cada una
  for (let i = 0; i < 4; i++) {
    push();
      rotate(i * HALF_PI); // cada aspa a 90° de la anterior
      dibujarAspa();
    pop();
  }
 
  // Centro del molino
  fill(80);
  noStroke();
  circle(0, 0, 14);
}
 
function dibujarAspa() {
  // Aspa apuntando hacia arriba en coordenadas locales
  stroke(100, 160, 80);
  strokeWeight(2);
  fill(100, 160, 80, 60);
  rectMode(CENTER);
  rect(0, -35, 18, 50, 4);
}
 
function mousePressed() {
  pivX = mouseX;
  pivY = mouseY;
}
 
function keyPressed() {
  if (keyCode === UP_ARROW)   omega += 0.01;
  if (keyCode === DOWN_ARROW) omega -= 0.01;
  if (key === 'r' || key === 'R') {
    theta = 0;
    pivX  = width  / 2;
    pivY  = height / 2;
  }
}