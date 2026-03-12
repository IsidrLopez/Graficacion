// CAPÍTULO 7 — Desafío 1: Árbol fractal con 3 ramas
// Recursión con 3 hijos por nodo (en vez de 2)
 
let profundidad;  // niveles de recursión
let factor;       // factor de reducción de longitud
let angBase;      // ángulo de apertura entre ramas
 
function setup() {
  createCanvas(700, 500);
  profundidad = 7;
  factor      = 0.65;
  angBase     = PI / 5;
}
 
function draw() {
  background(245); 
  // Dibujar Árbol
  // Tronco sale desde abajo al centro, apunta hacia arriba
  push();
    translate(width / 2, height - 20);
    rama(120, profundidad);
  pop();
 
  // HUD
  noStroke();
  fill(40);
  textSize(11);
  textFont('monospace');
  text(`profundidad = {profundidad}  (↑↓)`, 10, 20);
  text(`factor      = {nf(factor, 1, 2)}  (←→)`, 10, 36);
  text(`ángulo      = {nf(degrees(angBase), 1, 1)}°  (A/D)`, 10, 52);
  text(`ramas total ≈ {round((pow(3, profundidad+1) - 1) / 2)}`, 10, 68);
  fill(120);
  text('↑↓ profundidad  |  ←→ factor  |  A/D ángulo', 10, height - 10);
}
 
// Funcion Recursiva
function rama(len, nivel) {
  if (nivel === 0 || len < 3) return;
 
  // Color según profundidad: de marrón (tronco) a verde (hojas)
  let t = map(nivel, 0, profundidad, 0, 1);
  let r = lerp(180, 60,  t);
  let g = lerp(100, 160, t);
  let b = lerp( 40,  40, t);
 
  // Grosor disminuye con la profundidad
  strokeWeight(map(nivel, 0, profundidad, 1, profundidad * 0.6));
  stroke(r, g, b);
 
  // Dibujar esta rama (hacia arriba = dirección -Y)
  line(0, 0, 0, -len);
 
  // Moverse al extremo de la rama
  translate(0, -len);
 
  // 3 Ramas Hijas
  // Izquierda
  push();
    rotate(-angBase);
    rama(len * factor, nivel - 1);
  pop();
 
  // Centro (rama derecha)
  push();
    rotate(0);
    rama(len * factor * 0.85, nivel - 1); // un poco más corta
  pop();
 
  // Derecha
  push();
    rotate(angBase);
    rama(len * factor, nivel - 1);
  pop();
}
 
function keyPressed() {
  if (keyCode === UP_ARROW)    profundidad = min(profundidad + 1, 10);
  if (keyCode === DOWN_ARROW)  profundidad = max(profundidad - 1, 1);
  if (keyCode === RIGHT_ARROW) factor      = min(factor + 0.02, 0.9);
  if (keyCode === LEFT_ARROW)  factor      = max(factor - 0.02, 0.3);
  if (key === 'a' || key === 'A') angBase = max(angBase - 0.05, 0.1);
  if (key === 'd' || key === 'D') angBase = min(angBase + 0.05, PI/2);
}