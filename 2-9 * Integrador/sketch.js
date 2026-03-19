// PROYECTO INTEGRADOR — UNIDAD 2
// Escena 2D Interactiva: Transformaciones + Bézier + Fractal + Texto

// Variables Globales
 
// Cohete
let coheteS, coheteAng, coheteShear, coheteT;
 
// Robot
let robotX, robotY, robotS, robotAng, robotShear;
 
// Bézier
let bp, bezIdx;
 
// Fractal
let fProf, fAng, fFactor;
 
// Estrellas de fondo
let estrellas = [];
 
// Objeto activo para controles
let objetoActivo; // 'cohete' | 'robot'
 
// Setup
function setup() {
  createCanvas(900, 560);
  // Generar estrellas una sola vez
  for (let i = 0; i < 160; i++) {
    estrellas.push({
      x:    random(width),
      y:    random(height * 0.75),
      r:    random(0.5, 2.2),
      bri:  random(150, 255),
      vel:  random(0.002, 0.008),
    });
  }
  resetTodo();
}
 
function resetTodo() {
  coheteS     = 1.0;
  coheteAng   = 0;
  coheteShear = 0;
  coheteT     = 0;
 
  robotX      = 130;
  robotY      = 400;
  robotS      = 1.0;
  robotAng    = 0;
  robotShear  = 0;
 
  bp = [
    { x: 340, y: 450 },
    { x: 410, y: 160 },
    { x: 590, y: 160 },
    { x: 660, y: 450 },
  ];
  bezIdx = -1;
 
  fProf   = 8;
  fAng    = PI / 5;
  fFactor = 0.67;
 
  objetoActivo = 'cohete';
}
 
// Draw
function draw() {
  dibujarFondo();
  moverObjetos();
  seccionBezier();
  seccionFractal();
  seccionRobot();
  seccionTexto();
}
 
// Fondo Espacial
function dibujarFondo() {
  // Degradado noche: azul oscuro → negro
  for (let y = 0; y < height; y++) {
    let t = y / height;
    let c = lerpColor(color(10, 14, 40), color(5, 5, 20), t);
    stroke(c);
    line(0, y, width, y);
  }
 
  // Luna
  noStroke();
  fill(255, 250, 220, 30);
  circle(820, 70, 90);
  fill(255, 250, 200, 180);
  circle(810, 65, 70);
  fill(10, 14, 40, 80);
  circle(830, 58, 62); // sombra que crea el creciente
 
  // Estrellas parpadeantes
  noStroke();
  for (let s of estrellas) {
    let b = s.bri * (0.7 + 0.3 * sin(frameCount * s.vel * TWO_PI));
    fill(255, 255, 200, b);
    circle(s.x, s.y, s.r * 2);
  }
 
  // Suelo: colina con gradiente
  noStroke();
  fill(20, 60, 30);
  beginShape();
  vertex(0, height);
  for (let x = 0; x <= width; x += 20) {
    let h = height - 55 + 12 * sin(x * 0.012) + 6 * sin(x * 0.03);
    vertex(x, h);
  }
  vertex(width, height);
  endShape(CLOSE);
 
  fill(30, 80, 40);
  beginShape();
  vertex(0, height);
  for (let x = 0; x <= width; x += 20) {
    let h = height - 30 + 8 * sin(x * 0.018 + 1) + 4 * sin(x * 0.04);
    vertex(x, h);
  }
  vertex(width, height);
  endShape(CLOSE);
 
  // Separador con brillo de horizonte
  stroke(40, 120, 60, 80);
  strokeWeight(2);
  for (let x = 0; x < width; x += 4) {
    let h = height - 55 + 12 * sin(x * 0.012) + 6 * sin(x * 0.03);
    point(x, h);
  }
}
 
// Movimiento con Teclas
function moverObjetos() {
  let spd = 3;
  if (keyIsDown(87)) robotY -= spd;
  if (keyIsDown(83)) robotY += spd;
  if (keyIsDown(65)) robotX -= spd;
  if (keyIsDown(68)) robotX += spd;
  robotX = constrain(robotX, 40, 300);
  robotY = constrain(robotY, 60, height - 60);
}
 
// Robot
function seccionRobot() {
  // Sombra en el suelo
  noStroke();
  fill(0, 0, 0, 60);
  ellipse(robotX, height - 52, 60 * robotS, 10);
 
  push();
    translate(robotX, robotY);
    applyMatrix(1, 0, robotShear, 1, 0, 0);
    rotate(robotAng);
    scale(robotS);
    dibujarRobot();
  pop();
 
  // Indicador de selección
  if (objetoActivo === 'robot') {
    noFill();
    stroke(0, 220, 255, 100);
    strokeWeight(1);
    ellipse(robotX, robotY, 85 * robotS + 16, 170 * robotS + 16);
  }
}
 
