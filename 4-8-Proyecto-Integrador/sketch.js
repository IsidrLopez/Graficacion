// Proyecto Integrador – Unidad 4 – Graficación p5.js WEBGL
// Isidro López Pacheco – 24170608
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
let moverLuz = true; // controla si la luz sigue al mouse
function setup() {
createCanvas(800, 500, WEBGL);
textFont('monospace');
}
function draw() {
background(15, 15, 25); // fondo oscuro azulado
orbitControl(); // permite rotar la cámara con el mouse
// ■■ ILUMINACIÓN ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
ambientLight(45); // Ia: luz base
directionalLight( // Id: luz direccional (simula sol)
255, 255, 255,
1, 1, -1
);
// Ip: luz puntual – sigue al mouse si moverLuz == true
if (moverLuz) {
pointLight(
255, 220, 180,
mouseX - width / 2,
mouseY - height / 2,
250
);
} else {
pointLight(255, 220, 180, 0, -150, 250);
}
// ■■ OBJETO 1: ESFERA BRILLANTE ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// Simula material metálico / plástico brillante
// Modelo: Is = ks(R·V)^n con shininess alto
push();
translate(-250, 0, 0);
rotateY(frameCount * 0.012);
specularMaterial(240, 240, 255); // Is: reflejo blanco-azulado
shininess(120); // n alto = brillo concentrado
sphere(85);
pop();
// ■■ OBJETO 2: CUBO MATE ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// Simula material difuso (arcilla, madera, etc.)
// Modelo: Id = kd(N·L)
push();
translate(0, 0, 0);
rotateY(frameCount * 0.01);
rotateX(frameCount * 0.005);
ambientMaterial(200, 80, 80); // material mate rojo
box(130);
pop();
// ■■ OBJETO 3: TOROIDE CON NORMALES ■■■■■■■■■■■■■■■■■■■■■■■■■■
// Visualiza la dirección de las normales (RGB)
// RGB = (Nx, Ny, Nz) -> color varía con la orientación
push();
translate(250, 0, 0);
rotateX(frameCount * 0.012);
rotateZ(frameCount * 0.006);
normalMaterial();
torus(70, 22);
pop();
// ■■ HUD: instrucciones en pantalla ■■■■■■■■■■■■■■■■■■■■■■■■■■
// Se sale del espacio 3D para dibujar texto 2D
push();
// Resetear transformaciones 3D para texto plano
let luzEstado = moverLuz ? 'ON (sigue mouse)' : 'OFF (fija)';
ortho(); // proyección ortogonal para texto
fill(200);
noStroke();
textSize(12);
text('[ L ] Luz puntual: ' + luzEstado, -width/2 + 10, -height/2 + 20);
text('[ Drag ] Rotar camara', -width/2 + 10, -height/2 + 38);
text('Isidro Lopez – 24170608 – Unidad 4', -width/2 + 10, height/2 - 12);
pop();
}
// ■■ INTERACCIÓN CON TECLADO ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
function keyPressed() {
if (key === 'L' || key === 'l') {
moverLuz = !moverLuz; // alterna movimiento de la luz
}
}
