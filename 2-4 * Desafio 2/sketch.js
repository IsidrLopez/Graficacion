// CAPÍTULO 4 — Desafío 2: Rotación alrededor de pivote
// M = T(cx,cy) · R(θ) · T(-cx,-cy)
// Calculado MANUALMENTE con matrices 3×3
 
let theta;
let pivX, pivY;
 
function setup() {
  createCanvas(600, 400);
  theta = 0;
  pivX  = width  / 2;
  pivY  = height / 2;
}
 
// Algebra Matricial
function aplicarM(M, x, y) {
  return [
    M[0][0]*x + M[0][1]*y + M[0][2],
    M[1][0]*x + M[1][1]*y + M[1][2]
  ];
}
 
function multM(A, B) {
  let C = [[0,0,0],[0,0,0],[0,0,0]];
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      for (let k = 0; k < 3; k++)
        C[i][j] += A[i][k] * B[k][j];
  return C;
}
 
function matT(tx, ty) {
  return [[1, 0, tx], [0, 1, ty], [0, 0, 1]];
}
 
function matR(a) {
  return [[cos(a), -sin(a), 0],
          [sin(a),  cos(a), 0],
          [     0,       0, 1]];
}
 
// Vertices del Objeto
function verticesObjeto() {
  // Flecha apuntando a la derecha, centrada en (0,0)
  return [
    [-40, -15], [10, -15], [10, -30],
    [40,    0],
    [10,  30], [10,  15], [-40, 15]
  ];
}
 
function draw() {
  background(245);
 
  theta += 0.02; // rotación continua
 
  // Matriz de Rotacion Alrededor de Pivote
  // M = T(cx,cy) · R(θ) · T(-cx,-cy)
  let M = multM(matT(pivX, pivY),
          multM(matR(theta),
                matT(-pivX, -pivY)));
 
  let verts = verticesObjeto();
 
  // Figura Origininal (fantasma)
  // Dibujada con offset desde el pivote
  stroke(200);
  strokeWeight(1);
  fill(220, 220, 220, 80);
  beginShape();
  for (let v of verts) {
    vertex(pivX + v[0], pivY + v[1]);
  }
  endShape(CLOSE);
 
  // Figura Trnasformada
  stroke(60, 130, 220);
  strokeWeight(2);
  fill(60, 130, 220, 40);
  beginShape();
  for (let v of verts) {
    // La figura parte desde (pivX + vx, pivY + vy)
    let [nx, ny] = aplicarM(M, pivX + v[0], pivY + v[1]);
    vertex(nx, ny);
  }
  endShape(CLOSE);
 
  // Pivote
  stroke(220, 80, 80);
  strokeWeight(1);
  noFill();
  circle(pivX, pivY, 14);
  line(pivX - 10, pivY, pivX + 10, pivY);
  line(pivX, pivY - 10, pivX, pivY + 10);
 
  // Mostrar Matriz
  noStroke();
  fill(40);
  textSize(11);
  textFont('monospace');
  text('M = T(c) · R(θ) · T(-c)', 10, 20);
  for (let i = 0; i < 3; i++) {
    text(`[ ${nf(M[i][0],1,2)}  ${nf(M[i][1],1,2)}  ${nf(M[i][2],1,2)} ]`, 10, 38 + i * 16);
  }
 
  fill(80);
  text(`θ = ${nf(theta % TWO_PI, 1, 3)} rad`, 10, 95);
  text(`pivote = (${round(pivX)}, ${round(pivY)})`, 10, 111);
  text('clic: mover pivote  |  ↑↓ velocidad', 10, height - 10);
}
 
function mousePressed() {
  pivX = mouseX;
  pivY = mouseY;
}
 
function keyPressed() {
  if (keyCode === UP_ARROW)   theta += 0.1;
  if (keyCode === DOWN_ARROW) theta -= 0.1;
}