function dibujarRobot() {
  rectMode(CENTER);
 
  // Piernas
  stroke(0, 160, 200);
  strokeWeight(4);
  line(-12, 55, -14, 78);
  line( 12, 55,  14, 78);
  // Pies
  stroke(0, 130, 170);
  strokeWeight(5);
  line(-14, 78, -24, 78);
  line( 14, 78,  24, 78);
 
  // Cuerpo
  stroke(0, 180, 230, 200);
  strokeWeight(1.5);
  fill(10, 60, 100, 230);
  rect(0, 20, 50, 58, 10);
 
  // Brillo lateral cuerpo
  noStroke();
  fill(255, 255, 255, 15);
  rect(-10, 12, 10, 44, 6);
 
  // Panel pecho
  fill(5, 30, 70, 240);
  noStroke();
  rect(0, 14, 34, 28, 5);
  // Luces panel
  fill(0, 230, 255);  circle(-10, 10, 8);
  fill(255, 200, 0);  circle(  0, 10, 8);
  fill(0, 255, 120);  circle( 10, 10, 8);
  // Brillos
  fill(255, 255, 255, 180);
  circle(-8, 8, 3); circle(2, 8, 3); circle(12, 8, 3);
 
  // Brazos
  stroke(0, 180, 230, 180);
  strokeWeight(1.5);
  fill(10, 60, 100, 200);
  rect(-33, 12, 13, 36, 5);
  rect( 33, 12, 13, 36, 5);
 
  // Cabeza
  stroke(0, 180, 230, 200);
  strokeWeight(1.5);
  fill(10, 70, 120, 240);
  rect(0, -30, 48, 42, 12);
 
  // Brillo cabeza
  noStroke();
  fill(255, 255, 255, 12);
  rect(-8, -38, 14, 20, 6);
 
  // Ojos
  fill(0, 200, 255, 60);
  ellipse(-12, -32, 16, 11);
  ellipse( 12, -32, 16, 11);
  fill(0, 220, 255);
  ellipse(-12, -32, 10, 8);
  ellipse( 12, -32, 10, 8);
  fill(255, 255, 255, 220);
  ellipse(-12, -32, 5, 5);
  ellipse( 12, -32, 5, 5);
  fill(255, 255, 255, 255);
  circle(-10, -34, 2); circle(14, -34, 2);
 
  // Boca LED
  stroke(0, 255, 180);
  strokeWeight(2);
  noFill();
  arc(0, -20, 18, 10, 0, PI);
 
  // Antena
  stroke(0, 180, 230);
  strokeWeight(2);
  line(0, -51, 0, -66);
  // Bolita antena con brillo
  noStroke();
  fill(255, 60, 80);
  circle(0, -70, 10);
  fill(255, 160, 170, 200);
  circle(-2, -72, 4);
}
 
// Cohete
function dibujarCohete() {
  rectMode(CENTER);
  noStroke();
 
  // Llama del motor — animada
  let fllama = 0.6 + 0.4 * sin(frameCount * 0.3);
  fill(255, 140, 0, 180);
  ellipse(0, 60, 16, 28 * fllama);
  fill(255, 220, 50, 220);
  ellipse(0, 56, 10, 18 * fllama);
  fill(255, 255, 200, 240);
  ellipse(0, 52, 5, 10 * fllama);
 
  // Aletas
  fill(180, 50, 200);
  noStroke();
  triangle(-16, 28, -34, 50, -16, 50);
  triangle( 16, 28,  34, 50,  16, 50);
 
  // Base motor
  fill(80, 60, 100);
  rect(0, 46, 22, 10, 3);
 
  // Cuerpo
  fill(200, 60, 220);
  rect(0, 8, 34, 68, 8);
 
  // Brillo lateral cuerpo
  fill(255, 200, 255, 40);
  rect(-8, 0, 8, 54, 5);
 
  // Nariz
  fill(220, 80, 240);
  triangle(-17, -24, 17, -24, 0, -62);
 
  // Franja decorativa
  fill(255, 255, 255, 60);
  rect(0, -8, 34, 8);
 
  // Ventana
  fill(180, 220, 255, 80);
  stroke(200, 180, 255);
  strokeWeight(2);
  circle(0, 2, 22);
  fill(100, 180, 255, 200);
  noStroke();
  circle(0, 2, 15);
  // Reflejo
  fill(255, 255, 255, 200);
  circle(-3, -1, 5);
  circle(3, 5, 3);
 
  // Etiqueta
  fill(255, 220, 255, 200);
  noStroke();
  rect(0, 22, 28, 11, 3);
  fill(80, 0, 100);
  textFont('monospace');
  textSize(6);
  textAlign(CENTER, CENTER);
  text('ROCKET', 0, 22);
}
 
