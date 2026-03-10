// CAPÍTULO 2 — La función draw() y el ciclo de animación
// Temas: draw(), frameRate, animación, rebote

// Variables globales — se mantienen entre frames
let x;          // posición X de la pelota
let y;          // posición Y de la pelota
let velX;       // velocidad en X (píxeles por frame)
let velY;       // velocidad en Y (píxeles por frame)
let radio;      // radio de la pelota

function setup() {
  createCanvas(600, 400);
  frameRate(60); // 60 frames por segundo → tiempo discreto

  // Valores iniciales
  x     = 300;
  y     = 200;
  velX  = 4;   // v = 4 píxeles/frame → x(t) = x0 + v*t
  velY  = 3;
  radio = 20;
}

function draw() {
  // Limpiar canvas cada frame → sin background() dejaría rastro
  // Matemáticamente: reiniciamos la matriz de píxeles
  background(30, 30, 50); // fondo oscuro

  // ----------------------------------------------------------
  // ANIMACIÓN — Movimiento Rectilíneo Uniforme (MRU)
  // x(t) = x0 + v * t   donde t = número de frame
  // Sucesión aritmética: x(n+1) = x(n) + velX
  // ----------------------------------------------------------
  x += velX;
  y += velY;

  // ----------------------------------------------------------
  // REBOTE EN LOS BORDES
  // Si la pelota toca el borde → invertir velocidad: v = -v
  // Tomamos en cuenta el radio para que rebote en el borde exacto
  // ----------------------------------------------------------
  if (x > width - radio || x < radio) {
    velX = -velX; // colisión elástica: cambia signo
  }
  if (y > height - radio || y < radio) {
    velY = -velY;
  }

  // ----------------------------------------------------------
  // DIBUJO DE LA PELOTA
  // ----------------------------------------------------------
  noStroke();
  fill(255, 80, 80); // rojo suave
  circle(x, y, radio * 2); // circle recibe diámetro = 2*radio

  // ----------------------------------------------------------
  // INFORMACIÓN EN PANTALLA
  // ----------------------------------------------------------
  fill(255);
  noStroke();
  textSize(13);
  text("FPS: "    + int(frameRate()), 10, 20);
  text("Frame: "  + frameCount,       10, 38);
  text("x = "     + int(x),           10, 56);
  text("y = "     + int(y),           10, 74);
  text("velX = "  + velX,             10, 92);
  text("velY = "  + velY,             10, 110);

  // Instrucción al usuario
  textSize(11);
  fill(180);
  text("Click: pausar/reanudar", 10, height - 10);
}

// ----------------------------------------------------------
// EVENTO — Pausar / reanudar con click del mouse
// mousePressed() es asíncrono: solo se ejecuta al hacer click
// ----------------------------------------------------------
let pausado = false;

function mousePressed() {
  if (pausado) {
    loop();      // reanuda draw()
    pausado = false;
  } else {
    noLoop();    // congela el tiempo discreto: t = constante
    pausado = true;
  }
}
