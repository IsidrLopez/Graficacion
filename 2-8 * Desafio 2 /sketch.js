// CAPÍTULO 8 — Desafío 2: Palabra interactiva
// Cada letra escala según su distancia al mouse

let palabra;
let letras;    // array con posición y tamaño de cada letra
let modoEfecto; // 0=escala, 1=color, 2=rotación
 
function setup() {
  createCanvas(700, 420);
  palabra     = 'GRAFICACION';
  modoEfecto  = 0;
  calcularPosiciones();
}
 
function calcularPosiciones() {
  letras = [];
  let anchoLetra = 52;
  let totalAncho = palabra.length * anchoLetra;
  let startX     = (width - totalAncho) / 2 + anchoLetra / 2;
 
  for (let i = 0; i < palabra.length; i++) {
    letras.push({
      char: palabra[i],
      x:    startX + i * anchoLetra,
      y:    height / 2,
    });
  }
}
 
function draw() {
  background(245);
 
  // Dibujar Cada Letra
  for (let l of letras) {
    let d = dist(mouseX, mouseY, l.x, l.y);
 
    if (modoEfecto === 0) {
      // Escala inversa a la distancia: más cerca = más grande
      let s = map(d, 0, 300, 3.5, 0.5, true);
      push();
        translate(l.x, l.y);
        scale(s);
        textFont('monospace');
        textSize(28);
        textAlign(CENTER, CENTER);
        fill(60, 130, 220);
        noStroke();
        text(l.char, 0, 0);
      pop();
 
    } else if (modoEfecto === 1) {
      // Color: del rojo (cerca) al azul (lejos)
      let r = map(d, 0, 300, 220,  60, true);
      let g = map(d, 0, 300,  60, 130, true);
      let b = map(d, 0, 300,  60, 220, true);
      let s = map(d, 0, 300, 2.0, 0.8, true);
      push();
        translate(l.x, l.y);
        scale(s);
        textFont('monospace');
        textSize(28);
        textAlign(CENTER, CENTER);
        fill(r, g, b);
        noStroke();
        text(l.char, 0, 0);
      pop();
 
    } else {
      // Rotación: las letras apuntan hacia el mouse
      let angHacia = atan2(mouseY - l.y, mouseX - l.x);
      let s        = map(d, 0, 300, 2.5, 0.8, true);
      push();
        translate(l.x, l.y);
        rotate(angHacia + HALF_PI); // girar hacia el mouse
        scale(s);
        textFont('monospace');
        textSize(28);
        textAlign(CENTER, CENTER);
        fill(80, 180, 80);
        noStroke();
        text(l.char, 0, 0);
      pop();
    }
  }
 
  // Cursor Personalizado
  stroke(220, 80, 80, 160);
  strokeWeight(1);
  noFill();
  circle(mouseX, mouseY, 24);
  line(mouseX - 14, mouseY, mouseX + 14, mouseY);
  line(mouseX, mouseY - 14, mouseX, mouseY + 14);
 
  // HUD
  noStroke();
  fill(40);
  textAlign(LEFT);
  textSize(11);
  textFont('monospace');
  let modos = ['escala por distancia', 'color por distancia', 'rotación hacia mouse'];
  text(`modo: {modos[modoEfecto]}`, 10, 20);
  fill(120);
  text('M: cambiar modo  |  mueve el mouse', 10, height - 10);
}
 
function keyPressed() {
  if (key === 'm' || key === 'M') modoEfecto = (modoEfecto + 1) % 3;
}
 