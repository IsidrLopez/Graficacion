// CAPÍTULO 7 — Desafío 2: Factor de reducción variable
// + color por profundidad + mouse controla ángulo

let profundidad;
let factor;
let angIzq, angDer;
let modoColor; // 0=mono, 1=profundidad, 2=arcoíris
 
function setup() {
  createCanvas(700, 520);
  profundidad = 8;
  factor      = 0.67;
  modoColor   = 1;
  actualizarAngulos();
}
 
function actualizarAngulos() {
  // Ángulo controlado por mouseX
  let ang = map(mouseX, 0, width, PI / 8, PI / 2.5);
  angIzq  = -ang;
  angDer  =  ang;
}
 
function draw() {
  background(30, 35, 45); // fondo oscuro para resaltar colores
 
  actualizarAngulos();
 
  push();
    translate(width / 2, height - 10);
    arbol(100, profundidad);
  pop();
 
  // HUD
  noStroke();
  fill(200);
  textSize(11);
  textFont('monospace');
  text(`profundidad = ${profundidad}`, 10, 20);
  text(`factor r    = ${nf(factor, 1, 2)}`, 10, 36);
  text(`ángulo      = ${nf(degrees(-angIzq), 1, 1)}°`, 10, 52);
  text(`Ln = r^n * L0 = ${nf(pow(factor, profundidad) * 100, 1, 2)}px`, 10, 68);
 
  fill(120);
  text('↑↓ profundidad  |  ←→ factor  |  mouse: ángulo  |  C: color', 10, height - 10);
 
  // Leyenda modo color
  fill(modoColor === 1 ? 100 : 60, modoColor === 1 ? 200 : 60, modoColor === 1 ? 100 : 60);
  text(`modo color: ${['monocromático','por profundidad','arcoíris'][modoColor]}`, 10, 84);
}
 
function arbol(len, nivel) {
  if (nivel === 0 || len < 2) return;
 
  // Color por Profundiad
  let c;
  if (modoColor === 0) {
    // Monocromático: blanco con opacidad según nivel
    c = color(220, 220, 220, map(nivel, 0, profundidad, 60, 255));
  } else if (modoColor === 1) {
    // Profundidad: raíz=marrón, hojas=verde brillante
    let t = map(nivel, 0, profundidad, 0, 1);
    c = color(
      lerp(200, 80,  t),
      lerp(120, 220, t),
      lerp( 50,  60, t),
      map(nivel, 0, profundidad, 120, 255)
    );
  } else {
    // Arcoíris: hue según nivel
    colorMode(HSB, 360, 100, 100, 100);
    c = color(map(nivel, 0, profundidad, 0, 280), 80, 90,
              map(nivel, 0, profundidad, 40, 100));
    colorMode(RGB, 255);
  }
 
  stroke(c);
  strokeWeight(map(nivel, 0, profundidad, 0.5, profundidad * 0.5));
 
  // Dibujar rama
  line(0, 0, 0, -len);
  translate(0, -len);
 
  // Hojas en el nivel más bajo
  if (nivel === 1) {
    noStroke();
    fill(80, 200, 80, 120);
    ellipse(0, 0, 10, 14);
    return;
  }
 
  // Ramas hijas con factor de reducción
  push(); rotate(angIzq); arbol(len * factor, nivel - 1); pop();
  push(); rotate(angDer);  arbol(len * factor, nivel - 1); pop();
}
 
function keyPressed() {
  if (keyCode === UP_ARROW)    profundidad = min(profundidad + 1, 11);
  if (keyCode === DOWN_ARROW)  profundidad = max(profundidad - 1, 2);
  if (keyCode === RIGHT_ARROW) factor      = min(factor + 0.02, 0.9);
  if (keyCode === LEFT_ARROW)  factor      = max(factor - 0.02, 0.3);
  if (key === 'c' || key === 'C') modoColor = (modoColor + 1) % 3;
}
 