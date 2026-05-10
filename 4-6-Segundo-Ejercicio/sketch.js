function setup() {
createCanvas(700, 400, WEBGL);
}
function draw() {
background(20);
orbitControl();
ambientLight(40);
pointLight(255, 255, 255, 0, -100, 200);
// Esfera: normales suaves -> iluminación suave
push();
translate(-200, 0, 0);
ambientMaterial(200, 80, 80);
sphere(80);
pop();
// Cubo: normales por cara -> iluminación facetada
push();
translate(200, 0, 0);
ambientMaterial(80, 160, 220);
box(120);
pop();
}
