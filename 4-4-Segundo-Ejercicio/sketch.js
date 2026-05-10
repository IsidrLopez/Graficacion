function setup() {
createCanvas(600, 400, WEBGL);
}
function draw() {
background(25);
orbitControl();
ambientLight(30);
// Componente difusa: Id = kd(N · L)
directionalLight(255, 255, 255, 1, 1, -1);
noStroke();
ambientMaterial(160, 90, 200);
sphere(100);
}
