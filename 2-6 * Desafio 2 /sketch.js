// CAPÍTULO 6 — Desafío 2: Comparación Bézier vs B-Spline
// Los mismos puntos de control, dos tipos de curva
// Diferencia clave: control LOCAL (B-Spline) vs GLOBAL (Bézier)

let puntos;
let arrastrado;
let mostrarBezier;
let mostrarSpline;
const RADIO = 10;
 
function setup() {
  createCanvas(700, 420);
  arrastrado   = -1;
  mostrarBezier = true;
  mostrarSpline = true;
  resetPuntos();
}
 
function resetPuntos() {
  // 7 puntos para que haya múltiples segmentos en la spline
  puntos = [
    { x:  70, y: 250 },
    { x: 160, y:  90 },
    { x: 260, y: 310 },
    { x: 350, y: 130 },
    { x: 450, y: 310 },
    { x: 560, y:  90 },
    { x: 630, y: 250 },
  ];
}
 
function draw() {
  background(245);
 
  // Poligono de Control
  stroke(210);
  strokeWeight(1);
  noFill();
  beginShape();
  for (let p of puntos) vertex(p.x, p.y);
  endShape();
 
  // Curva Bezier de Alto Grado
  if (mostrarBezier && puntos.length >= 4) {
    stroke(220, 80, 60);
    strokeWeight(2);
    noFill();
    for (let i = 0; i + 3 < puntos.length; i += 3) {
      bezier(
        puntos[i].x,   puntos[i].y,
        puntos[i+1].x, puntos[i+1].y,
        puntos[i+2].x, puntos[i+2].y,
        puntos[i+3].x, puntos[i+3].y
      );
    }
  }
 
  // Curva B-Spline (Catmull-Rom)
  if (mostrarSpline && puntos.length >= 4) {
    stroke(60, 130, 220);
    strokeWeight(2);
    noFill();
    beginShape();
    curveVertex(puntos[0].x, puntos[0].y); // guía inicial
    for (let p of puntos) curveVertex(p.x, p.y);
    curveVertex(puntos[puntos.length-1].x, puntos[puntos.length-1].y); // guía final
    endShape();
  }
 
  // Puntos de Control
  for (let i = 0; i < puntos.length; i++) {
    let p = puntos[i];
    stroke(100);
    strokeWeight(2);
    fill(arrastrado === i ? 255 : 240);
    circle(p.x, p.y, 16);
    noStroke();
    fill(60);
    textSize(10);
    textFont('monospace');
    text(i, p.x + 9, p.y - 6);
  }
 
  // Leyenda
  noStroke();
  textSize(12);
  textFont('monospace');
 
  // Bézier
  fill(220, 80, 60, mostrarBezier ? 255 : 120);
  rect(10, 14, 14, 14, 2);
  fill(mostrarBezier ? 40 : 160);
  text(`B: Bézier (segmentos cúbicos)  ${mostrarBezier?'ON':'OFF'}`, 30, 25);
 
  // B-Spline
  fill(60, 130, 220, mostrarSpline ? 255 : 120);
  rect(10, 34, 14, 14, 2);
  fill(mostrarSpline ? 40 : 160);
  text(`S: B-Spline Catmull-Rom         ${mostrarSpline?'ON':'OFF'}`, 30, 45);
 
  // Nota diferencia clave
  fill(100);
  textSize(10);
  text('Mueve un punto: la Spline solo cambia localmente,', 10, height - 24);
  text('la Bézier afecta toda la curva (control global).', 10, height - 10);
}
 
function mousePressed() {
  for (let i = 0; i < puntos.length; i++) {
    if (dist(mouseX, mouseY, puntos[i].x, puntos[i].y) < RADIO + 3) {
      arrastrado = i;
      return;
    }
  }
}
 
function mouseDragged() {
  if (arrastrado !== -1) {
    puntos[arrastrado].x = mouseX;
    puntos[arrastrado].y = mouseY;
  }
}
 
function mouseReleased() { arrastrado = -1; }
 
function keyPressed() {
  if (key === 'b' || key === 'B') mostrarBezier = !mostrarBezier;
  if (key === 's' || key === 'S') mostrarSpline = !mostrarSpline;
  if (key === 'r' || key === 'R') resetPuntos();
}