function setup() {
createCanvas(800, 400, WEBGL);
}
function draw() {
background(20);
orbitControl();
ambientLight(40);
directionalLight(255, 255, 255, 1, 1, -1);
// Baja shininess: brillo difuso
push();
translate(-250, 0, 0);
specularMaterial(255);
shininess(5);
sphere(80);
pop();
// Shininess media
push();
translate(0, 0, 0);
specularMaterial(255);
shininess(50);
sphere(80);
pop();
// Alta shininess: brillo concentrado (metal)
push();
translate(250, 0, 0);
specularMaterial(255);
shininess(200);
sphere(80);
pop();
}