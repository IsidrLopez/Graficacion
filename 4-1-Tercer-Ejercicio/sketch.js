function setup() {
createCanvas(800, 500, WEBGL);
}
function draw() {
background(20);
orbitControl();
ambientLight(50);
pointLight(255, 255, 255, 0, -150, 250); // luz puntual arriba
// Objeto 1: cubo con fill() básico
push();
translate(-250, 0, 0);
rotateY(frameCount * 0.01);
fill(220, 100, 100);
box(120);
pop();
// Objeto 2: esfera con ambientMaterial (mate)
push();
translate(0, 0, 0);
ambientMaterial(100, 180, 240);
sphere(90);
pop();
// Objeto 3: toroide con specularMaterial (brillante)
push();
translate(250, 0, 0);
rotateY(frameCount * 0.01);
specularMaterial(230);
shininess(80);
torus(70, 20);
pop();
}
