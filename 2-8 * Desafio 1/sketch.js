// CAPÍTULO 8 — Desafío 1: Texto con transformaciones 2D
// Texto sujeto a translate, rotate y scale igual que figuras

let theta;     // ángulo de rotación
let s;         // escala
let tx, ty;    // traslación
let omega;     // velocidad angular
 
function setup() {
  createCanvas(700, 440);
  theta = 0;
  s     = 1.0;
  tx    = width  / 2;
  ty    = height / 2;
  omega = 0.02;
}
 
function draw() {
  background(245);
 
  theta += omega;
 
  // Texto Orbitando (translate + rotate)
  // 3 palabras orbitando alrededor del centro a distintas velocidades
  let palabras = [
    { txt: 'TRASLACIÓN',  r: 140, vel: 1.0,  sz: 14, c: color(60, 130, 220) },
    { txt: 'ROTACIÓN',    r:  90, vel: 1.6,  sz: 13, c: color(220, 100, 60) },
    { txt: 'ESCALAMIENTO',r: 185, vel: 0.7,  sz: 12, c: color(80, 180, 80)  },
  ];
 
  for (let p of palabras) {
    push();
      translate(tx, ty);
      rotate(theta * p.vel);
      translate(p.r, 0);     // desplazar al radio de órbita
      rotate(theta * p.vel); // rotar el texto sobre sí mismo
      scale(s);
      textFont('monospace');
      textSize(p.sz);
      textAlign(CENTER, CENTER);
      fill(p.c);
      noStroke();
      text(p.txt, 0, 0);
    pop();
  }
 
  // Texto Central Pulsante
  let sp = 1 + 0.15 * sin(theta * 3);
  push();
    translate(tx, ty);
    scale(sp);
    textFont('monospace');
    textSize(22);
    textAlign(CENTER, CENTER);
    fill(40);
    noStroke();
    text('TEXTO 2D', 0, 0);
  pop();
 
  // Texto Siguiendo una Trayectoria Circular
  let frase   = 'GRAFICACIÓN • UNIDAD 2 • ';
  let radioT  = 210;
  let nLetras = frase.length;
 
  for (let i = 0; i < nLetras; i++) {
    let ang = theta * 0.4 + map(i, 0, nLetras, 0, TWO_PI);
    push();
      translate(tx, ty);
      rotate(ang);
      translate(0, -radioT);
      rotate(HALF_PI); // enderezar la letra
      textFont('monospace');
      textSize(11);
      textAlign(CENTER, CENTER);
      fill(160, 120, 200);
      noStroke();
      text(frase[i], 0, 0);
    pop();
  }
 
  // HUD
  noStroke();
  fill(40);
  textAlign(LEFT);
  textSize(11);
  textFont('monospace');
  text(`θ = ${nf(theta % TWO_PI, 1, 2)} rad`, 10, 20);
  text(`s = ${nf(s, 1, 2)}`, 10, 36);
  fill(120);
  text('↑↓ escala  |  ←→ velocidad  |  R: reset', 10, height - 10);
}
 
function keyPressed() {
  if (keyCode === UP_ARROW)    s     = min(s + 0.1, 3);
  if (keyCode === DOWN_ARROW)  s     = max(s - 0.1, 0.2);
  if (keyCode === RIGHT_ARROW) omega = min(omega + 0.005, 0.1);
  if (keyCode === LEFT_ARROW)  omega = max(omega - 0.005, 0.002);
  if (key === 'r' || key === 'R') { theta = 0; s = 1; omega = 0.02; }
}