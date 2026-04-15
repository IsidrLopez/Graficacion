function setup() {
   createCanvas(600, 400, WEBGL); 
}

function draw(){
  background(30);
  orbitControl();
  
  // Eje X (rojo)
  strokeWeight(2);
  stroke(255, 0, 0);
  line(0, 0, 0, 200, 0, 0);
  
  // Eje Y (verde)
  stroke(0, 255, 0);
  line(0, 0, 0, 0, 200, 0);

  // Eje Z (azul)
  stroke(0, 100, 255);
  line(0, 0, 0, 0, 0, 200);

  // Cubo giratorio en X y Y
  push();
  noStroke();
  fill(220, 180, 60);
  rotateX(frameCount * 0.01);
  rotateY(frameCoUNT * 0.015);
  box(80);
  pop();
}
