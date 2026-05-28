// ════════════════════════════════════════════════════════════════════════════
// Proyecto Integrador — Unidad 5
// Graficación con p5.js — Animación e Interacción
// Simulador de Partículas + Escena 3D Animada
//
// Alumno : Isidro López Pacheco
// No. Ctrl: 24170608
// Materia : Graficación — ITC 2026
// Docente : Dr. Juan Gabriel Loaiza
//
// CONTROLES:
//   Mouse          → mueve la luz puntual (modo 3D)
//   Clic           → agrega partícula en modo 2D
//   W/A/S/D        → mueve la nave (modo 2D)
//   Tecla ESPACIO  → cambia entre modo 2D y modo 3D
//   Tecla C        → cambia color de las partículas
//   Tecla R        → reinicia las partículas
// ════════════════════════════════════════════════════════════════════════════

// ── Variables globales ───────────────────────────────────────────────────────
let modo3D     = false;   // alterna entre escena 2D y 3D
let particulas = [];      // sistema de partículas
let naveX, naveY;         // posición de la nave (modo 2D)
let naveVX = 0, naveVY = 0; // velocidad de la nave
let colorIdx   = 0;        // índice de paleta de color
let anguloRot  = 0;        // ángulo acumulado para objetos 3D
let targetX, targetY;      // posición objetivo (interpolación lerp)

// Paleta de colores para partículas
const PALETAS = [
  [255, 100, 100],   // rojo
  [100, 200, 255],   // azul cielo
  [100, 255, 150],   // verde neón
  [255, 220, 80],    // amarillo
  [200, 100, 255],   // violeta
];

// ════════════════════════════════════════════════════════════════════════════
// SETUP
// ════════════════════════════════════════════════════════════════════════════
function setup() {
  createCanvas(800, 500);   // inicia en modo 2D
  colorMode(RGB, 255);
  naveX = width  / 2;
  naveY = height / 2;
  targetX = naveX;
  targetY = naveY;

  // Crear partículas iniciales
  for (let i = 0; i < 40; i++) {
    particulas.push(nuevaParticula(random(width), random(height)));
  }
}

// ════════════════════════════════════════════════════════════════════════════
// DRAW — loop principal
// ════════════════════════════════════════════════════════════════════════════
function draw() {
  if (modo3D) {
    dibujar3D();
  } else {
    dibujar2D();
  }
}

// ════════════════════════════════════════════════════════════════════════════
// ESCENA 2D — simulador de partículas + nave interactiva
// ════════════════════════════════════════════════════════════════════════════
function dibujar2D() {
  // Trail / ghost frame: fondo semitransparente para efecto estela
  background(10, 10, 25, 40);   // alpha bajo = trail visible

  // ── Partículas ────────────────────────────────────────────────────────────
  for (let i = particulas.length - 1; i >= 0; i--) {
    let p = particulas[i];

    // Actualizar posición
    p.x += p.vx;
    p.y += p.vy;
    p.vida -= 1;
    p.r = lerp(p.r, 0, 0.015);  // interpolación: reduce radio suavemente

    // Cambio de color interpolado con lerp
    let col = PALETAS[colorIdx];
    let alpha = map(p.vida, 0, p.vidaMax, 0, 220);

    // Dibujar partícula
    noStroke();
    fill(col[0], col[1], col[2], alpha);
    ellipse(p.x, p.y, p.r * 2);

    // Gravedad suave hacia el centro
    p.vx += (width  / 2 - p.x) * 0.0003;
    p.vy += (height / 2 - p.y) * 0.0003;

    // Rebotar en bordes
    if (p.x < 0 || p.x > width)  p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    // Eliminar si muerta; reemplazar con nueva
    if (p.vida <= 0 || p.r < 1) {
      particulas[i] = nuevaParticula(random(width), random(height));
    }
  }

  // ── Nave (controlada con WASD) ───────────────────────────────────────────
  moverNave();

  // Interpolación lerp: movimiento suave de la nave hacia el objetivo
  naveX = lerp(naveX, targetX, 0.12);
  naveY = lerp(naveY, targetY, 0.12);

  dibujarNave(naveX, naveY);

  // ── HUD 2D ────────────────────────────────────────────────────────────────
  fill(180, 200, 255);
  noStroke();
  textSize(11);
  textFont('monospace');
  text('[WASD] Mover nave   [Clic] Nueva particula', 10, 18);
  text('[C] Cambiar color   [R] Reiniciar   [ESPACIO] Modo 3D', 10, 34);
  text('Particulas: ' + particulas.length, 10, 50);

  fill(100, 160, 255);
  text('Isidro Lopez Pacheco — 24170608 — ITC 2026', 10, height - 10);
}

// ── Crear una partícula nueva ─────────────────────────────────────────────
function nuevaParticula(x, y) {
  let angulo = random(TWO_PI);
  let vel    = random(0.5, 3);
  return {
    x: x, y: y,
    vx: cos(angulo) * vel,
    vy: sin(angulo) * vel,
    r:  random(4, 18),
    vida:    random(80, 200),
    vidaMax: 200,
  };
}

// ── Control WASD de la nave ───────────────────────────────────────────────
function moverNave() {
  let vel = 4;
  if (keyIsDown(65)) targetX -= vel;  // A
  if (keyIsDown(68)) targetX += vel;  // D
  if (keyIsDown(87)) targetY -= vel;  // W
  if (keyIsDown(83)) targetY += vel;  // S
  // Limitar a canvas
  targetX = constrain(targetX, 20, width  - 20);
  targetY = constrain(targetY, 20, height - 20);
}

