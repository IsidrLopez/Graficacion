function setup() {
   createCanvas(800, 500, WEBGL); 
}

function draw(){
  background(240);
  orbitControl();

  // Cubo - rota en Y
  push();
  translate(-250, 0, 0);
  rotateY(frameCount * 0.02);
  box(80);
  pop();

  // Cilindro - rota en X
  push();
  translate(0, 0, 0);
  rotateY(frameCount * 0.02);
  cylinder(50, 120);
  pop();

  // Cono - rota en Z
  push();
  translate(250, 0, 0);
  rotateY(frameCount * 0.02);
  cone(50, 120);
  pop();
}
