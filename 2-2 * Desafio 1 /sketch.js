// Capitulo 2 - Desafio 1: Escalamiento con pivote en click
// El objeto escala respecto al punto donde hiciste clic

let s;
let pivX, pivY;
let ds;

function setup(){
  createCanvas(600, 400);
  s = 1.0;
  pivX = width / 2;
  priY = height / 2;
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
  fil(40);
  textSize(12);
  textFont('monospace');
  text('escala')
}