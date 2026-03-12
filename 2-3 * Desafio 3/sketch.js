// CAPÍTULO 3 — Desafío 3: Composición R(θ)·S(s) ≠ S(s)·R(θ)
// Demuestra que rotar y escalar en distinto orden da resultados

let theta; // ángulo de rotación
let sx, sy; // escalamiento no uniforme
 
function setup() {
  createCanvas(720, 400);
  theta = 0;
  sx    = 2.0;  // escala en X mayor que en Y
  sy    = 0.8;  // para que la diferencia sea visible
}
 
function draw() {
  background(245);
 
  // Rotar Continuamente
  theta += 0.02;
 
  // Lado Izquierdo: rotate → scale 
  push();        
    translate(180, height / 2);
    rotate(theta);      // primero rotar
    scale(sx, sy);      // luego escalar
    dibujarForma(color(60, 130, 220));
  pop();
 
  //  Lado Derecho: scale → rotate
  push();
    translate(540, height / 2);
    scale(sx, sy);      // primero escalar
    rotate(theta);      // luego rotar
    dibujarForma(color(220, 100, 60));
  pop();
 
  // ── Etiquetas
  noStroke();
  textFont('monospace');
  textAlign(CENTER);
 
  fill(60, 130, 220);
  textSize(13);
  text('rotate → scale', 180, 30);
  fill(100);
  textSize(11);
  text('R(θ) · S(sx,sy)', 180, 48);
 
  fill(220, 100, 60);
  textSize(13);
  text('scale → rotate', 540, 30);
  fill(100);
  textSize(11);
  text('S(sx,sy) · R(θ)', 540, 48);
 
  // 
  HUD
  textAlign(LEFT);
  fill(40);
  textSize(12);
  text(`θ = (theta % TWO_PI, 1, 2)} rad`, 10, height - 36);
  text(`sx=sx  sy=sy`, 10, height - 20);
 
  // Separador
  stroke(200);
  strokeWeight(1);
  line(width/2, 60, width/2, height - 10);
 
  // Nota al pie
  noStroke();
  fill(140);
  textSize(10);
  textAlign(CENTER);
  text('Con escala uniforme (sx=sy) ambos son iguales. La diferencia aparece cuando sx ≠ sy.', width/2, height - 10);
}
 
function dibujarForma(c) {
  // Rectángulo NO cuadrado para que la diferencia sea visible
  rectMode(CENTER);
  stroke(c);
  strokeWeight(2);
  fill(red(c), green(c), blue(c), 45);
  rect(0, 0, 70, 35, 5);
 
  // Eje X local (para ver cómo se distorsiona)
  stroke(red(c), green(c), blue(c), 150);
  strokeWeight(1);
  line(0, 0, 40, 0);
  // Punta de flecha
  fill(c);
  noStroke();
  triangle(40, -4, 40, 4, 52, 0);
 
  // Punto en origen local
  fill(c);
  circle(0, 0, 7);
}
 
function keyPressed() {
  // Ajustar escala no uniforme
  if (keyCode === UP_ARROW)    sy = min(sy + 0.1, 3);
  if (keyCode === DOWN_ARROW)  sy = max(sy - 0.1, 0.2);
  if (keyCode === RIGHT_ARROW) sx = min(sx + 0.1, 3);
  if (keyCode === LEFT_ARROW)  sx = max(sx - 0.1, 0.2);
}
