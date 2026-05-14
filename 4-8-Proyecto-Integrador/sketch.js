// ════════════════════════════════════════════════════════════════════════════
// Proyecto Integrador — Unidad 4
// Graficación con p5.js — Iluminación y Sombreado 3D
// Sistema Solar 3D: Sol · Planeta · Luna · Toroide
//
// Alumno : Isidro López Pacheco
// No. Ctrl: 24170608
// Materia : Graficación — ITC 2026
// Docente : Dr. Juan Gabriel Loaiza
// ════════════════════════════════════════════════════════════════════════════
 
let anguloOrb   = 0;
let anguloLuna  = 0;
let moverLuz    = true;
let pausado     = false;
let planetaMate = true;
 
function setup() {
  createCanvas(800, 500, WEBGL);
}
 
function draw() {
  background(5, 5, 20);
  orbitControl();
 
  // ── ILUMINACIÓN ──────────────────────────────────────────────────────────
  ambientLight(45);
 
  directionalLight(255, 240, 200, 1, 1, -1);
 
  if (moverLuz) {
    pointLight(255, 220, 180, mouseX - width / 2, mouseY - height / 2, 300);
  } else {
    pointLight(255, 220, 180, 0, -200, 300);
  }
 
  // ── ANIMACIÓN ────────────────────────────────────────────────────────────
  if (!pausado) {
    anguloOrb  += 0.012;
    anguloLuna += 0.040;
  }
 
  // ── SOL ──────────────────────────────────────────────────────────────────
  push();
  rotateY(frameCount * 0.008);
  scale(1 + 0.05 * sin(frameCount * 0.03));
  specularMaterial(255, 240, 100);
  shininess(150);
  noStroke();
  sphere(90);
  pop();
 
  // ── PLANETA ──────────────────────────────────────────────────────────────
  push();
  rotateY(anguloOrb);
  translate(220, 0, 0);
  rotateY(frameCount * 0.022);
 
  if (planetaMate) {
    ambientMaterial(60, 140, 220);
  } else {
    specularMaterial(80, 160, 240);
    shininess(60);
  }
  noStroke();
  sphere(45);
 
  // ── LUNA (anidada en el planeta) ─────────────────────────────────────────
  push();
  rotateY(anguloLuna);
  translate(72, 0, 0);
  specularMaterial(200, 200, 220);
  shininess(40);
  sphere(18);
  pop();
 
  pop();
 
  // ── TOROIDE ──────────────────────────────────────────────────────────────
  push();
  rotateX(HALF_PI * 0.35);
  rotateZ(frameCount * 0.005);
  normalMaterial();
  noStroke();
  torus(170, 8);
  pop();
}
 
function keyPressed() {
  if (key === 'L' || key === 'l') moverLuz    = !moverLuz;
  if (key === 'P' || key === 'p') pausado     = !pausado;
  if (key === 'M' || key === 'm') planetaMate = !planetaMate;
}