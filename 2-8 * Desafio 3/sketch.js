// CAPÍTULO 8 — Desafío 3: Palabra geométrica con line()
// Las letras "ISC" se construyen con primitivas geométricas
 
let theta;    // rotación global
let s;        // escala global
let animando;
 
function setup() {
  createCanvas(700, 420);
  theta   = 0;
  s       = 1.0;
  animando = true;
}
 
function draw() {
  background(245);
 
  if (animando) theta += 0.008;
 
  // Titulo
  noStroke();
  fill(100);
  textFont('monospace');
  textSize(11);
  textAlign(LEFT);
  text('Letras construidas con primitivas geométricas (line, arc, bezier)', 10, 20);
 
  // Dibujar "ISC" con Transformaciones 
 
  // I — centrada en (175, 210)
  push();
    translate(175, 210);
    rotate(sin(theta * 0.7) * 0.3);
    scale(s);
    dibujarI(color(60, 130, 220));
  pop();
 
  // S — centrada en (350, 210)
  push();
    translate(350, 210);
    rotate(theta * 0.5);
    scale(s * (1 + 0.1 * sin(theta * 2)));
    dibujarS(color(220, 100, 60));
  pop();
 
  // C — centrada en (530, 210)
  push();
    translate(530, 210);
    rotate(-sin(theta * 0.9) * 0.25);
    scale(s);
    dibujarC(color(80, 180, 80));
  pop();
 
  // HUD
  noStroke();
  fill(80);
  textSize(11);
  textFont('monospace');
  textAlign(LEFT);
  text(`s = ${nf(s,1,2)}  |  ↑↓ escala  |  ESPACIO: pausar  |  R: reset`, 10, height - 10);
}
 
// Letra I 
function dibujarI(c) {
  stroke(c);
  strokeWeight(4);
 
  // Trazo vertical
  line(0, -70, 0, 70);
 
  // Serifa superior
  line(-22, -70, 22, -70);
 
  // Serifa inferior
  line(-22, 70, 22, 70);
}
 
// Letra S
function dibujarS(c) {
  stroke(c);
  strokeWeight(3);
  noFill();
 
  // S = dos arcos Bézier encadenados
  // Arco superior (de derecha a izquierda)
  bezier( 30, -70,
          30, -110,
         -30, -110,
         -30,  -10);
 
  // Arco inferior (de izquierda a derecha)
  bezier(-30,  -10,
         -30,   30,
          30,   30,
          30,   70);
 
  // Extremos con serifa pequeña
  strokeWeight(4);
  line(30, -70, 10, -70);
  line(30,  70, 10,  70);
}
 
// Letra C 
function dibujarC(c) {
  stroke(c);
  strokeWeight(3);
  noFill();
 
  // Arco principal — casi círculo abierto a la derecha
  arc(0, 0, 130, 130, radians(40), radians(320));
 
  // Terminaciones horizontales
  strokeWeight(4);
  let abre = radians(40);
  let xT = cos(abre) * 65;
  let yT = sin(abre) * 65;
  line(xT, yT, xT + 18, yT);          // terminal superior
  line(xT, -yT, xT + 18, -yT);        // terminal inferior
}
 
function keyPressed() {
  if (keyCode === UP_ARROW)   s = min(s + 0.1, 3);
  if (keyCode === DOWN_ARROW) s = max(s - 0.1, 0.3);
  if (key === ' ')            animando = !animando;
  if (key === 'r' || key === 'R') { theta = 0; s = 1; animando = true; }
}
 