let estrellas = [];
let nubes     = [];
let corriendo = true;
let esNoche   = true;

function setup() {
  createCanvas(700,420);
  smooth();

  for (let i = 0; i < 80; i++) {
    estrellas.push({
      x:    random(width),
      y:    random(height * 0.62),
      r:    random(1, 3),
      fase: random(TWO_PI)       // fase aleatoria para el parpadeo
    });
  }

  // Generar 3 nubes con distintas velocidades
  for (let i = 0; i < 3; i++) {
    nubes.push({
      x:   random(width),
      y:   random(40, 120),
      vel: random(0.3, 0.8)
    });
  }
}

function draw() {
  let viento = (mouseX / width - 0.5) * 20;
  
  // Cielo
  if (esNoche) {
    // Cielo Nocturno
    for (let y = 0; y < height * 0.7; y++){
      let t = y / (height * 0.7);
      stroke(lerpColor(color(10, 15, 40), color (30, 20, 60), t));
      line(0, y, width, y);
    }
  } else {
    // Cielo diurno degradado azul
    for (let y = 0; y < height * 0.7; y++){
      let t = y / (height * 0.7);
      stroke(lerpColor(color(100, 180, 255), color (180, 220, 255), t));
      line(0, y, width, y);
    }
  }

// Estrellas (solo de noche)
if(esNoche){
  estrellas.forEach(s => {
    let brillo = map(sin(frameCount * 0.05 + s.fase), -1, 1, 120, 255);
    stroke(brillo);
    strokeWeight(s.r);
    point(s.x, s.y);
  });
}
 // Luna o Sol
 if (esNoche){
  noStroke();
  fill(255, 248, 200);
  circle(580, 70, 80);
  fill(25, 18, 50);
  circle(600, 65, 70);
 } else {
  // Sol con rayos animados
  noStroke();
  fill(255, 220, 50);
  circle(580, 70, 80);
  // Rayos
  stroke(255, 220, 50, 180);
  strokeWeight(2);
  for (let i = 0; i < 8; i++){
    let a = (TWO_PI / 8) * i + frameCount * 0.01;
    let ini = 45;
    let fin = 58 + sin(frameCount * 0.05 + i ) * 4;
    line(
      580 + ini * cos(a), 70 + ini * sin(a),
      580 + fin * cos(a), 70 + fin * sin(a)
    );
  }
 }

  // Nubes
  nubes.forEach(n => {
    n.x += n.vel + viento * 0.1;
    if (n.x > width + 100) n.x = -100;
    if (n.x < -100)        n.x = width + 100;
    dibujarNube(n.x, n.y, esNoche);
  });

  // Terreno
  noStroke();
  fill(esNoche ? color(20, 50, 30) : color(80, 160, 60));
  rect(0, height * 0.68, width, height * 0.32);

  // Arboles con viento
    dibujarArbol(80,  height * 0.68, viento, true,  esNoche);
    dibujarArbol(160, height * 0.68, viento, false, esNoche);
    dibujarArbol(530, height * 0.68, viento, true,  esNoche);
    dibujarArbol(620, height * 0.68, viento, false, esNoche);

  // Casa
  dibujarCasa(280, height * 0.68, esNoche);

  // Reloj analogico
  dibujarReloj(100, 100, 55);

  // Informacion en pantalla
  noStroke();
  fill(255, 255, 255, 70);
  textFont('monospace'); 
  textSize(11);
  textAlign(LEFT, TOP);
  text('viento: '+ (viento > 0 ? '->' : '<-') + nf(abs(viento), 1, 1), 12, 12);
  text('frame:  '+ frameCount, 12, 28);
  text('clic -> pausar / reanudar', 12, 44);
  text('D = dia | N = noche', 12, 60);
}

