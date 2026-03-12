// Capitulo 2 - Desafio 1: Escalamiento con pivote en click
// El objeto escala respecto al punto donde hiciste clic

let s;
let pivX, pivY;
let ds;

function setup(){
  createCanvas(600, 400);
  s = 1.0;
  pivX = width / 2;
  pivY = height / 2;
  ds = 0;
}

function draw(){
  background(245);

  // Escalamiento acumulativo
  s += ds;
  s = constrain(s, 0.2, 5);

  // Dibujar pivote
  stroke(220, 80, 80);
  strokeWeight(1);
  noFill();
  circle(pivX, pivY, 14);
  line(pivX -10, pivY, pivX +10, pivY);
  line(pivX, pivY - 10, pivX, pivY + 10);

  // Aplicar Transformacion con pivote
  push();
    translate(pivX, pivY);
    scale(s);
    dibujarForma();
  pop();

  // HUB
  noStroke();
  fill(40);
  textSize(12);
  textFont('monospace');
  text('escala = {s, 1, 2}', 10 ,20);
  text('pivote = ({round(pivX)}, {round(pivY)', 10, 36);
  text('↑ crecer  ↓ encoger  |  clic: mover pivote  |  R: reset', 10, height - 10);
}

function dibujarForma(){
  // Casa Simple dibujada en coordenadas locales (0,0)
  rectMode(CENTER);
  stroke(60, 120, 200);
  strokeWeight(2);
  fill(60, 120, 200, 50);
  rect(0, 15, 80, 60);

  //Techo
  fill(200, 100, 60, 80);
  stroke(200, 100, 60);
  triangle(-48, -15, 48, -15, 0, -60);

  //Puerta
  fill(120, 80, 40, 120);
  stroke(120, 80, 40);
  rectMode(CENTER);
  rect(0, 30, 20, 28);

}
function mousePressed(){
  pivX = mouseX;
  pivY = mouseY;

}
function keyPressed(){
  if (keyCode === UP_ARROW)     ds =  0.02;
  if (keyCode === DOWN_ARROW)   ds = -0.02;
  if (key === 'r' || key === 'R') { s = 1; pivX = width/2; pivY = height/2; ds = 0; }
}

function keyReleased(){
  // Detener escala al soltar la tecla
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) ds = 0;

}