function setup() {
createCanvas(700, 400, WEBGL);
}
function draw() {
background(220);
orbitControl();
// Esfera: normales suaves (apuntan hacia afuera en cada punto)
push();
translate(-200, 0, 0);
normalMaterial();
sphere(100);
pop();
// Cubo: normales por cara (6 colores distintos)
push();
translate(200, 0, 0);
normalMaterial();
box(130);
pop();
}
