// CAPÍTULO 7 — Desafío 3: Triángulo de Sierpinski
// Recursión: divide cada triángulo en 3 hijos

let profundidad;
let animando;
let frameAnim;
 
function setup() {
  createCanvas(700, 560);
  profundidad = 6;
  animando    = false;
  frameAnim   = 0;
}
 
function draw() {
  background(245);
 
  // Animación de construcción paso a paso
  let nivActual = animando ? floor(frameAnim / 40) + 1 : profundidad;
  nivActual     = min(nivActual, profundidad);
 
  if (animando) {
    frameAnim++;
    if (frameAnim > profundidad * 40) {
      animando  = false;
      frameAnim = 0;
    }
  }
 
  // Dibujar Sierpinski
  // Triángulo equilátero centrado
  let lado = 500;
  let h    = lado * sqrt(3) / 2;
  let cx   = width  / 2;
  let cy   = height / 2 + h / 3;  // centrar verticalmente
 
  let p1 = { x: cx,              y: cy - h * 2/3 }; // vértice superior
  let p2 = { x: cx - lado / 2,   y: cy + h / 3  }; // vértice inferior izq
  let p3 = { x: cx + lado / 2,   y: cy + h / 3  }; // vértice inferior der
 
  sierpinski(p1, p2, p3, nivActual);
 
  // HUD
  noStroke();
  fill(40);
  textSize(11);
  textFont('monospace');
  text(`profundidad = ${profundidad}  (↑↓)`, 10, 20);
  text(`triángulos  = ${round(pow(3, profundidad))}`, 10, 36);
  text(`D fractal   = log(3)/log(2) ≈ 1.585`, 10, 52);
  if (animando) {
    fill(80, 160, 80);
    text(`construyendo nivel ${nivActual}...`, 10, 68);
  }
  fill(120);
  text('↑↓ profundidad  |  ESPACIO: animar  |  C: color', 10, height - 10);
}
 
// Funcion Recursiva
function sierpinski(a, b, c, nivel) {
  if (nivel === 0) {
    // Caso base: dibujar triángulo relleno
    let t   = nivel; // para colorear por profundidad
    let col = colorPorNivel(nivel, profundidad);
    fill(col);
    stroke(col);
    strokeWeight(0.5);
    triangle(a.x, a.y, b.x, b.y, c.x, c.y);
    return;
  }
 
  // Puntos medios de cada lado
  let mAB = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  let mBC = { x: (b.x + c.x) / 2, y: (b.y + c.y) / 2 };
  let mCA = { x: (c.x + a.x) / 2, y: (c.y + a.y) / 2 };
 
  // Llamadas recursivas a los 3 sub-triángulos
  // (el triángulo central queda vacío — eso es Sierpinski)
  sierpinski(a,   mAB, mCA, nivel - 1);  // triángulo superior
  sierpinski(mAB, b,   mBC, nivel - 1);  // triángulo inferior izq
  sierpinski(mCA, mBC, c,   nivel - 1);  // triángulo inferior der
}
 
function colorPorNivel(nivel, maxNivel) {
  // Degradado azul → violeta según nivel
  let t = map(nivel, 0, maxNivel, 0, 1);
  return color(
    lerp(60, 160,  t),
    lerp(80, 60,   t),
    lerp(200, 220, t),
    200
  );
}
 
function keyPressed() {
  if (keyCode === UP_ARROW)   profundidad = min(profundidad + 1, 9);
  if (keyCode === DOWN_ARROW) profundidad = max(profundidad - 1, 1);
  if (key === ' ') { animando = true; frameAnim = 0; profundidad = min(profundidad, 7); }
}