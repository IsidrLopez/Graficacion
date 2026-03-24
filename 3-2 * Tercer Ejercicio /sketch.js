function setup() {
   createCanvas(700, 500, WEBGL); 
}

function draw(){
  background (30);
  orbitControl();
  noStroke();

  push();
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.015);

  let s = 80;
  
  // Cara frontal (azul)
  fill(100, 180, 255);
  beginShape();
  vertex(-s, -s, s);
  vertex( s, -s, s);
  vertex( s,  s, s);
  vertex(-s,  s, s);
  endShape(CLOSE);

  // Cara trasera (roja)
  fill(255, 100, 100);
  beginShape();
  vertex(-s, -s, -s);
  vertex( s, -s, -s);
  vertex( s,  s, -s);
  vertex(-s,  s, -s);
  endShape(CLOSE);

  // Cara superior (verde)
  fill(100, 220, 120);
  beginShape();
  vertex(-s, -s, -s);
  vertex( s, -s, -s);
  vertex( s, -s,  s);
  vertex(-s, -s,  s);
  endShape(CLOSE);

  pop();

}

