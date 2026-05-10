function setup() {
createCanvas(800, 500, WEBGL);
}
function draw() {
background(20);
orbitControl();
// Múltiples luces
ambientLight(40);
directionalLight(255, 255, 255, 1, 1, -1);
pointLight(255, 200, 150, 0, -150, 200);
// Esfera brillante
push();
translate(-250, 0, 0);
specularMaterial(255);
shininess(100);
sphere(80);
pop();
// Cubo mate
push();
translate(0, 0, 0);
rotateY(frameCount * 0.01);
ambientMaterial(200, 80, 80);
box(120);
pop();
// Toroide con normales
push();
translate(250, 0, 0);
rotateX(frameCount * 0.01);
normalMaterial();
torus(70, 20);
pop();
}