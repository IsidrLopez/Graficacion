function setup() {
createCanvas(600, 400, WEBGL);
}
function draw() {
background(30);
orbitControl();
ambientLight(80); // luz base
pointLight(255, 255, 255, 0, 0, 200); // luz puntual al frente
rotateY(frameCount * 0.01);
fill(200, 50, 50);
sphere(100);
}