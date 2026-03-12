// PROYECTO INTEGRADOR — UNIDAD 2
// Escena 2D Interactiva: Transformaciones + Bézier + Fractal + Texto
 
// Variables Globales
 
// A) Transformaciones del robot
let robotX, robotY;   // traslación
let robotS;           // escala
let robotAngle;       // rotación (radianes)
let robotShear;       // shear en X
 
// B) Curva Bézier
let bezPts;           // 4 puntos de control
let bezArrastrado;    // índice del punto arrastrado (-1 = ninguno)
const BEZ_RADIO = 12; // radio de detección de clic
 
// C) Fractal
let fractalProf;      // profundidad del árbol
let fractalAng;       // ángulo de apertura
let fractalFactor;    // factor de reducción
 
// D) Modo activo
let modoActivo;       // 'robot' | 'bezier' | 'fractal'
 
// Setup 
function setup() {
  createCanvas(900, 580);
  resetTodo();
}
 
function resetTodo() {
  // Robot
  robotX     = 200;
  robotY     = 300;
  robotS     = 1.0;
  robotAngle = 0;
  robotShear = 0;
 
  // Bézier — puntos iniciales en zona derecha
  bezPts = [
    { x: 520, y: 420 },
    { x: 600, y: 260 },
    { x: 740, y: 260 },
    { x: 820, y: 420 },
  ];
  bezArrastrado = -1;
 
  // Fractal
  fractalProf   = 7;
  fractalAng    = PI / 5.5;
  fractalFactor = 0.67;
 
  modoActivo = 'robot';
}
 
// Draw
function draw() {
  background(28, 32, 42);
 
  // Dividir el canvas en 3 zonas
  dibujarZonas();
 
  // A) Robot con transformaciones
  dibujarRobot();
 
  // B) Curva Bézier interactiva
  dibujarBezier();
 
  // C) Fractal recursivo
  dibujarFractal();
 
  // D) Texto 2D
  dibujarTexto();
 
  // Panel de instrucciones
  dibujarPanel();
}
 
// Zonas de Fondo
function dibujarZonas() {
  noStroke();
  // Zona robot (izquierda)
  fill(modoActivo === 'robot'  ? color(40, 60, 80, 80) : color(30, 35, 45, 60));
  rect(0, 0, 420, height);
 
  // Zona Bézier (centro-derecha arriba)
  fill(modoActivo === 'bezier' ? color(60, 50, 30, 80) : color(30, 35, 45, 60));
  rect(420, 0, 480, height / 2);
 
  // Zona fractal (centro-derecha abajo)
  fill(modoActivo === 'fractal'? color(30, 60, 40, 80) : color(30, 35, 45, 60));
  rect(420, height / 2, 480, height / 2);
 
  // Bordes divisorios
  stroke(50, 60, 80);
  strokeWeight(1);
  line(420, 0, 420, height);
  line(420, height / 2, width, height / 2);
}
 
// A) Robot con Transformaciones
function dibujarRobot() {
  // Movimiento continuo con teclas (solo si modo robot activo)
  if (modoActivo === 'robot') {
    let spd = 3;
    if (keyIsDown(87)) robotY -= spd;                          // W
    if (keyIsDown(83)) robotY += spd;                          // S
    if (keyIsDown(65)) robotX -= spd;                          // A
    if (keyIsDown(68)) robotX += spd;                          // D
    // Mantener dentro de la zona izquierda
    robotX = constrain(robotX, 60,  360);
    robotY = constrain(robotY, 60,  height - 60);
  }
 
  push();
    // Traslación: mover al centro del robot
    translate(robotX, robotY);
 
    // Shear: aplicar antes de rotar/escalar
    // Matriz shear X: [[1,k,0],[0,1,0],[0,0,1]]
    applyMatrix(1, 0, robotShear, 1, 0, 0);
 
    // Rotación
    rotate(robotAngle);
 
    // Escala
    scale(robotS);
 
    dibujarCuerpoRobot();
  pop();
}
 
