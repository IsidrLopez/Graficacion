// CAPÍTULO 5 — Desafío 1: Punto de control móvil
// Curva Bézier cúbica con P1 o P2 arrastrable con mouse 
// Puntos de control P0, P1, P2, P3
let pts;
let arrastrado; // índice del punto que se está moviendo (-1 = ninguno)
const RADIO = 10; // radio de detección de clic
 
function setup() {
  createCanvas(600, 400);
  resetPuntos();
  arrastrado = -1;
}
 
function resetPuntos() {
  pts = [
    { x:  80, y: 300 },  // P0 — fijo (ancla izquierda)
    { x: 180, y:  80 },  // P1 — móvil (control izquierdo)
    { x: 420, y:  80 },  // P2 — móvil (control derecho)
    { x: 520, y: 300 },  // P3 — fijo (ancla derecha)
  ];
}
 
function draw() {
  background(245);
 
  // Poligono de Control
  stroke(180);
  strokeWeight(1);
  noFill();
  beginShape();
  for (let p of pts) vertex(p.x, p.y);
  endShape();
 
  // Curva Bezier
  // B(t) = (1-t)³P0 + 3(1-t)²t·P1 + 3(1-t)t²·P2 + t³P3
  stroke(60, 130, 220);
  strokeWeight(2.5);
  noFill();
  bezier(pts[0].x, pts[0].y,
         pts[1].x, pts[1].y,
         pts[2].x, pts[2].y,
         pts[3].x, pts[3].y);
 
  // Punto en t=0.5
  let bx = bezierPoint(pts[0].x, pts[1].x, pts[2].x, pts[3].x, 0.5);
  let by = bezierPoint(pts[0].y, pts[1].y, pts[2].y, pts[3].y, 0.5);
  fill(220, 80, 80);
  noStroke();
  circle(bx, by, 9);
 
  // Puntos de Control
  for (let i = 0; i < pts.length; i++) {
    let p = pts[i];
    let esMóvil = (i === 1 || i === 2);
    let esAncla = (i === 0 || i === 3);
 
    if (esAncla) {
      // Anclas: cuadrado azul oscuro
      stroke(40, 90, 160);
      strokeWeight(2);
      fill(40, 90, 160, 60);
      rectMode(CENTER);
      square(p.x, p.y, 14);
    } else {
      // Controles: círculo naranja arrastrable
      stroke(220, 130, 40);
      strokeWeight(2);
      fill(220, 130, 40, arrastrado === i ? 180 : 60);
      circle(p.x, p.y, 16);
    }
 
    // Etiqueta
    noStroke();
    fill(60);
    textSize(11);
    textFont('monospace');
    text(`P${i}`, p.x + 10, p.y - 6);
  }
 
  // HUD
  noStroke();
  fill(40);
  textSize(11);
  textFont('monospace');
  text(`P0=(round(pts[0].x)},{round(pts[0].y)})  P3=(round(pts[3].x)},{round(pts[3].y)})`, 10, 20);
  text(`P1=(round(pts[1].x)},{round(pts[1].y)})  P2=(round(pts[2].x)},{round(pts[2].y)})`, 10, 36);
  fill(220, 80, 80);
  circle(10, 52, 8);
  fill(80);
  text('punto en t=0.5', 20, 56);
  fill(80);
  text('arrastra P1 o P2  |  R: reset', 10, height - 10);
}
 
function mousePressed() {
  // Detectar si el clic cayó sobre P1 o P2
  for (let i = 1; i <= 2; i++) {
    let d = dist(mouseX, mouseY, pts[i].x, pts[i].y);
    if (d < RADIO + 4) {
      arrastrado = i;
      break;
    }
  }
}
 
function mouseDragged() {
  if (arrastrado !== -1) {
    pts[arrastrado].x = mouseX;
    pts[arrastrado].y = mouseY;
  }
}
 
function mouseReleased() {
  arrastrado = -1;
}
 
function keyPressed() {
  if (key === 'r' || key === 'R') resetPuntos();
}