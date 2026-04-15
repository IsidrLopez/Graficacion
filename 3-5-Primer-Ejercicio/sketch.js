function setup() {
   createCanvas(600, 400, WEBGL); 
}

function draw(){
  background(30);
  orbitControl();
  noStroke();

  // Cubo (izquierda)
  push();
  translate(-150, 0, 0);
  fill(100, 180, 255);
  box(90);
  pop();

  // Esfera (derecha) 
  push();
  translate(150, 0, 0);
  fill(255, 120, 80);
  sphere(60);
  pop();

}
 