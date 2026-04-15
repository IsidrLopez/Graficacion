function setup() {
   createCanvas(700, 500, WEBGL); 
}

function draw(){
  background(30);
  orbitControl();
  noStroke();

  // Objeto cerca ( z positivo) 
  push();
  translate(-150, 0, 150);
  fill(255, 100, 100);
  sphere(50);
  pop();

  // Objeto al centro (z = 0)
  push();
  translate(0, 0, 0);
  fill(100, 200, 255);
  box(80);
  pop();

  // Objeto lejos(z negativo)
  push();
  translate(150, 0, -200);
  fill(100, 255, 150);
  torus(50, 15);
  pop();
}
