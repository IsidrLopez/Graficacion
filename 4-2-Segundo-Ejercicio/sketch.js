function setup() {
createCanvas(500, 400);
}
function draw() {
// Degradado horizontal rojo -> azul
for (let i = 0; i < width; i++) {
let t = i / width; // t va de 0 a 1
let r = lerp(255, 0, t); // rojo disminuye
let g = 0;
let b = lerp(0, 255, t); // azul aumenta
stroke(r, g, b);
line(i, 0, i, height);
}
}
