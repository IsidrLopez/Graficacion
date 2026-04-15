function setup() {
   createCanvas(600, 400, WEBGL); 
}

function draw(){
  background(30);
  
  push();
  fill(100, 180, 255);
  noStroke();
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.02);
  box(100);
  pop();

}
 