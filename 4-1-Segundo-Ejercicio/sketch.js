function setup() {
createCanvas(600, 400, WEBGL);
}
function draw() {
background(30);
orbitControl(); // mover cámara con mouse
ambientLight(60); // luz base
directionalLight(255, 255, 255, 1, 1, -1); // luz direccional
noStroke();
ambientMaterial(100, 180, 240); // material azul cielo
sphere(100);
}