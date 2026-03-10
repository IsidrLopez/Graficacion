// CAPÍTULO 8 — Suavizado y Calidad Visual
// Temas: smooth(), noSmooth(), aliasing, anti-aliasing


function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(240);

  // ----------------------------------------------------------
  // TÍTULO
  // ----------------------------------------------------------
  fill(30);
  noStroke();
  textSize(14);
  text("Suavizado y Calidad Visual: smooth() vs noSmooth()", 10, 22);

  // ----------------------------------------------------------
  // LADO IZQUIERDO — CON smooth() (anti-aliasing activado)
  // El navegador interpola colores en los bordes:
  // Color_nuevo = α·C1 + (1-α)·C2   donde α ∈ [0,1]
  // ----------------------------------------------------------
  fill(100, 150, 255, 80);
  noStroke();
  rect(10, 35, 280, 340, 6);

  fill(30);
  textSize(13);
  noStroke();
  text("smooth()  ← activado por defecto", 20, 55);

  smooth(); // activar interpolación

  // Líneas diagonales suaves
  stroke(50, 80, 200);
  strokeWeight(3);
  for (let i = 0; i < 6; i++) {
    line(20 + i * 40, 65, 20 + i * 40 + 30, 130);
  }
  noStroke(); fill(80); textSize(10);
  text("Líneas diagonales suaves", 20, 145);

  // Círculos suaves
  stroke(200, 50, 50);
  strokeWeight(2);
  noFill();
  for (let i = 0; i < 4; i++) {
    circle(40 + i * 60, 195, 30 + i * 10);
  }
  noStroke(); fill(80); textSize(10);
  text("Círculos con bordes suavizados", 20, 225);

  // Línea curva suave
  stroke(50, 180, 80);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let x = 15; x < 280; x += 5) {
    let y = 270 + 25 * sin((x - 15) * 0.05);
    curveVertex(x, y);
  }
  endShape();
  noStroke(); fill(80); textSize(10);
  text("Curva con anti-aliasing", 20, 310);

  // ----------------------------------------------------------
  // LADO DERECHO — CON noSmooth() (sin interpolación)
  // Cada píxel se activa sin mezcla de colores
  // Resultado: bordes "escalonados" (aliasing)
  // Útil para: pixel-art, gráficos retro, precisión de píxel
  // ----------------------------------------------------------
  fill(255, 200, 100, 80);
  noStroke();
  rect(305, 35, 285, 340, 6);

  fill(30);
  textSize(13);
  noStroke();
  text("noSmooth()  ← bordes escalonados", 315, 55);

  noSmooth(); // desactivar interpolación

  stroke(50, 80, 200);
  strokeWeight(3);
  for (let i = 0; i < 6; i++) {
    line(315 + i * 40, 65, 315 + i * 40 + 30, 130);
  }
  noStroke(); fill(80); textSize(10);
  text("Líneas diagonales escalonadas", 315, 145);

  stroke(200, 50, 50);
  strokeWeight(2);
  noFill();
  for (let i = 0; i < 4; i++) {
    circle(335 + i * 60, 195, 30 + i * 10);
  }
  noStroke(); fill(80); textSize(10);
  text("Círculos con bordes dentados", 315, 225);

  stroke(50, 180, 80);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let x = 310; x < 580; x += 5) {
    let y = 270 + 25 * sin((x - 310) * 0.05);
    curveVertex(x, y);
  }
  endShape();
  noStroke(); fill(80); textSize(10);
  text("Curva con aliasing visible", 315, 310);

  // Volver a smooth para el resto de elementos UI
  smooth();

  // ----------------------------------------------------------
  // CONCEPTO MATEMÁTICO — interpolación de color
  // Color_nuevo = α·C1 + (1-α)·C2
  // ----------------------------------------------------------
  fill(30);
  noStroke();
  textSize(12);
  text("Interpolación: C_nuevo = α·C1 + (1-α)·C2", 10, height - 28);

  // Demostración visual de interpolación
  for (let i = 0; i < 20; i++) {
    let alpha = i / 19.0;
    let r = int(alpha * 255 + (1 - alpha) * 50);
    let g = int(alpha * 80  + (1 - alpha) * 180);
    let b = int(alpha * 50  + (1 - alpha) * 255);
    fill(r, g, b);
    noStroke();
    rect(10 + i * 29, height - 20, 28, 14);
  }

  // Etiquetas interpolación
  fill(80);
  textSize(10);
  text("C1=(255,80,50)", 10, height - 4);
  text("C2=(50,180,255)", 530, height - 4);
}
