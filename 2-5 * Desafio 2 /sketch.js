// CAPÍTULO 5 — Desafío 2: Dos curvas Bézier conectadas
// Continuidad C¹: P3(1)=P0(2) y P2(1),P1(2) alineados
 
let A0, A1, A2, A3;
let B2, B3;
let arrastrado; // 'A1','A2','A3','B2','B3' o null
 
function setup() {
  createCanvas(700, 400);
  arrastrado = null;
  resetPuntos();
}
 
function resetPuntos() {
  A0 = { x:  60, y: 280 };
  A1 = { x: 130, y: 100 };
  A2 = { x: 240, y:  80 };
  A3 = { x: 340, y: 200 }; // punto de unión
  B2 = { x: 480, y: 320 };
  B3 = { x: 620, y: 240 };
}
 
// B1 se calcula automáticamente para mantener C¹
function getB1() {
  return {
    x: 2 * A3.x - A2.x,
    y: 2 * A3.y - A2.y
  };
}
 
function draw() {
  background(245);
 
  let B0 = A3;        // unión: B0 = A3
  let B1 = getB1();   // C¹ automático
 
  // Poligonos de Control
  stroke(200);
  strokeWeight(1);
  noFill();
  // Curva 1
  beginShape();
  vertex(A0.x,A0.y); vertex(A1.x,A1.y);
  vertex(A2.x,A2.y); vertex(A3.x,A3.y);
  endShape();
  // Curva 2
  beginShape();
  vertex(B0.x,B0.y); vertex(B1.x,B1.y);
  vertex(B2.x,B2.y); vertex(B3.x,B3.y);
  endShape();
 
  // Línea de continuidad A2—A3—B1 (deben ser colineales)
  stroke(100, 200, 130, 150);
  strokeWeight(1);
  line(A2.x, A2.y, B1.x, B1.y);
 
  // Curva 1
  stroke(60, 130, 220);
  strokeWeight(2.5);
  noFill();
  bezier(A0.x,A0.y, A1.x,A1.y, A2.x,A2.y, A3.x,A3.y);
 
  // Curva 2
  stroke(220, 100, 60);
  strokeWeight(2.5);
  noFill();
  bezier(B0.x,B0.y, B1.x,B1.y, B2.x,B2.y, B3.x,B3.y);
 
  // Puntos
  dibujarPunto(A0, 'A0', color(100), false);
  dibujarPunto(A1, 'A1', color(60,130,220), true);
  dibujarPunto(A2, 'A2', color(60,130,220), true);
  dibujarPunto(A3, 'A3 = B0', color(50, 180, 80), true); // punto de unión
  dibujarPunto(B1, 'B1 (auto)', color(100,200,130), false); // calculado
  dibujarPunto(B2, 'B2', color(220,100,60), true);
  dibujarPunto(B3, 'B3', color(220,100,60), true);
 
  // HUD
  noStroke();
  fill(40);
  textSize(11);
  textFont('monospace');
  text('C¹: B1 = 2·A3 - A2  (simétrico respecto a A3)', 10, 20);
  fill(80);
  text('arrastra A1,A2,A3,B2,B3  |  R: reset', 10, height - 10);
 
  // Leyenda colores
  fill(60, 130, 220); circle(10, height-36, 8);
  fill(60); text('Curva 1', 20, height-32);
  fill(220, 100, 60); circle(90, height-36, 8);
  fill(60); text('Curva 2', 100, height-32);
  fill(100, 200, 130); circle(170, height-36, 8);
  fill(60); text('B1 automático', 180, height-32);
}
 
function dibujarPunto(p, lbl, c, arrastrable) {
  if (arrastrable) {
    stroke(c);
    strokeWeight(2);
    fill(red(c), green(c), blue(c), 70);
    circle(p.x, p.y, 16);
  } else {
    fill(c);
    noStroke();
    rectMode(CENTER);
    square(p.x, p.y, 12);
  }
  noStroke();
  fill(50);
  textSize(10);
  textFont('monospace');
  text(lbl, p.x + 9, p.y - 7);
}
 
function mousePressed() {
  let candidatos = [
    { key: 'A1', p: A1 }, { key: 'A2', p: A2 },
    { key: 'A3', p: A3 }, { key: 'B2', p: B2 },
    { key: 'B3', p: B3 }
  ];
  for (let c of candidatos) {
    if (dist(mouseX, mouseY, c.p.x, c.p.y) < 12) {
      arrastrado = c.key;
      break;
    }
  }
}
 
function mouseDragged() {
  if (arrastrado === 'A1') { A1.x = mouseX; A1.y = mouseY; }
  if (arrastrado === 'A2') { A2.x = mouseX; A2.y = mouseY; }
  if (arrastrado === 'A3') { A3.x = mouseX; A3.y = mouseY; }
  if (arrastrado === 'B2') { B2.x = mouseX; B2.y = mouseY; }
  if (arrastrado === 'B3') { B3.x = mouseX; B3.y = mouseY; }
}
 
function mouseReleased() { arrastrado = null; }
 
function keyPressed() {
  if (key === 'r' || key === 'R') resetPuntos();
}