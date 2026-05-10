function setup() {
createCanvas(800, 500, WEBGL);
}
function draw() {
background(25);
orbitControl();
ambientLight(60);
directionalLight(255, 255, 255, 1, 1, -1);
// Izquierda: box con normalMaterial (ver normales por cara)
push();
translate(-220, 0, 0);
normalMaterial();
box(130);
pop();
// Derecha: sphere con normalMaterial (ver normales suaves)
push();
translate(220, 0, 0);
normalMaterial();
sphere(100);
pop();
}
