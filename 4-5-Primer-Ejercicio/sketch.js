function setup() {
createCanvas(700, 400, WEBGL);
}
function draw() {
background(30);
orbitControl();
ambientLight(50);
directionalLight(255, 255, 255, 1, 1, -1);
// Cubo: sombreado plano por cara (Flat shading)
push();
translate(-200, 0, 0);
rotateY(frameCount * 0.01);
fill(200, 80, 80);
box(130);
pop();
// Esfera: sombreado suave interpolado (Gouraud/Phong)
push();
translate(200, 0, 0);
rotateY(frameCount * 0.01);
ambientMaterial(80, 140, 220);
sphere(100);
pop();
}