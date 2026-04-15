function setup() {
   createCanvas(800, 500, WEBGL); 
}

function draw() {
  background (240);
  orbitControl();

  // Cubo (izquierda) - rota en Y
  push();
  translate(-200, 0, 0);
  rotateY(frameCount * 0.02);
  fill(255, 100, 180);
  box(80);
  pop();

  // Esfera (centro)
  push();
  translate(0, 0, 0);
  fill(100, 200, 255);
  sphere(60);
  pop();

  // Cono (derecha) - rota en X
  push();
  translate(200, 0, 0);
  rotateY(frameCount * 0.02);
  fill(220, 255, 100);
  cone(50, 120);
  pop();

}