// Reloj
function dibujarReloj(cx, cy, r) {
  noFill();
  stroke(255, 255, 255, 120);
  strokeWeight(2);
  circle(cx, cy, r * 2);

// 12 marcas de hora
  for (let i = 0; i < 12; i++) {
    let a     = (TWO_PI / 12) * i - HALF_PI;
    let largo = (i % 3 === 0) ? 10 : 5;
    stroke(255, 255, 255, 150);
    strokeWeight(i % 3 === 0 ? 2 : 1);
    line(
      cx + (r - largo) * cos(a), cy + (r - largo) * sin(a),
      cx +  r          * cos(a), cy +  r          * sin(a)
    )};


  // Angulos con hora real del sistema
  let s = (second() / 60)       * TWO_PI - HALF_PI;
  let m = (minute() / 60)       * TWO_PI - HALF_PI;
  let h = ((hour() % 12) / 12)    * TWO_PI - HALF_PI
          + (minute() / 60) * (TWO_PI / 12);
  
  // Manecilla horaria
  stroke(255, 255, 255, 200);
  strokeWeight(4);
  line(cx, cy, cx + r * 0.5 * cos(h), cy + r * 0.5 *  sin(h));

  // Manecilla minutera
  stroke(255, 255, 255, 220);
  strokeWeight(3);
  line(cx, cy, cx + r * 0.75 * cos(m), cy + r * 0.75 *  sin(m));

  // Segundero
  stroke(255, 80, 80, 230);
  strokeWeight(1.5);
  line(cx, cy, cx + r * 0.9 * cos(s), cy + r * 0.9 *  sin(s));
  
  // Centro
  fill(255);
  noStroke();
  circle(cx, cy, 6);
} 

// Funciones Auxiliares
function dibujarNube(x, y, noche){
  noStroke(); 
  fill(noche ? color(200, 200, 230, 60) : color(255, 255, 255, 220));
  ellipse(x,    y,    80, 40);
  ellipse(x + 30, y - 15, 60, 40);
  ellipse(x - 25, y - 10, 50, 35);
}

function dibujarArbol(x, baseY, viento, grande, noche){
  let h = grande ? 120: 90;
  let incl = sin(frameCount * 0.03) * 3 + viento * 0.4;

  // Tronco
  stroke(noche ? color(80, 55, 35) : color(120, 80, 40)); 
  strokeWeight(6);
  line(x, baseY, x + incl, baseY - h);

  // Copa
  noStroke(); 
  fill(20, 100, 50);
  triangle(
    x + incl,       baseY - h,
    x + incl - 35,  baseY - h + 80,
    x + incl + 35,  baseY - h + 80
);
}

// Casa
function dibujarCasa(x, baseY, noche){
  // Cuerpo
  fill(noche ? color(180, 140, 100) : color (230, 190, 150));
  noStroke();
  rect(x, baseY - 100, 140, 100);

  // Techo
  fill(160, 60, 60);
  triangle(
    x - 10,  baseY - 100,
    x + 150, baseY - 100,
    x + 70,  baseY - 165
  );

  // Puerta
  fill(100, 70, 40);
  rect(x + 55, baseY - 55, 30, 55);

  // Ventana con luz - sin luz de dia
  fill(noche ? color(255, 230, 100, 200) : color(180, 220, 255,200));
  rect(x + 15, baseY - 80, 30, 30);
  rect(x + 95, baseY - 80, 30, 30);

  // Chimenea
  fill(140, 100, 80);
  rect(x + 100, baseY - 155, 20, 30);

  // Humo
  if (noche){
    for (let i = 0; i < 4; i++){
      fill(200, 200, 210, 60 - i * 12);
      circle(
        x + 110 + sin(frameCount * 0.05 + i) * 6,
        baseY - 162 - i * 17,
        18 + i *4
      );
    }
  }
}
  
function keyPressed() {
  if (key === 'd' || key === 'D') esNoche = false;
  if (key === 'n' || key === 'N') esNoche = true;
  redraw(); // fuerza un frame aunque esté en noLoop()
}

// CLIC: pausar / reanudar 
function mousePressed() {
  if (mouseButton === LEFT) {
    if (corriendo) { noLoop(); } else { loop(); }
    corriendo = !corriendo;
  }
  if (mouseButton === RIGHT) {
    esNoche = !esNoche;
    redraw();
  }
}

// Evitar menú contextual del navegador
document.addEventListener('contextmenu', e => e.preventDefault());