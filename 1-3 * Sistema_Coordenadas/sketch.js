// CAPÍTULO 3 — Sistema de Coordenadas en p5.js
// Temas: origen (0,0), ejes X/Y, width/height, distancia

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(240);

  // ----------------------------------------------------------
  // EJE X — línea horizontal central
  // Definida por: y = height/2 (valor constante)
  // ----------------------------------------------------------
  stroke(220, 50, 50);
  strokeWeight(2);
  line(0, height / 2, width, height / 2);

  // Flecha eje X
  fill(220, 50, 50);
  noStroke();
  triangle(width - 5, height / 2 - 6,
           width - 5, height / 2 + 6,
           width + 5, height / 2);
  textSize(14);
  text("X", width - 18, height / 2 - 8);

  // ----------------------------------------------------------
  // EJE Y — línea vertical central
  // Definida por: x = width/2 (valor constante)
  // NOTA: en p5.js el eje Y crece hacia ABAJO (invertido)
  // ----------------------------------------------------------
  stroke(50, 50, 220);
  strokeWeight(2);
  line(width / 2, 0, width / 2, height);

  // Flecha eje Y
  fill(50, 50, 220);
  noStroke();
  triangle(width / 2 - 6, height - 5,
           width / 2 + 6, height - 5,
           width / 2,     height + 5);
  textSize(14);
  text("Y", width / 2 + 8, height - 5);

  // ----------------------------------------------------------
  // PUNTO EN EL CENTRO
  // Centro = (width/2, height/2) = punto medio del intervalo
  // Fórmula: (0 + width) / 2
  // ----------------------------------------------------------
  fill(0);
  noStroke();
  circle(width / 2, height / 2, 10);
  textSize(12);
  text("(" + width/2 + ", " + height/2 + ")", width/2 + 7, height/2 - 5);

  // ----------------------------------------------------------
  // CUATRO ESQUINAS DEL CANVAS
  // ----------------------------------------------------------
  let esquinas = [
    { x: 0,     y: 0,      label: "(0, 0)" },
    { x: width, y: 0,      label: "(w, 0)" },
    { x: 0,     y: height, label: "(0, h)" },
    { x: width, y: height, label: "(w, h)" }
  ];

  for (let e of esquinas) {
    fill(255, 140, 0);
    noStroke();
    circle(e.x, e.y, 10);
    fill(0);
    textSize(11);
    text(e.label, e.x + 5, e.y + 15);
  }

  // ----------------------------------------------------------
  // CUADRANTES — 4 divisiones del canvas
  // Centros: (w/4, h/4), (3w/4, h/4), (w/4, 3h/4), (3w/4, 3h/4)
  // ----------------------------------------------------------
  let centrosCuadrantes = [
    { x: width / 4,     y: height / 4,     n: "I" },
    { x: 3 * width / 4, y: height / 4,     n: "II" },
    { x: width / 4,     y: 3 * height / 4, n: "III" },
    { x: 3 * width / 4, y: 3 * height / 4, n: "IV" }
  ];

  for (let c of centrosCuadrantes) {
    fill(100, 200, 150, 120);
    noStroke();
    circle(c.x, c.y, 30);
    fill(60);
    textSize(13);
    textAlign(CENTER, CENTER);
    text(c.n, c.x, c.y);
    textAlign(LEFT, BASELINE);
  }

  // ----------------------------------------------------------
  // DIAGONAL — recta y = (height/width) * x
  // ----------------------------------------------------------
  stroke(150, 0, 150);
  strokeWeight(1);
  setLineDash([6, 4]); // línea punteada
  line(0, 0, width, height);
  setLineDash([]);

  // ----------------------------------------------------------
  // DISTANCIA DEL MOUSE AL CENTRO
  // d = sqrt((mouseX - cx)^2 + (mouseY - cy)^2)
  // ----------------------------------------------------------
  let cx = width / 2;
  let cy = height / 2;
  let d  = dist(mouseX, mouseY, cx, cy);

  // Línea del centro al mouse
  stroke(100);
  strokeWeight(1);
  line(cx, cy, mouseX, mouseY);

  // Punto en el mouse
  fill(255, 0, 0);
  noStroke();
  circle(mouseX, mouseY, 12);

  // ----------------------------------------------------------
  // PANEL DE INFORMACIÓN
  // ----------------------------------------------------------
  fill(0, 0, 0, 160);
  noStroke();
  rect(5, 5, 230, 70, 6);

  fill(255);
  textSize(12);
  noStroke();
  text("Mouse: (" + mouseX + ", " + mouseY + ")", 12, 22);
  text("Centro: (" + cx + ", " + cy + ")",         12, 40);
  text("Distancia al centro: " + nf(d, 1, 1),      12, 58);

  // Título
  fill(30);
  textSize(13);
  text("Sistema de Coordenadas p5.js — (0,0) esquina superior izquierda", 10, height - 10);
}

// Función auxiliar para líneas punteadas
function setLineDash(list) {
  drawingContext.setLineDash(list);
}