// Bézier
function seccionBezier() {
  // Polígono de control — línea punteada neón
  stroke(255, 200, 80, 60);
  strokeWeight(1);
  drawingContext.setLineDash([4, 6]);
  noFill();
  beginShape();
  for (let p of bp) vertex(p.x, p.y);
  endShape();
  drawingContext.setLineDash([]);
 
  // Curva Bézier — trazo brillante
  // B(t) = (1-t)³P0 + 3(1-t)²t·P1 + 3(1-t)t²·P2 + t³P3
  // Halo exterior
  stroke(255, 180, 50, 40);
  strokeWeight(6);
  noFill();
  bezier(bp[0].x, bp[0].y, bp[1].x, bp[1].y, bp[2].x, bp[2].y, bp[3].x, bp[3].y);
  // Trazo principal
  stroke(255, 210, 80);
  strokeWeight(2);
  bezier(bp[0].x, bp[0].y, bp[1].x, bp[1].y, bp[2].x, bp[2].y, bp[3].x, bp[3].y);
 
  // Cohete animado sobre la curva
  coheteT = (coheteT + 0.004) % 1;
  let bx = bezierPoint(bp[0].x, bp[1].x, bp[2].x, bp[3].x, coheteT);
  let by = bezierPoint(bp[0].y, bp[1].y, bp[2].y, bp[3].y, coheteT);
  let tx = bezierTangent(bp[0].x, bp[1].x, bp[2].x, bp[3].x, coheteT);
  let ty = bezierTangent(bp[0].y, bp[1].y, bp[2].y, bp[3].y, coheteT);
  let ang = atan2(ty, tx) + HALF_PI;
 
  // Estela del cohete
  for (let i = 1; i <= 8; i++) {
    let pt = ((coheteT - i * 0.012) + 1) % 1;
    let ex = bezierPoint(bp[0].x, bp[1].x, bp[2].x, bp[3].x, pt);
    let ey = bezierPoint(bp[0].y, bp[1].y, bp[2].y, bp[3].y, pt);
    noStroke();
    fill(255, 180, 50, 30 - i * 3);
    circle(ex, ey, 14 - i);
  }
 
  push();
    translate(bx, by);
    applyMatrix(1, 0, coheteShear, 1, 0, 0);
    rotate(ang + coheteAng);
    scale(coheteS * 0.52);
    dibujarCohete();
  pop();
 
  // Anillo de selección cohete
  if (objetoActivo === 'cohete') {
    noFill();
    stroke(255, 180, 50, 100);
    strokeWeight(1);
    ellipse(bx, by, 62 * coheteS, 80 * coheteS);
  }
 
  // Puntos de control
  for (let i = 0; i < bp.length; i++) {
    let esAncla = (i === 0 || i === 3);
    if (esAncla) {
      noStroke();
      fill(255, 200, 80, 200);
      circle(bp[i].x, bp[i].y, 10);
    } else {
      // Halo
      noStroke();
      fill(255, 200, 80, 30);
      circle(bp[i].x, bp[i].y, 22);
      stroke(255, 200, 80);
      strokeWeight(1.5);
      fill(20, 15, 5, 200);
      circle(bp[i].x, bp[i].y, 14);
    }
    noStroke();
    fill(255, 220, 120);
    textFont('monospace');
    textSize(10);
    textAlign(LEFT);
    text(`P${i}`, bp[i].x + 9, bp[i].y - 6);
  }
}
 
// Fractal
function seccionFractal() {
  push();
    translate(820, height - 42);
    arbol(68, fProf);
  pop();
}
 
function arbol(len, nivel) {
  if (nivel === 0 || len < 3) return;
 
  let t = map(nivel, 0, fProf, 0, 1);
 
  // Tronco oscuro → ramas verdes neón
  let r = lerp(120, 30,  t);
  let g = lerp( 70, 220, t);
  let b = lerp( 20,  80, t);
  stroke(r, g, b);
  strokeWeight(map(nivel, 0, fProf, 0.4, fProf * 0.42));
  line(0, 0, 0, -len);
  translate(0, -len);
 
  if (nivel === 1) {
    // Hoja brillante
    noStroke();
    fill(40, 255, 100, 160);
    ellipse(0, 0, 7, 10);
    fill(120, 255, 160, 80);
    ellipse(0, -2, 4, 6);
    return;
  }
 
  push(); rotate(-fAng); arbol(len * fFactor, nivel - 1); pop();
  push(); rotate( fAng); arbol(len * fFactor, nivel - 1); pop();
}
 
