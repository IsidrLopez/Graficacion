// Capitlo 2 Desafio 3
// Personaje (cabeza + cuerpo + ojos)

let tx, ty;
const speed = 4;

function setup(){
  createCanvas(600, 400);
  resetPos();
}

function resetPos(){
  tx = width / 2;
  ty = height / 2;

}

// Personaje
function dibujarPersonaje(){
  rectMode(CENTER);

  // Cuerpo
  stroke(60, 160, 220);
  strokeWeight(2);
  fill(60, 160, 220, 60);
  rect(0, 20, 44, 52, 6);

  // Cabeza
  stroke(60, 160, 220);
  fill (60, 160, 220, 80);
  ellipse(0, -18, 48, 48);

  // Ojo izquierdo
  noStroke();
  fill(255);
  ellipse(-11, -18, 13, 13);
  fill(30, 30, 80);
  ellipse(-10, -17, 7 ,7);
  fill(255);
  ellipse(-8, -19, 3, 3,); // Brillo

  // Ojo derecho
  fill(255);
  ellipse(11, -18, 13, 13);
  fill(30, 30, 80);
  ellipse(12, -17, 7 ,7);
  fill(255);
  ellipse(14, -19, 3, 3,); // Brillo

  // Boca
  stroke(69, 160, 220, 180);
  strokeWeight(2);
  noFill();
  arc(0, -8, 18, 10, 0, PI);

  //Brazos
  stroke(60, 160, 220, 160);
  strokeWeight(3);
  line(-22, 4, -36, 24);
  line(22, 4, 36, 24);

  //Piernas
  line(-10, 46, -12, 68);
  line(10, 46, 12, 68);

}

function draw(){
  background(240);

  //Movimiento
  if (keyIsDown(87) || keyIsDown(UP_ARROW))    ty -= speed;
  if (keyIsDown(83) || keyIsDown(DOWN_ARROW))  ty += speed;
  if (keyIsDown(65) || keyIsDown(LEFT_ARROW))  tx -= speed;
  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) ty += speed;

  // Mantener dentro del canvas
  tx = constrain(tx, 30, width - 30);
  ty = constrain(ty, 40, height - 50);

  // Dibujar personaje con translate()
  push();
    translate(tx, ty);
    dibujarPersonaje();
  pop();

  // HUD
  noStroke();
  fill(40);
  textSize(12);
  textFont('monospace');
  text('tx={round(tx)} ty=round(ty)}', 10, 20);
  text('WASD o flechas: mover | R: reiniciar', 10, height - 10);

}

function keyPressed(){
  if (key === 'r' || key == 'R') resetPos();
}