// CAPÍTULO 6 — Desafío 1: Editor interactivo de B-Spline
// Catmull-Rom con puntos arrastrables, agregar/quitar puntos
 
let puntos;       // puntos de control
let arrastrado;   // índice del punto arrastrado (-1 = ninguno)
const RADIO = 10;
 
function setup() {
  createCanvas(700, 420);
  arrastrado = -1;
  resetPuntos();
}
 
function resetPuntos() {
  puntos = [
    { x:  80, y: 200 },
    { x: 180, y:  80 },
    { x: 300, y: 300 },
    { x: 420, y:  80 },
    { x: 540, y: 200 },
    { x: 620, y: 300 },
  ];
}
 
function draw() {
  background(245);
 
  if (puntos.length < 4) {
    noStroke();
    fill(160);
    textSize(14);
    textFont('monospace');
    textAlign(CENTER);
    text('Necesitas al menos 4 puntos. Clic para agregar.', width/2, height/2);
    textAlign(LEFT);
    dibujarPuntos();
    return;
  }
 
  // Curva CatMull-ROM
  stroke(60, 130, 220);
  strokeWeight(2.5);
  noFill();
  beginShape();
  // Punto guía inicial (repetimos el primero)
  curveVertex(puntos[0].x, puntos[0].y);
  for (let p of puntos) {
    curveVertex(p.x, p.y);
  }
  // Punto guía final (repetimos el último)
  curveVertex(puntos[puntos.length-1].x, puntos[puntos.length-1].y);
  endShape();
 
  // Poligono de Control
  stroke(200);
  strokeWeight(1);
  noFill();
  beginShape();
  for (let p of puntos) vertex(p.x, p.y);
  endShape();
 
  // Puntos
  dibujarPuntos();
 
  // HUD
  noStroke();
  fill(40);
  textSize(11);
  textFont('monospace');
  text(`puntos: ${puntos.length}`, 10, 20);
  text('arrastra puntos  |  clic vacío: agregar  |  D+clic: eliminar  |  R: reset', 10, height - 10);
}
 
function dibujarPuntos() {
  for (let i = 0; i < puntos.length; i++) {
    let p = puntos[i];
    let activo = (arrastrado === i);
 
    stroke(220, 130, 40);
    strokeWeight(2);
    fill(220, 130, 40, activo ? 200 : 60);
    circle(p.x, p.y, 18);
 
    noStroke();
    fill(60);
    textSize(10);
    textFont('monospace');
    text(i, p.x + 10, p.y - 6);
  }
}
 
function mousePressed() {
  // Modo eliminar: D + clic
  if (keyIsDown(68)) { // tecla D
    for (let i = puntos.length - 1; i >= 0; i--) {
      if (dist(mouseX, mouseY, puntos[i].x, puntos[i].y) < RADIO + 4) {
        puntos.splice(i, 1);
        return;
      }
    }
    return;
  }
 
  // Detectar si cayó sobre un punto existente
  for (let i = 0; i < puntos.length; i++) {
    if (dist(mouseX, mouseY, puntos[i].x, puntos[i].y) < RADIO + 4) {
      arrastrado = i;
      return;
    }
  }
 
  // Si no cayó en ningún punto: agregar nuevo
  puntos.push({ x: mouseX, y: mouseY });
}
 
function mouseDragged() {
  if (arrastrado !== -1) {
    puntos[arrastrado].x = mouseX;
    puntos[arrastrado].y = mouseY;
  }
}
 
function mouseReleased() {
  arrastrado = -1;
}
 
function keyPressed() {
  if (key === 'r' || key === 'R') resetPuntos();
}
 