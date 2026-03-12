// CAPÍTULO 4 — Desafío 3: Verificación numérica
// Ejemplo de la guía: P=(1,1) → S(2) → R(90°)
// Resultado esperado: P1=(2,2) → P2=(-2,2)

 
// Punto inicial de la guía
let puntos = [];   // historial de transformaciones
let paso;          // paso actual (0=original, 1=escalado, 2=rotado)
let animT;         // tiempo de animación
 
function setup() {
  createCanvas(700, 440);
  textFont('monospace');
  resetDemo();
}
 
function resetDemo() {
  paso  = 0;
  animT = 0;
  puntos = [
    { x: 100, y: 100, label: 'P = (1, 1)', c: color(120) },
  ];
}
 
// Matrices
 function aplicarM(M, x, y) {
  return [
    M[0][0]*x + M[0][1]*y + M[0][2],
    M[1][0]*x + M[1][1]*y + M[1][2]
  ];
}
 
function matS(sx, sy) {
  return [[sx,  0, 0], [ 0, sy, 0], [0, 0, 1]];
}
 
function matR(a) {
  return [[cos(a), -sin(a), 0],
          [sin(a),  cos(a), 0],
          [     0,       0, 1]];
}
 
// Coordenadas mundo → canvas (escalar y centrar)
function toCanvas(x, y) {
  let escala = 60;
  return [width/2 + x * escala, height/2 - y * escala];
}
 
function draw() {
  background(245);
 
  let cx = width / 2;
  let cy = height / 2;
 
  // ── EJES ─────────────────────────────────────────
  stroke(200);
  strokeWeight(1);
  line(40, cy, width - 40, cy);   // eje X
  line(cx, 40, cx, height - 40);  // eje Y
 
  // Marcas de escala
  fill(160);
  noStroke();
  textSize(10);
  for (let i = -5; i <= 5; i++) {
    if (i === 0) continue;
    let [gx, gy] = toCanvas(i, 0);
    let [hx, hy] = toCanvas(0, i);
    text(i, gx - 4, cy + 15);
    text(i, cx + 6, hy + 4);
    stroke(230);
    strokeWeight(1);
    line(gx, cy - 4, gx, cy + 4);
    line(cx - 4, hy, cx + 4, hy);
    noStroke();
  }
 
  // Etiquetas de ejes
  fill(140);
  textSize(12);
  text('X', width - 30, cy - 6);
  text('Y', cx + 8, 50);
 
  // Puntos de la Transformaciones
  // P original: (1,1)
  let [c1x, c1y] = toCanvas(1, 1);
  // P1 = S(2)·P = (2,2)
  let [c2x, c2y] = toCanvas(2, 2);
  // P2 = R(90°)·P1 = (-2,2)
  let [c3x, c3y] = toCanvas(-2, 2);
 
  // Flecha de P → P1
  if (paso >= 1) {
    stroke(100, 160, 80, 160);
    strokeWeight(1.5);
    drawArrow(c1x, c1y, c2x, c2y);
  }
 
  // Flecha de P1 → P2
  if (paso >= 2) {
    stroke(220, 120, 60, 160);
    strokeWeight(1.5);
    drawArrow(c2x, c2y, c3x, c3y);
  }
 
  // P original 
  dibujarPunto(c1x, c1y, color(120), 'P = (1, 1)', true);
 
  // P1 después de S(2)
  if (paso >= 1) {
    dibujarPunto(c2x, c2y, color(100, 160, 80), 'P₁ = S(2)·P = (2, 2)', true);
  }
 
  // P2 después de R(90°) 
  if (paso >= 2) {
    dibujarPunto(c3x, c3y, color(220, 120, 60), 'P₂ = R(90°)·P₁ = (-2, 2)', true);
  }
 
  // Panel de Matrices
  dibujarPanel();
 
  // HUD
  noStroke();
  fill(80);
  textSize(11);
  text('ESPACIO: siguiente paso  |  R: reiniciar', 10, height - 10);
}
 
function dibujarPunto(x, y, c, lbl, mostrarLabel) {
  fill(c);
  noStroke();
  circle(x, y, 12);
  if (mostrarLabel) {
    fill(red(c) * 0.7, green(c) * 0.7, blue(c) * 0.7);
    textSize(11);
    text(lbl, x + 10, y - 8);
  }
}
 
function drawArrow(x1, y1, x2, y2) {
  line(x1, y1, x2, y2);
  // Punta
  let a = atan2(y2 - y1, x2 - x1);
  push();
  translate(x2, y2);
  rotate(a);
  fill(80);
  noStroke();
  triangle(0, 0, -10, -5, -10, 5);
  pop();
}
 
function dibujarPanel() {
  // Panel lateral con matrices
  let px = 10, py = 15;
  noStroke();
  fill(40);
  textSize(11);
 
  text('── Matrices (guía Cap.4) ──', px, py);
  py += 18;
 
  // S(2)
  fill(100, 160, 80);
  text('S(2):', px, py); py += 14;
  fill(60);
  text('[ 2  0  0 ]', px, py); py += 14;
  text('[ 0  2  0 ]', px, py); py += 14;
  text('[ 0  0  1 ]', px, py); py += 20;
 
  // R(90°)
  fill(220, 120, 60);
  text('R(90°):', px, py); py += 14;
  fill(60);
  text('[ 0  -1  0 ]', px, py); py += 14;
  text('[ 1   0  0 ]', px, py); py += 14;
  text('[ 0   0  1 ]', px, py); py += 20;
 
  // Composición M = R·S
  fill(60, 130, 220);
  text('M = R(90°)·S(2):', px, py); py += 14;
  fill(60);
  text('[ 0  -2  0 ]', px, py); py += 14;
  text('[ 2   0  0 ]', px, py); py += 14;
  text('[ 0   0  1 ]', px, py); py += 20;
 
  // Verificación
  fill(80);
  text(`paso ${paso}/2`, px, py);
}
 
function keyPressed() {
  if (key === ' ') paso = min(paso + 1, 2);
  if (key === 'r' || key === 'R') resetDemo();
}