function dibujarCuerpoRobot() {
  rectMode(CENTER);
 
  // Sombra
  noStroke();
  fill(0, 0, 0, 50);
  ellipse(4, 72, 70, 14);
 
  // Piernas
  stroke(80, 180, 220);
  strokeWeight(3);
  line(-14, 52, -18, 78);
  line( 14, 52,  18, 78);
  // Pies
  stroke(60, 140, 180);
  strokeWeight(4);
  line(-18, 78, -28, 78);
  line( 18, 78,  28, 78);
 
  // Cuerpo
  stroke(80, 180, 220);
  strokeWeight(2);
  fill(40, 100, 140, 180);
  rect(0, 18, 52, 58, 8);
 
  // Panel del pecho
  fill(20, 60, 100, 200);
  noStroke();
  rect(0, 14, 34, 28, 4);
  // Luces del panel
  fill(80, 220, 255);
  circle(-10, 10, 7);
  fill(255, 180, 40);
  circle(  0, 10, 7);
  fill(80, 255, 120);
  circle( 10, 10, 7);
 
  // Brazos
  stroke(80, 180, 220);
  strokeWeight(3);
  fill(40, 100, 140, 160);
  rect(-34, 10, 14, 36, 4);
  rect( 34, 10, 14, 36, 4);
 
  // Cabeza
  stroke(80, 180, 220);
  strokeWeight(2);
  fill(50, 120, 160, 200);
  rect(0, -30, 50, 42, 10);
 
  // Ojos
  fill(0, 200, 255, 220);
  noStroke();
  ellipse(-12, -32, 14, 10);
  ellipse( 12, -32, 14, 10);
  // Pupila
  fill(255);
  ellipse(-12, -32, 6, 6);
  ellipse( 12, -32, 6, 6);
 
  // Antena
  stroke(80, 180, 220);
  strokeWeight(2);
  line(0, -51, 0, -66);
  fill(255, 80, 80);
  noStroke();
  circle(0, -70, 8);
}
 
// B) Curva Bezier Interactiva
function dibujarBezier() {
  let p = bezPts;
 
  // Polígono de control
  stroke(100, 90, 50, 150);
  strokeWeight(1);
  noFill();
  beginShape();
  for (let pt of p) vertex(pt.x, pt.y);
  endShape();
 
  // Curva Bézier
  // B(t) = (1-t)³P0 + 3(1-t)²t·P1 + 3(1-t)t²·P2 + t³P3
  stroke(255, 200, 60);
  strokeWeight(2.5);
  noFill();
  bezier(p[0].x, p[0].y, p[1].x, p[1].y, p[2].x, p[2].y, p[3].x, p[3].y);
 
  // Punto animado en t = (frameCount*0.01) % 1
  let t  = (frameCount * 0.008) % 1;
  let bx = bezierPoint(p[0].x, p[1].x, p[2].x, p[3].x, t);
  let by = bezierPoint(p[0].y, p[1].y, p[2].y, p[3].y, t);
  fill(255, 120, 40);
  noStroke();
  circle(bx, by, 10);
 
  // Puntos de control
  for (let i = 0; i < p.length; i++) {
    let esAncla = (i === 0 || i === 3);
    if (esAncla) {
      stroke(255, 200, 60);
      strokeWeight(2);
      fill(255, 200, 60, 80);
      rectMode(CENTER);
      square(p[i].x, p[i].y, 14);
    } else {
      stroke(255, 160, 40);
      strokeWeight(2);
      fill(255, 160, 40, bezArrastrado === i ? 200 : 60);
      circle(p[i].x, p[i].y, 16);
    }
    noStroke();
    fill(200, 180, 100);
    textFont('monospace');
    textSize(10);
    textAlign(LEFT);
    text(`P${i}`, p[i].x + 9, p[i].y - 6);
  }
 
  // Etiqueta zona
  noStroke();
  fill(255, 200, 60, 120);
  textSize(10);
  textFont('monospace');
  textAlign(LEFT);
  text('B) CURVA BÉZIER — arrastra P1/P2', 428, 18);
}
 
// C) Fractal Recursivo 
function dibujarFractal() {
  // Controlar ángulo con mouse si modo fractal activo
  if (modoActivo === 'fractal') {
    fractalAng = map(mouseX, 420, width, PI / 8, PI / 2.2, true);
  }
 
  push();
    // Origen del árbol: base de la zona inferior derecha
    translate(660, height - 10);
    arbolFractal(70, fractalProf);
  pop();
 
  // Etiqueta zona
  noStroke();
  fill(80, 220, 120, 120);
  textSize(10);
  textFont('monospace');
  textAlign(LEFT);
  text(`C) FRACTAL — prof=${fractalProf}  r=${nf(fractalFactor,1,2)}`, 428, height / 2 + 16);
}
 
function arbolFractal(len, nivel) {
  if (nivel === 0 || len < 3) return;
 
  // Color por profundidad: marrón → verde
  let t = map(nivel, 0, fractalProf, 0, 1);
  stroke(
    lerp(160, 60,  t),
    lerp( 90, 200, t),
    lerp( 30,  60, t),
    map(nivel, 0, fractalProf, 100, 255)
  );
  strokeWeight(map(nivel, 0, fractalProf, 0.5, fractalProf * 0.45));
 
  line(0, 0, 0, -len);
  translate(0, -len);
 
  // Hoja en nivel base
  if (nivel === 1) {
    noStroke();
    fill(80, 200, 80, 140);
    ellipse(0, 0, 7, 10);
    return;
  }
 
  push(); rotate(-fractalAng); arbolFractal(len * fractalFactor, nivel - 1); pop();
  push(); rotate( fractalAng); arbolFractal(len * fractalFactor, nivel - 1); pop();
}
 
