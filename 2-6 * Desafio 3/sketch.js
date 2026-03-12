// CAPÍTULO 6 — Desafío 3: Objeto animado en camino B-Spline
// Usa curvePoint() para obtener posición exacta sobre la spline

let puntos;       // puntos de control del camino
let t;            // parámetro global [0, 1]
let velocidad;
let mostrarCamino;
let estela;       // historial de posiciones para la estela
 
function setup() {
  createCanvas(700, 420);
  t             = 0;
  velocidad     = 0.002;
  mostrarCamino = true;
  estela        = [];
  definirCamino();
}
 
function definirCamino() {
  // Camino en forma de circuito cerrado
  puntos = [
    { x: 350, y:  60 },
    { x: 580, y: 100 },
    { x: 620, y: 210 },
    { x: 500, y: 340 },
    { x: 350, y: 370 },
    { x: 200, y: 340 },
    { x:  80, y: 210 },
    { x: 120, y: 100 },
  ];
  t      = 0;
  estela = [];
}
 
// Posicion sobre el caminio
function getPosEnCamino(tGlobal) {
  let n   = puntos.length;
  // Mapeamos t [0,1] a [0, n] (circuito cerrado)
  let raw = tGlobal * n;
  let i   = floor(raw) % n;
  let u   = raw - floor(raw);  // t local [0,1]
 
  // Índices con wraparound para cerrar el circuito
  let i0 = (i - 1 + n) % n;
  let i1 =  i           % n;
  let i2 = (i + 1)      % n;
  let i3 = (i + 2)      % n;
 
  let x = curvePoint(puntos[i0].x, puntos[i1].x, puntos[i2].x, puntos[i3].x, u);
  let y = curvePoint(puntos[i0].y, puntos[i1].y, puntos[i2].y, puntos[i3].y, u);
  let tx = curveTangent(puntos[i0].x, puntos[i1].x, puntos[i2].x, puntos[i3].x, u);
  let ty = curveTangent(puntos[i0].y, puntos[i1].y, puntos[i2].y, puntos[i3].y, u);
 
  return { x, y, angulo: atan2(ty, tx) };
}
 
function draw() {
  background(245);
 
  // Camino (spline cerrada)
  if (mostrarCamino) {
    stroke(180, 200, 230);
    strokeWeight(6);
    noFill();
    beginShape();
    // Punto guía: último punto
    curveVertex(puntos[puntos.length-1].x, puntos[puntos.length-1].y);
    for (let p of puntos) curveVertex(p.x, p.y);
    // Cerrar circuito: repetir primeros 2
    curveVertex(puntos[0].x, puntos[0].y);
    curveVertex(puntos[1].x, puntos[1].y);
    endShape();
 
    // Puntos de control
    for (let i = 0; i < puntos.length; i++) {
      fill(160, 180, 220);
      noStroke();
      circle(puntos[i].x, puntos[i].y, 10);
      fill(100);
      textSize(9);
      textFont('monospace');
      text(i, puntos[i].x + 7, puntos[i].y - 5);
    }
  }
 
  // Avanzar t
  t += velocidad;
  if (t >= 1) t -= 1; // circuito cerrado
 
  // Posicion y Angulo del Objeto
  let pos = getPosEnCamino(t);
 
  // Guardar estela
  estela.push({ x: pos.x, y: pos.y });
  if (estela.length > 60) estela.shift();
 
  // Dibujar Estela 
  noStroke();
  for (let i = 0; i < estela.length; i++) {
    let alpha = map(i, 0, estela.length, 0, 150);
    let r     = map(i, 0, estela.length, 3, 8);
    fill(60, 130, 220, alpha);
    circle(estela[i].x, estela[i].y, r);
  }
 
  // Dibujar Objeto (nave triangular)
  push();
    translate(pos.x, pos.y);
    rotate(pos.angulo);  // apunta en dirección de movimiento
 
    // Nave
    stroke(40, 100, 200);
    strokeWeight(2);
    fill(60, 150, 240, 180);
    triangle(18, 0, -12, -10, -12, 10);
 
    // Motor
    fill(255, 180, 40, 200);
    noStroke();
    ellipse(-12, 0, 10, 6);
  pop();
 
  // HUD
  noStroke();
  fill(40);
  textSize(11);
  textFont('monospace');
  text(`t = {nf(t, 1, 3)}`, 10, 20);
  text(`vel = {nf(velocidad, 1, 4)}`, 10, 36);
  text(`pos = ({round(pos.x)}, {round(pos.y)})`, 10, 52);
  text(`ang = {nf(degrees(pos.angulo),1,1)}°`, 10, 68);
  fill(80);
  text('C: camino  |  ↑↓ velocidad  |  R: reset', 10, height - 10);
}
 
function keyPressed() {
  if (key === 'c' || key === 'C') mostrarCamino = !mostrarCamino;
  if (keyCode === UP_ARROW)   velocidad = min(velocidad + 0.001, 0.02);
  if (keyCode === DOWN_ARROW) velocidad = max(velocidad - 0.001, 0.0005);
  if (key === 'r' || key === 'R') definirCamino();
}
 