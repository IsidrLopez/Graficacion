function setup() {
   createCanvas(700, 500, WEBGL); 
}

function draw(){
  background(30);
  orbitControl();
  noStroke();
   
  // Cubo izquierda
  push();
  translate(-200, 0, 0);
  fill(255, 100, 100);
  box(100);
  pop();

  // Cubo centro
  push();
  translate(0, 0, 0);
  fill(100, 200, 255);
  box(80);
  pop();
  
  // Cubo derecha
  push();
  translate(200, 0, 0);
  fill(100, 255, 150);
  box(80);
  pop();
}