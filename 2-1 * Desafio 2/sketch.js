let x, y;
let alpha;

function setup(){
  createCanvas(600, 300);
  //Posicion inicial en el centro
   x = width / 2;
   y = height / 2;
   alpha = 0.05;
}

function draw(){
  background(240);
  
  //Translación
  x = x + alpha * (mouseX - x);
  y = y + alpha * (mouseY - y);

  //Cruz en el mouse
  rectMode(CENTER);
  stroke(200, 80, 80, 150);
  strokeWeight(1);
  line(mouseY - 10, mouseX + 10, mouseY);
  line(mouseX, mouseY -10, mouseX, mouseY + 10);

  //Objetivo Principal
  rectMode(CENTER);
  stroke(200, 80, 80);
  strokeWeight(2);
  fill(200, 80, 80, 50);
  rect(x, y , 80, 50, 8);

  // Punto central del objetivo
  fill(200, 80, 80);
  noStroke();
  circle(x, y, 7);

  // HUD
  rectMode(CORNER);
  noStroke();
  fill(40);
  textSize(12);
  textFont('monospace');
  text('a = ${nf(alpha, 1, 3)}', 10, 20);
  text('x = ${nf(x, 1, 1,)} y=${nf(y, 1, 1)}', 10, 36); 
  text('mas rapido  mas lento | mueve el mouse ', 10, height - 10);
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