// Texto 2D
function seccionTexto() {
  // Panel HUD superior
  noStroke();
  fill(0, 0, 0, 120);
  rect(0, 0, width, 50);
 
  // Título
  fill(180, 220, 255);
  textFont('monospace');
  textSize(14);
  textAlign(LEFT);
  text('PROYECTO INTEGRADOR — UNIDAD 2', 12, 20);
 
  fill(100, 150, 200);
  textSize(10);
  text('Escena 2D Interactiva: Transformaciones + Bézier + Fractal', 12, 36);
 
  // Indicador objeto activo (esquina superior derecha)
  let colActivo = objetoActivo === 'cohete' ? color(255, 180, 50) : color(0, 220, 255);
  fill(colActivo);
  textSize(11);
  textAlign(RIGHT);
  text(`Controles: ${objetoActivo.toUpperCase()}`, width - 12, 22);
  textAlign(LEFT);
 
  // Panel HUD inferior
  noStroke();
  fill(0, 0, 0, 140);
  rect(0, height - 52, width, 52);
 
  // Autor
  fill(120, 160, 200);
  textSize(10);
  textAlign(LEFT);
  text('Isidro López  |  No.Control: 24170608  |  Graficación  |  ITC 2026', 12, height - 38);
 
  // Estado en tiempo real
  fill(255, 180, 50);
  text(`[COHETE]  s=${nf(coheteS,1,2)}  θ=${nf(degrees(coheteAng),1,1)}°  sh=${nf(coheteShear,1,2)}`, 12, height - 24);
  fill(0, 200, 255);
  text(`[ROBOT]   tx=${round(robotX)} ty=${round(robotY)}  s=${nf(robotS,1,2)}  θ=${nf(degrees(robotAng),1,1)}°  sh=${nf(robotShear,1,2)}`, 12, height - 10);
 
  // Instrucciones
  fill(80, 120, 160);
  textSize(9);
  textAlign(RIGHT);
  text('TAB: objeto  WASD: mover  ↑↓: escala  ←→: rotar  Q/E: shear  Z/X: fractal  R: reset', width - 12, height - 10);
  textAlign(LEFT);
}
 
// Teclado
function keyPressed() {
  if (keyCode === TAB) {
    objetoActivo = (objetoActivo === 'cohete') ? 'robot' : 'cohete';
    return false;
  }
 
  if (objetoActivo === 'cohete') {
    if (keyCode === UP_ARROW)    coheteS     = min(coheteS + 0.1, 3);
    if (keyCode === DOWN_ARROW)  coheteS     = max(coheteS - 0.1, 0.3);
    if (keyCode === LEFT_ARROW)  coheteAng  -= 0.1;
    if (keyCode === RIGHT_ARROW) coheteAng  += 0.1;
    if (key === 'q' || key === 'Q') coheteShear -= 0.05;
    if (key === 'e' || key === 'E') coheteShear += 0.05;
  } else {
    if (keyCode === UP_ARROW)    robotS      = min(robotS + 0.1, 3);
    if (keyCode === DOWN_ARROW)  robotS      = max(robotS - 0.1, 0.3);
    if (keyCode === LEFT_ARROW)  robotAng   -= 0.1;
    if (keyCode === RIGHT_ARROW) robotAng   += 0.1;
    if (key === 'q' || key === 'Q') robotShear -= 0.05;
    if (key === 'e' || key === 'E') robotShear += 0.05;
  }
 
  if (key === 'z' || key === 'Z') fProf   = max(fProf - 1, 3);
  if (key === 'x' || key === 'X') fProf   = min(fProf + 1, 11);
  if (key === 'c' || key === 'C') fAng    = max(fAng - 0.05, 0.1);
  if (key === 'v' || key === 'V') fAng    = min(fAng + 0.05, PI / 2);
  if (key === 'r' || key === 'R') resetTodo();
}
 
// Bézier - Arrastrar
function mousePressed() {
  for (let i = 1; i <= 2; i++) {
    if (dist(mouseX, mouseY, bp[i].x, bp[i].y) < 14) {
      bezIdx = i;
      return;
    }
  }
}
 
function mouseDragged() {
  if (bezIdx !== -1) {
    bp[bezIdx].x = constrain(mouseX, 300, 700);
    bp[bezIdx].y = constrain(mouseY, 50, height - 60);
  }
}
 
function mouseReleased() { bezIdx = -1; }
 