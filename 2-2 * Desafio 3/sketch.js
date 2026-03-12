// CAPÍTULO 2 — Desafío 3: Orden de transformaciones
 
let s;      // factor de escala
let angle;  // ángulo de rotación (rad)
let modo;   // 0 = T→S  /  1 = S→T
 
function setup() {
  createCanvas(700, 400);
  s     = 1.5;
  angle = PI / 6;  // 30°
  modo  = 0;
}
 
function draw() {
  background(245);
 
  // Lado Izquierdo: translate → scale
  push();
    translate(175, height / 2);  // mover al centro izquierdo
 
    // Ejes locales de referencia
    dibujarEjes();
 
    // T primero, luego S
    translate(60, -40);  // traslación
    scale(s);            // escala DESPUÉS de trasladar
    dibujarForma(color(60, 130, 220));
  pop();
 
  // Lado Derecho scale → translate 
  push();
    translate(525, height / 2);  // mover al centro derecho
 
    dibujarEjes();
 
    // S primero, luego T
    scale(s);            // escala ANTES de trasladar
    translate(60, -40);  // traslación ESCALADA también
    dibujarForma(color(220, 100, 60));
  pop();
 
  // Etiquetas
  noStroke();
  fill(60, 130, 220);
  textSize(13);
  textFont('monospace');
  textAlign(CENTER);
  text('translate → scale', 175, 30);
 
  fill(220, 100, 60);
  text('scale → translate', 525, 30);
 
  fill(100);
  textSize(11);
  text('El offset de traslación\nNO se escala', 175, height - 40);
  text('El offset de traslación\nSÍ se escala', 525, height - 40);
 
  // HUD 
  textAlign(LEFT);
  fill(40);
  textSize(12);
  text(`s = {nf(s,1,2)}`, 10, 20);
  text('↑↓ escala', 10, 36);
  text('El orden de las transformaciones IMPORTA: AB ≠ BA', 10, height - 10);
 
  // Separador central
  stroke(200);
  strokeWeight(1);
  line(width/2, 50, width/2, height - 30);
}
 
function dibujarForma(c) {
  rectMode(CENTER);
  stroke(c);
  strokeWeight(2);
  fill(red(c), green(c), blue(c), 50);
  rect(0, 0, 60, 40, 5);
 
  // Marcador de origen local
  noStroke();
  fill(c);
  circle(0, 0, 7);
}
 
function dibujarEjes() {
  // Ejes del sistema local antes de transformar
  stroke(180);
  strokeWeight(1);
  line(-80, 0, 80, 0);   // eje X
  line(0, -80, 0, 80);   // eje Y
 
  noStroke();
  fill(160);
  textSize(10);
  textFont('monospace');
  textAlign(LEFT);
  text('(0,0)', 4, -4);
}
 
function keyPressed() {
  if (keyCode === UP_ARROW)   s = min(s + 0.1, 4);
  if (keyCode === DOWN_ARROW) s = max(s - 0.1, 0.2);
}