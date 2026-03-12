//Capitlo 2 - Desafio 2: Pulsación armónica

let A;
let omega;

function setup(){
  createCanvas(600, 400);
  A = 0.4;
  omega = 0.05;
}

function draw(){
  background(245);
   // Escalamiento Armonico
  let s = 1 + A * sin(omega * frameCount);

   // Aplicar Transformacion
  push();
    translate(width / 2, height / 2);
    scale(s);
    dibujarForma();
  pop();

  // Visualizar la onda
  dibujarGrafica();


   // HUD
   noStroke();
   fill(40);
   textSize(12);
   textFont('monospace');
   text(`s = {nf(s, 1, 3)}`, 10, 20);
   text(`A = {nf(A,1,2)}   ω = {nf(omega,1,3)}`, 10, 36);
   text('↑↓ amplitud  ←→ velocidad', 10, height - 10);

}
function dibujarForma(){
  // Circulo con detalle interno
  stroke(100, 60, 200);
  strokeWeight(2);
  fill(100, 60, 200, 40);
  circle(0, 0, 120);

  noStroke();
  fill(100, 60, 200, 100);
  circle(0, 0, 20);

  stroke(100, 60, 200, 120);
  strokeWeight(1);
  noFill();
  circle(0, 0, 80);
}

function dibujarGrafica(){
  let gx = 10, gy = height - 70, gw = 200, gh = 50;

  noFill();
  stroke(180);
  strokeWeight(1);
  rect(gx, gy, gw, gh);

  //Linea de s=1 (referencia)
  stroke(200, 150, 150, 100);
  line(gx, gy + gh/2, gx + gw, gy + gh/2);
  
  // Onda
  stroke(100, 60, 200);
  strokeWeight(1.5);
  beginShape();
  for (let i = 0; i < gw; i++) {
    let t  = frameCount - gw + i;
    let sv = 1 + A * sin(omega * t);
    let py = map(sv, 1 - A - 0.1, 1 + A + 0.1, gy + gh, gy);
    vertex(gx + i, py);
  }
  endShape();
} 

function keyPressed(){
  if (keyCode === UP_ARROW)        A = min(A + 0.05, 1.5);
  if (keyCode === DOWN_ARROW)      A = max(A - 0.05, 0.05);
  if (keyCode === RIGHT_ARROW) omega = min(omega + 0.005, 0.3);
  if (keyCode === LEFT_ARROW)  omega = max(omega - 0.005, 0.005);

}