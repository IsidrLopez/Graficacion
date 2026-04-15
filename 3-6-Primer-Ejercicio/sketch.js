function setup() {
   createCanvas(700, 500, WEBGL); 
}

function draw(){
  background(30);
  
  // Camara(posX, posY, posZ, mirarX, mirarY, mirarZ, upX, upY, upZ)
  camara(300, -200, 400, // posicion de la camara
         0, 0, 0,        // punto al que mira
         0, 1, 0);       // vector "arriba"
  
  noStroke();

  // Cubo izquierda
  push();
  translate(-150, 0, 0);
  fill(255, 100, 100);
  box(80);
  pop();

  // Esfera centro
  push();
  fill(100, 180, 255);
  sphere(60);
  pop();

  // Cono derecha
  push();
  translate(150, 0, 0);
  fill(100, 255, 150);
  cone(50, 100);
  pop();

}
 