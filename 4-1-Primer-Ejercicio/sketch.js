function setup() {
createCanvas(500, 400, WEBGL);
}
function draw() {
background(230);
rotateY(frameCount * 0.01); // rotación lenta
fill(180, 80, 220); // color violeta
box(120); // cubo de 120px
}