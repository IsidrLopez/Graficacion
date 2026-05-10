function setup() {
createCanvas(600, 400, WEBGL);
}
function draw() {
background(20);
orbitControl();
// La luz sigue al cursor del mouse
pointLight(
255, 255, 255, // color blanco
mouseX - width / 2, // X centrado
mouseY - height / 2, // Y centrado
200 // Z delante de la escena
);
noStroke();
ambientMaterial(100, 160, 220);
sphere(100);
}