// ── Dibujar nave triangular ───────────────────────────────────────────────
function dibujarNave(x, y) {
  push();
  translate(x, y);

  // Brillo pulsante usando sin() + frameCount
  let brillo = 150 + 105 * sin(frameCount * 0.08);

  // Contorno brillante
  stroke(100, 200, brillo);
  strokeWeight(1.5);
  fill(30, 80, 120, 200);

  // Triángulo de la nave
  beginShape();
  vertex(0, -22);   // punta
  vertex(-14, 14);  // base izquierda
  vertex(14, 14);   // base derecha
  endShape(CLOSE);

  // Motor (rectángulo pequeño)
  fill(brillo, 150, 50, 180);
  noStroke();
  rect(-5, 12, 10, 7, 2);

  // Cabina (elipse)
  fill(180, 230, 255, 160);
  ellipse(0, 0, 10, 14);

  pop();
}

// ════════════════════════════════════════════════════════════════════════════
// ESCENA 3D — objetos animados con iluminación e interpolación
// ════════════════════════════════════════════════════════════════════════════
function dibujar3D() {
  // Para modo 3D necesitamos un canvas WEBGL
  // Cuando se activa se recreará el canvas
  background(5, 5, 20);

  // orbitControl() para rotar cámara con mouse
  orbitControl();

  // ── ILUMINACIÓN ──────────────────────────────────────────────────────────
  ambientLight(50);
  directionalLight(255, 240, 200, 1, 1, -1);
  pointLight(255, 220, 180,
    mouseX - width / 2,
    mouseY - height / 2,
    300);

  // ── ANIMACIÓN con frameCount e interpolación ──────────────────────────────
  anguloRot += 0.012;

  // ── OBJETO 1: ESFERA oscilante con sin() ──────────────────────────────────
  push();
  let ex = sin(frameCount * 0.02) * 200;   // interpolación sinusoidal
  translate(ex, -80, 0);
  rotateY(frameCount * 0.03);
  specularMaterial(100, 200, 255);
  shininess(80);
  noStroke();
  sphere(55);
  pop();

  // ── OBJETO 2: CUBO rotando con lerp de escala ─────────────────────────────
  push();
  translate(0, 60, 0);
  rotateX(frameCount * 0.015);
  rotateY(frameCount * 0.02);
  // Escala interpolada: pulso suave
  let sc = lerp(0.9, 1.1, (sin(frameCount * 0.04) + 1) / 2);
  scale(sc);
  ambientMaterial(200, 80, 80);
  noStroke();
  box(110);
  pop();

  // ── OBJETO 3: TOROIDE con normalMaterial ──────────────────────────────────
  push();
  translate(0, 0, 0);
  rotateX(HALF_PI * 0.4);
  rotateZ(frameCount * 0.008);
  normalMaterial();
  noStroke();
  torus(160, 10);
  pop();

  // ── OBJETO 4: CONO (partícula grande) ────────────────────────────────────
  push();
  let cy = lerp(-150, 150, (sin(frameCount * 0.025) + 1) / 2); // tween Y
  translate(180, cy, 0);
  rotateX(frameCount * 0.02);
  specularMaterial(255, 220, 80);
  shininess(120);
  noStroke();
  cone(35, 80);
  pop();

  // ── HUD 3D (texto 2D sobre escena 3D) ────────────────────────────────────
  // Usamos una capa separada con el canvas 2D auxiliar para evitar conflictos
  drawHUD3D();
}

function drawHUD3D() {
  // Texto directo sin ortho() para evitar pantalla en blanco
  push();
  translate(-width / 2 + 10, -height / 2 + 15, 200);
  fill(170, 210, 255);
  noStroke();
  textSize(11);
  textFont('monospace');
  text('[ESPACIO] Volver a 2D  |  [Drag] Rotar camara  |  [Scroll] Zoom', 0, 0);
  text('Mouse → Luz puntual dinamica', 0, 16);
  pop();

  push();
  translate(-width / 2 + 10, height / 2 - 15, 200);
  fill(100, 160, 255);
  noStroke();
  textSize(11);
  textFont('monospace');
  text('Isidro Lopez Pacheco — 24170608 — ITC 2026', 0, 0);
  pop();
}

// ════════════════════════════════════════════════════════════════════════════
// INTERACCIÓN
// ════════════════════════════════════════════════════════════════════════════
function keyPressed() {
  // ESPACIO → cambiar entre modo 2D y 3D (recrear canvas)
  if (key === ' ') {
    modo3D = !modo3D;
    if (modo3D) {
      createCanvas(800, 500, WEBGL);
    } else {
      createCanvas(800, 500);
      colorMode(RGB, 255);
    }
  }

  // C → cambiar paleta de colores
  if (key === 'C' || key === 'c') {
    colorIdx = (colorIdx + 1) % PALETAS.length;
  }

  // R → reiniciar partículas
  if (key === 'R' || key === 'r') {
    particulas = [];
    for (let i = 0; i < 40; i++) {
      particulas.push(nuevaParticula(random(width), random(height)));
    }
  }
}

// Clic → agregar partícula en modo 2D
function mousePressed() {
  if (!modo3D) {
    for (let i = 0; i < 8; i++) {
      particulas.push(nuevaParticula(mouseX, mouseY));
    }
  }
}