function setup() {
createCanvas(500, 400, WEBGL);
}
function draw() {
background(50);
ambientLight(150); // Ia: luz ambiental alta para ver efecto
noStroke();
fill(200, 120, 60);
sphere(100);
}
