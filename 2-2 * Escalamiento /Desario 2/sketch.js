// s = 1 + A * sin(w * t)
// A = amplitud ( que tan grande / pequeño se vuelve)
// w = frecuencia (que tan rapido pulsa)

let A = 0.5;   // Amplitud
let omega = 0.05;   //Frecuencia

function setup(){
  createCanvas(600, 300);
  rectMode(CENTER);

}
function draw(){
  background(240);

  // Factor de escala oscilante
  let s = 1 + A * sin(omega * frameCount);

  push();
  translate(width / 2, height / 2);
  scale(s);
  fill(60, 180, 120);
  rect(0, 0 , 120, 60);
  pop();



}