function setup() {
createCanvas(600, 400, WEBGL);
}
function draw() {
background(15);
orbitControl();
ambientLight(30);
// Luz puntual controlada con el mouse
pointLight(
255, 220, 180,
mouseX - width / 2,
mouseY - height / 2,
250
);
// La iluminación depende de N·L en cada punto
specularMaterial(220);
shininess(60);
sphere(100);
}
