function setup() {
createCanvas(600, 400, WEBGL);
}
function draw() {
background(20);
orbitControl();
ambientLight(40);
directionalLight(255, 255, 255, 1, 1, -1);
// Is = ks(R · V)^n
specularMaterial(255);
shininess(100); // n alto = brillo concentrado
sphere(100);
}
