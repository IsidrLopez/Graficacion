function setup() {
   createCanvas(800, 500, WEBGL); 
}

function draw() {
  background(30);
  orbitControl();
  noStroke();

  // Esfera - rota en X
  push();
  translate(-220, 0, 0);
  fill(255, 100, 100);
  rotateX(frameCount * 0.02);
  Sphere(60);
  pop();

   // Cubo - rota en Y
  push();
  translate(0, 0, 0);
  fill(100, 200, 255);
  rotateY(frameCount * 0.02);
  box(90);
  pop();

   // Toroide - rota en Z
  push();
  translate(220, 0, 0);
  fill(220, 180, 60);
  rotateZ(frameCount * 0.02);
  torus(50, 15);
  pop();
  
}
