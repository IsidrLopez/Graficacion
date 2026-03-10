// CAPÍTULO 1 — Fundamentos de p5.js
// Temas: setup(), createCanvas(), background(), width, height

function setup() {
  // Creamos el canvas de 600x400 píxeles
  // El canvas es un plano cartesiano donde (0,0) está en la esquina superior izquierda
  createCanvas(600, 400);

  // background() pinta todos los píxeles del canvas con el color indicado
  background(200); // gris medio → RGB(200, 200, 200)
}

function draw() {
  // Fondo gris claro
  background(220);

  // EJERCICIO 1 — Línea diagonal de esquina a esquina
  // Matemáticamente: recta de (0,0) → (width, height)
  // ----------------------------------------------------------
  stroke(0);          // color negro para el contorno
  strokeWeight(2);    // grosor de 2 píxeles
  line(0, 0, width, height);

  // EJERCICIO 2 — Línea horizontal por el centro
  // La ecuación es: y = height/2 (línea constante)
  // ----------------------------------------------------------
  stroke(200, 0, 0);  // rojo
  strokeWeight(3);
  line(0, height / 2, width, height / 2);

  
  // EJERCICIO 3 — Línea vertical por el centro
  // La ecuación es: x = width/2 (línea constante)
  // ----------------------------------------------------------
  stroke(0, 0, 200);  // azul
  strokeWeight(3);
  line(width / 2, 0, width / 2, height);

  // EJERCICIO 4 — Punto exactamente en el centro
  // Centro = (width/2, height/2) → punto medio del intervalo
  // Fórmula: (0 + width) / 2
  // ----------------------------------------------------------
  stroke(255, 150, 0); // naranja
  strokeWeight(12);
  point(width / 2, height / 2);

  // EJERCICIO 5 — Puntos en las 4 esquinas
  // Esquinas del canvas:
  //   Superior izquierda → (0, 0)
  //   Superior derecha   → (width, 0)
  //   Inferior izquierda → (0, height)
  //   Inferior derecha   → (width, height)
  // ----------------------------------------------------------
  stroke(0, 180, 0);  // verde
  strokeWeight(14);
  point(0, 0);
  point(width, 0);
  point(0, height);
  point(width, height);

  // Etiquetas de las esquinas (texto informativo)
  noStroke();
  fill(0);
  textSize(12);
  text("(0,0)",        5,          15);
  text("(w,0)",        width - 40, 15);
  text("(0,h)",        5,          height - 5);
  text("(w,h)",        width - 40, height - 5);
  text("Centro",       width / 2 + 5, height / 2 - 5);
}