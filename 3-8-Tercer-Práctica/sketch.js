function setup() {
   createCanvas(600, 400, WEBGL); 
}

function draw() {
  background (240);
  orbitControl();

  rotateX(frameCount * 0.01); //giro vertical
  rotateY(frameCount * 0.01); //giro horizontal
  rotateZ(frameCount * 0.01); //giro en plano
  
  box(100);

}

