// CAPÍTULO 4 — Desafío 1: Matrices de transformación 2D
// Aplicar T, S, R y Shear manualmente con coordenadas homogéneas

// Punto original P = (x, y, 1) en coordenadas homogéneas
let px, py;
 
// Parámetros de transformación
let tx, ty;    // traslación
let sx, sy;    // escala
let theta;     // rotación
let kx;        // shear en X
 
function setup() {
  createCanvas(700, 420);
  resetParams();
}
 
function resetParams() {
  px = 0;  py = 0;   // punto en origen local
  tx = 80; ty = -50;
  sx = 1.5; sy = 1.5;
  theta = PI / 6;    // 30°
  kx = 0.0;
}
 
// Matrices 3x3 
// Multiplicar matriz 3×3 por vector [x, y, 1]
function aplicarM(M, x, y) {
  return [
    M[0][0]*x + M[0][1]*y + M[0][2],
    M[1][0]*x + M[1][1]*y + M[1][2]
  ];
}
 
// Multiplicar dos matrices 3×3
function multM(A, B) {
  let C = [[0,0,0],[0,0,0],[0,0,0]];
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      for (let k = 0; k < 3; k++)
        C[i][j] += A[i][k] * B[k][j];
  return C;
}
 
function matT(tx, ty) {
  return [[1, 0, tx],
          [0, 1, ty],
          [0, 0,  1]];
}
 
function matS(sx, sy) {
  return [[sx,  0, 0],
          [ 0, sy, 0],
          [ 0,  0, 1]];
}
 
function matR(a) {
  return [[cos(a), -sin(a), 0],
          [sin(a),  cos(a), 0],
          [     0,       0, 1]];
}
 
function matShX(k) {
  return [[1, k, 0],
          [0, 1, 0],
          [0, 0, 1]];
}
 
// Dibujar Figura (Cuadrado)
function verticesCuadrado(cx, cy, lado) {
  let h = lado / 2;
  return [
    [cx - h, cy - h],
    [cx + h, cy - h],
    [cx + h, cy + h],
    [cx - h, cy + h]
  ];
}
 
// Aplica matriz M a cada vértice y dibuja el polígono
function dibujarTransformado(verts, M, c) {
  stroke(c);
  strokeWeight(2);
  fill(red(c), green(c), blue(c), 40);
  beginShape();
  for (let v of verts) {
    let [nx, ny] = aplicarM(M, v[0], v[1]);
    vertex(nx, ny);
  }
  endShape(CLOSE);
}
 
function draw() {
  background(245);
 
  let cx = width / 2;
  let cy = height / 2;
 
  // Sistema de coordenadas centrado
  push();
  translate(cx, cy);
  scale(1, -1); // Y hacia arriba (matemático)
 
  // Ejes
  stroke(200);
  strokeWeight(1);
  line(-280, 0, 280, 0);
  line(0, -180, 0, 180);
 
  // Grid sutil
  stroke(230);
  for (let g = -280; g <= 280; g += 40) line(g, -180, g, 180);
  for (let g = -180; g <= 180; g += 40) line(-280, g, 280, g);
 
  let verts = verticesCuadrado(0, 0, 60);
 
  // Figura original
  stroke(160);
  strokeWeight(1);
  fill(220, 220, 220, 80);
  beginShape();
  for (let v of verts) vertex(v[0], v[1]);
  endShape(CLOSE);
 
  // Componer: T · R · S · Sh 
  // Orden: primero Shear, luego Scale, luego Rotate, luego Translate
  let M = matT(tx, ty);
  M = multM(M, matR(theta));
  M = multM(M, matS(sx, sy));
  M = multM(M, matShX(kx));
 
  dibujarTransformado(verts, M, color(60, 130, 220));
 
  // Punto original
  fill(180);
  noStroke();
  circle(0, 0, 7);
 
  // Punto transformado (origen del objeto)
  let [ox, oy] = aplicarM(M, 0, 0);
  fill(60, 130, 220);
  circle(ox, oy, 8);
 
  pop();
 
  // HUD 
  noStroke();
  fill(40);
  textSize(11);
  textFont('monospace');
 
  // Mostrar la matriz compuesta
  let M2 = matT(tx, ty);
  M2 = multM(M2, matR(theta));
  M2 = multM(M2, matS(sx, sy));
  M2 = multM(M2, matShX(kx));
 
  text('Matriz M = T · R · S · Sh', 10, 20);
  for (let i = 0; i < 3; i++) {
    text(`[ ${nf(M2[i][0],1,2)}  ${nf(M2[i][1],1,2)}  ${nf(M2[i][2],1,2)} ]`, 10, 38 + i * 16);
  }
 
  fill(80);
  text(`tx=${tx} ty=${ty}  ←→↑↓`, 10, 100);
  text(`sx=${nf(sx,1,1)} sy=${nf(sy,1,1)}  W/S`, 10, 116);
  text(`θ =${nf(degrees(theta),1,1)}°  A/D`, 10, 132);
  text(`kx=${nf(kx,1,2)}  Q/E`, 10, 148);
  text('R: reset', 10, 164);
}
 
function keyPressed() {
  if (keyCode === RIGHT_ARROW) tx += 10;
  if (keyCode === LEFT_ARROW)  tx -= 10;
  if (keyCode === UP_ARROW)    ty += 10;
  if (keyCode === DOWN_ARROW)  ty -= 10;
  if (key === 'w' || key === 'W') { sx += 0.1; sy += 0.1; }
  if (key === 's' || key === 'S') { sx = max(sx - 0.1, 0.1); sy = max(sy - 0.1, 0.1); }
  if (key === 'a' || key === 'A') theta -= 0.1;
  if (key === 'd' || key === 'D') theta += 0.1;
  if (key === 'q' || key === 'Q') kx -= 0.05;
  if (key === 'e' || key === 'E') kx += 0.05;
  if (key === 'r' || key === 'R') resetParams();
}