function setup() {
   createCanvas(600, 400, WEBGL); 
}

function draw() {
  background(230);
  orbitControl();
  
  translate(100, 0, 0);          // 1. Mover
  rotateY(frameCount * 0.02);    // 2. rotar
  scale(1.2);                    // 3. escalar

  box(80);
}
