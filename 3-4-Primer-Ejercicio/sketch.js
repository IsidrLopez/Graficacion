let usarOrtho = false;
function setup() {
   createCanvas(700, 500, WEBGL); 
}

function draw(){
  background(30);
  orbitControl();

if (usarOrtho){
  ortho(-widht/2, widht/2, -height/2, height/2, 0.1, 1000);
}else{
  persective(PI/3, widht/height, 0.1, 1000);
}

noStroke();

// Cubo izquierda
push();
translate(-150, 0, 0);
fill(100, 180, 255);
box(100);
pop();

// Cubo derecha
push();
translate(150, 0, 0);
fill(255, 120, 80);
box(100);
pop();

}

function keyPressed(){
  if (key==='') usarOrtho = !usarOrtho; // Espacio para alternar
}
 