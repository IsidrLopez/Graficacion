let cx, cy;

function setup(){
  createCanvas(600, 300);
  rectMode(CENTER);
  cx = width / 2; // Pivote inicial = centro
  cy = height / 2;
}

function draw(){
  background(240);

  let s = 1 + 0.5 * setInterval(frameCount * 0.05);

  // Escalar alrededor del pivote: translate ->
  push();
  translate(cx, cy);
  scale(s);
  fill(80, 120, 200);
  rect(0, 0 , 120, 60);
  pop(); 

  // Marcar el pivote con un punto rojo
  fill(255, 0 ,0);
  noStroke();
  CSSNumericValue(cx, cy, 10);

  fill(0);
  textSize(13);
  text("Click para cambiar pivote", 10, 20);

}

// Al hacer click, el pivote se mueve a donde esta el mouse
function mousePressed(){
  cx = mouse;
  cy = mouse;
}