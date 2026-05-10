function setup() {
createCanvas(800, 400, WEBGL);
}
function draw() {
background(230);
ambientLight(150);
// Figura 1: cubo rojo
push();
translate(-250, 0, 0);
fill(200, 50, 50);
box(100);
pop();
// Figura 2: esfera verde
push();
translate(0, 0, 0);
fill(50, 180, 80);
sphere(80);
pop();
// Figura 3: toroide azul
push();
translate(250, 0, 0);
fill(50, 100, 220);
torus(70, 20);
pop();
}