// D) Texto 2D 
function dibujarTexto() {
  // Título del proyecto (zona superior izquierda)
  noStroke();
  fill(200, 220, 255);
  textFont('monospace');
  textSize(13);
  textAlign(LEFT);
  text('PROYECTO INTEGRADOR — UNIDAD 2', 10, 22);
 
  fill(100, 140, 180);
  textSize(10);
  text('Escena 2D Interactiva: Transformaciones + Bézier + Fractal', 10, 38);
 
  // Autor
  fill(120, 160, 200);
  textSize(10);
  text('Isidro López  |  Graficación  |  ITC 2026', 10, height - 14);
 
  // Estado del robot (texto dinámico)
  fill(80, 180, 220);
  textSize(10);
  text(`tx=${round(robotX)} ty=${round(robotY)}`, 10, height - 28);
  text(`s=${nf(robotS,1,2)}  θ=${nf(degrees(robotAngle),1,1)}°  sh=${nf(robotShear,1,2)}`, 10, height - 42);
 
  // Etiqueta zona robot
  fill(80, 180, 220, 120);
  textSize(10);
  text('A) ROBOT — WASD mover', 10, 56);
}
 
// Panel de Instrucciones
function dibujarPanel() {
  // Fondo del panel
  fill(20, 25, 35, 220);
  noStroke();
  rect(422, height / 2 + 28, 472, height / 2 - 38, 6);
 
  fill(160, 180, 220);
  textFont('monospace');
  textSize(10);
  textAlign(LEFT);
 
  let px = 432, py = height / 2 + 46;
  let dy = 14;
 
  fill(255, 220, 80);
  text('TAB: cambiar modo activo', px, py); py += dy;
  fill(150, 180, 220);
  text(`Modo: [${modoActivo.toUpperCase()}]`, px, py); py += dy + 4;
 
  fill(80, 180, 220);
  text('── ROBOT ──', px, py); py += dy;
  fill(140, 170, 200);
  text('WASD: mover', px, py); py += dy;
  text('↑↓: escala', px, py); py += dy;
  text('←→: rotar', px, py); py += dy;
  text('Q/E: shear  |  R: reset', px, py); py += dy + 4;
 
  fill(255, 200, 60);
  text('── BÉZIER ──', px, py); py += dy;
  fill(140, 170, 200);
  text('arrastra P1 o P2', px, py); py += dy + 4;
 
  fill(80, 220, 120);
  text('── FRACTAL ──', px, py); py += dy;
  fill(140, 170, 200);
  text('mouse X: ángulo', px, py); py += dy;
  text('Z/X: profundidad', px, py); py += dy;
  text('C/V: factor r', px, py);
}
 
// Interaccion
function keyPressed() {
  // Cambiar modo
  if (keyCode === TAB) {
    let modos = ['robot', 'bezier', 'fractal'];
    let idx   = modos.indexOf(modoActivo);
    modoActivo = modos[(idx + 1) % modos.length];
    return false; // evitar que TAB cambie foco del navegador
  }
 
  // Controles del robot
  if (keyCode === UP_ARROW)   robotS     = min(robotS + 0.1, 3);
  if (keyCode === DOWN_ARROW) robotS     = max(robotS - 0.1, 0.3);
  if (keyCode === LEFT_ARROW) robotAngle -= 0.1;
  if (keyCode === RIGHT_ARROW)robotAngle += 0.1;
  if (key === 'q' || key === 'Q') robotShear -= 0.05;
  if (key === 'e' || key === 'E') robotShear += 0.05;
  if (key === 'r' || key === 'R') resetTodo();
 
  // Controles del fractal
  if (key === 'z' || key === 'Z') fractalProf = max(fractalProf - 1, 2);
  if (key === 'x' || key === 'X') fractalProf = min(fractalProf + 1, 10);
  if (key === 'c' || key === 'C') fractalFactor = max(fractalFactor - 0.02, 0.3);
  if (key === 'v' || key === 'V') fractalFactor = min(fractalFactor + 0.02, 0.85);
}
 
// Arrastar Puntos Bezier
function mousePressed() {
  // Solo si el clic está en la zona Bézier (mitad superior derecha)
  if (mouseX < 420 || mouseY > height / 2) return;
 
  for (let i = 1; i <= 2; i++) {
    if (dist(mouseX, mouseY, bezPts[i].x, bezPts[i].y) < BEZ_RADIO + 4) {
      bezArrastrado = i;
      modoActivo    = 'bezier';
      return;
    }
  }
}
 
function mouseDragged() {
  if (bezArrastrado !== -1) {
    bezPts[bezArrastrado].x = constrain(mouseX, 422, width - 4);
    bezPts[bezArrastrado].y = constrain(mouseY, 4, height / 2 - 4);
  }
}
 
function mouseReleased() {
  bezArrastrado = -1;
}