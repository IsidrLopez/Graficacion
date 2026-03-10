// CAPÍTULO 4 — Colores y Estilos en p5.js
// Temas: RGB, HSB, fill, stroke, strokeWeight, degradado

function setup() {
  createCanvas(600, 420);
}

function draw() {
  background(245);

  
  // SECCIÓN 1 — Modelos de color
  // Color = (R, G, B)  donde  0 ≤ R,G,B ≤ 255
  // Total de colores posibles: 256^3 = 16,777,216
  // ----------------------------------------------------------
  fill(30);
  noStroke();
  textSize(13);
  text("Modelos de Color:", 10, 22);

  // Escala de grises
  for (let i = 0; i < 5; i++) {
    let gris = i * 63; // 0, 63, 126, 189, 252
    fill(gris);
    noStroke();
    rect(10 + i * 45, 30, 40, 30);
  }
  fill(80);
  textSize(10);
  text("Escala de grises", 10, 75);

  // Modelo RGB — colores primarios y mezclas
  let colores = [
    [255, 0,   0  ], // rojo
    [0,   255, 0  ], // verde
    [0,   0,   255], // azul
    [255, 255, 0  ], // amarillo
    [0,   255, 255], // cyan
    [255, 0,   255], // magenta
    [255, 165, 0  ], // naranja
    [128, 0,   128]  // morado
  ];
  for (let i = 0; i < colores.length; i++) {
    fill(colores[i][0], colores[i][1], colores[i][2]);
    noStroke();
    rect(10 + i * 45, 80, 40, 30);
  }
  fill(80);
  textSize(10);
  text("Modelo RGB", 10, 125);


  // SECCIÓN 2 — stroke(), fill(), strokeWeight()
  // ----------------------------------------------------------
  fill(30);
  textSize(13);
  text("stroke() / fill() / strokeWeight():", 10, 145);

  // Sin stroke
  noStroke();
  fill(255, 80, 80);
  rect(10, 150, 80, 50);
  fill(0); textSize(10); text("noStroke()", 15, 215);

  // Con stroke
  stroke(0);
  strokeWeight(1);
  fill(80, 80, 255);
  rect(100, 150, 80, 50);
  noStroke(); fill(0); textSize(10); text("stroke(1px)", 105, 215);

  // Stroke grueso
  stroke(200, 0, 0);
  strokeWeight(6);
  fill(255, 200, 0);
  rect(190, 150, 80, 50);
  noStroke(); fill(0); textSize(10); text("stroke(6px)", 195, 215);

  // Solo contorno, sin relleno
  stroke(0, 150, 0);
  strokeWeight(3);
  noFill();
  rect(280, 150, 80, 50);
  noStroke(); fill(0); textSize(10); text("noFill()", 285, 215);


  // SECCIÓN 3 — Modelo HSB
  // Hue = ángulo 0-360°, Saturation, Brightness
  // ----------------------------------------------------------
  fill(30);
  noStroke();
  textSize(13);
  text("Modelo HSB — Arco iris:", 10, 238);

  colorMode(HSB, 360, 100, 100); // activar modo HSB
  for (let i = 0; i < 360; i++) {
    stroke(i, 100, 100);
    strokeWeight(1);
    line(10 + i * (580 / 360), 245, 10 + i * (580 / 360), 280);
  }
  colorMode(RGB, 255); // volver a RGB

  fill(80);
  noStroke();
  textSize(10);
  text("Hue: 0° → 360°  (Saturación=100, Brillo=100)", 10, 295);


  // SECCIÓN 4 — Ejercicio bandera (3 franjas)
  // Dividimos el intervalo [0, height] en 3 partes iguales
  // Cada franja: height/3
  // ----------------------------------------------------------
  fill(30);
  textSize(13);
  text("Bandera — partición de intervalo en 3:", 10, 318);

  let bx = 10;
  let by = 325;
  let bw = 180;
  let bh = 75;

  noStroke();
  fill(0, 128, 0);  // verde
  rect(bx, by, bw, bh / 3);
  fill(255);        // blanco
  rect(bx, by + bh / 3, bw, bh / 3);
  fill(255, 0, 0);  // rojo
  rect(bx, by + (2 * bh) / 3, bw, bh / 3);

  // Degradado animado con ciclo
  fill(30);
  textSize(13);
  text("Degradado: Color(x) = (x/width)*255:", 210, 318);

  for (let i = 0; i < 370; i++) {
    let c = map(i, 0, 370, 0, 255);
    stroke(c, 80, 200 - c);
    strokeWeight(1);
    line(210 + i, 325, 210 + i, 400);
  }

  // Título
  noStroke();
  fill(30);
  textSize(11);
  text("Color = (R,G,B) | 256³ = 16,777,216 colores posibles", 10, height - 5);
}
