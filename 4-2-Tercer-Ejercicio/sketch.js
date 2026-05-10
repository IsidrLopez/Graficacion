let img;
function preload() {
// Imagen de textura pública (Wikimedia Commons)
img = loadImage(
'https://upload.wikimedia.org/wikipedia/commons/3/3c/Texture_example.jpg'
);
}
function setup() {
createCanvas(400, 400, WEBGL);
}
function draw() {
background(220);
orbitControl();
rotateY(frameCount * 0.01);
texture(img); // aplica la imagen como textura
box(150);
}