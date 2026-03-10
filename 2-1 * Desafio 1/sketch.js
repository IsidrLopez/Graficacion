let x, y;
let vx, vy;
const W = 80;
const H = 50;

function setup(){
  createCanvas(600, 300);
  resetPos();

}

function resetPos(){
  //Posicion inicial centrada
  x = width / 2 - W / 2;
  y = height / 2 - W / 2;
  vx = 3;
  vy = 2;
}

function draw(){
  //Translación
  x += vx;
  y += vy;

// Rebote en bordes
// Borde izquierdo / derecho -> invertir vx
if (x < 0){
  x = 0;
  vx = abs(vx);
}
if (x + W > width){
  x = width
  vx = -abs(vx);
}

// Borde superior / inferior -> invertir vy
if (y < 0){
  y = 0;
  vy = abs(vy);
}
if (y + H > height){
  y = height - H;
  vy = -abs(vy);
}

// Dibujo
stroke(60, 120, 200);
strokeWeight(2);
fill(60, 120, 200, 60);
rect(x, y, W, H, 6);

// Mostrar posicion y velocidad inicial
noStroke();
fill(40);
textSize(12);
textFont('monospace');
text('x=${nf(x, 1, 1)} y=${nf(y, 1, 1)}', 10,20);
text('vx=${vx} vy=${vy}', 10, 36); 
text('Flechas : cambiar velocidad | R: reiniciar', 10, height - 10);
}

function keyPressed(){
  // Cambiar velocidad con teclas de flecha
  if (keyCode === UP_ARROW)       vy -= 0.5;
  if (keyCode === DOWN_ARROW)     vy += 0.5;
  if (keyCode === LEFT_ARROW)     vx -= 0.5;
  if (keyCode === RIGHT_ARROW)    vx += 0.5;

  // Reiniciar con R
  if (key === 'r' || key === 'R')  resetPos();
}
