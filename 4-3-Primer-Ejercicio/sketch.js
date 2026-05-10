function setup() {
createCanvas(600, 400, WEBGL);
}
function draw() {
background(30);
orbitControl();
ambientLight(40); // base mínima
directionalLight(255, 255, 255, 1, 1, -1); // luz desde arriba-derecha
noStroke();
ambientMaterial(180, 100, 60);
sphere(100);
}
