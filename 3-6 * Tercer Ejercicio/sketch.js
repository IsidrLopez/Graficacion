let angulo = 0;

function setup() {
   createCanvas(800, 500, WEBGL); 
}

function draw() {
  background (30);
  orbitControl();

  // Camara orbitando
  let camX = 400 * cos(angulo);
  let camY = 400 * sin(angulo);
  camera(camX, -150, camZ, 0, 0, 0, 0, 1, 0);
  angulo += 0.008;

  noStroke();

  // Cubo (izquierda)
  push();
  translate(-200, 0, 0);
  fill(255, 100, 180);
  rotateY(frameCount * 0.02);
  box(90);
  pop();

  // Esfera (centro)
  push();
  fill(100, 180, 255);
  sphere(70);
  pop();

  // Toroide (derecha) push();
  translate(200, 0, 0);
  fill(220, 180, 60);
  rotateY(frameCount * 0.02);
  torus(50, 15);
  pop();

}

