function setup() {
createCanvas(700, 400, WEBGL);
}
function draw() {
background(25);
orbitControl();
ambientLight(50);
directionalLight(255, 255, 255, 1, 1, -1);
// Objeto 1: material mate
push();
translate(-200, 0, 0);
ambientMaterial(200, 80, 80); // rojo mate
sphere(90);
pop();
// Objeto 2: material brillante
push();
translate(200, 0, 0);
specularMaterial(255); // blanco especular
shininess(100);
sphere(90);
pop();
}
