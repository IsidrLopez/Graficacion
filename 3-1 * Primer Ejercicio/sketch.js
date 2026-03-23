function setup() {
   createCanvas(600, 400, WEBGL); 
}

function draw(){
  background(30);
   
  // Cubo en el centro
  push();
  fill(100, 180, 255);
  noStroke();
  box(100);
  pop();

  // Esfera debajo del cubo
  push();
  translate(0, 120, 0);
  fill(255, 120, 80);
  noStroke();
  sphere(50);
  pop(); 
}