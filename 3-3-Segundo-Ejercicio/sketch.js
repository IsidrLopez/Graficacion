function setup() {
   createCanvas(600, 400, WEBGL); 
}

function draw(){
  background(30);
  orbitControl();
  noStroke();

  push();
  fill(220, 180, 60);
  rotateX(frameCount * 0.01);
  rotateY(frameCoUNT * 0.02);
  box(100);
  pop();
}
