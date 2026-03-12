// CAPÍTULO 5 — Desafío 3: Firma tipo script con Bézier
// Varias curvas encadenadas forman una firma estilizada
 
let t;           // parámetro t ∈ [0,1] para el objeto animado
let velocidad;
let mostrarControles;
let mostrarObjeto;
let segmentos;
 
function setup() {
  createCanvas(700, 380);
  t = 0;
  velocidad = 0.004;
  mostrarControles = false;
  mostrarObjeto    = true;
  definirFirma();
}
 
function definirFirma() {
  // Firma estilizada "ISC" con curvas encadenadas
  // Cada segmento: [x0,y0, x1,y1, x2,y2, x3,y3]
  segmentos = [
    // I
    [120,280, 120,200, 120,150, 120,100],
    [120,100, 120, 80, 140, 70, 160, 80],
    // S
    [200,100, 280, 60, 320,140, 260,190],
    [260,190, 200,240, 240,300, 320,270],
    // C
    [380,120, 340, 70, 260, 90, 260,180],
    [260,180, 260,270, 340,300, 400,260],
    // Rúbrica final
    [400,260, 460,230, 520,290, 580,200],
    [580,200, 620,160, 600,320, 480,320],
  ];
}
 
// Objeto animado: obtener posición en el segmento i, parámetro u
function getPosEnFirma(tGlobal) {
  let n   = segmentos.length;
  let idx = floor(tGlobal * n);
  idx     = constrain(idx, 0, n - 1);
  let u   = (tGlobal * n) - idx; // t local [0,1] dentro del segmento
 
  let s = segmentos[idx];
  let x = bezierPoint(s[0], s[2], s[4], s[6], u);
  let y = bezierPoint(s[1], s[3], s[5], s[7], u);
  return { x, y };
}
 
function draw() {
  background(252, 250, 245);
 
  // Dibujar la Forma
  for (let i = 0; i < segmentos.length; i++) {
    let s = segmentos[i];
 
    // Polígono de control (opcional)
    if (mostrarControles) {
      stroke(200, 180, 150, 150);
      strokeWeight(1);
      noFill();
      beginShape();
      vertex(s[0],s[1]); vertex(s[2],s[3]);
      vertex(s[4],s[5]); vertex(s[6],s[7]);
      endShape();
 
      // Puntos de control
      fill(200, 150, 80, 200);
      noStroke();
      circle(s[2],s[3],8);
      circle(s[4],s[5],8);
 
      // Anclas
      fill(80, 130, 200, 200);
      circle(s[0],s[1],10);
      circle(s[6],s[7],10);
    }
 
    // La curva Bézier
    // Grosor varía por segmento para simular presión de pluma
    let grosores = [3, 2.5, 3, 2.5, 3, 2, 2, 1.5];
    stroke(40, 30, 20);
    strokeWeight(grosores[i] || 2);
    noFill();
    bezier(s[0],s[1], s[2],s[3], s[4],s[5], s[6],s[7]);
  }
 
  // Objeto Animado (Estrella)
  if (mostrarObjeto) {
    t += velocidad;
    if (t > 1) t = 0;
 
    let pos = getPosEnFirma(t);
 
    // Estela
    for (let i = 1; i <= 6; i++) {
      let pt = max(0, t - i * 0.008);
      let pp = getPosEnFirma(pt);
      fill(255, 200, 60, 40 - i * 6);
      noStroke();
      circle(pp.x, pp.y, 10 - i);
    }
 
    // Punto principal
    fill(255, 180, 20);
    noStroke();
    circle(pos.x, pos.y, 12);
    fill(255, 240, 120);
    circle(pos.x, pos.y, 6);
  }
 
  // HUD
  noStroke();
  fill(100);
  textSize(11);
  textFont('monospace');
  text(`t = ${nf(t, 1, 3)}  (${segmentos.length} segmentos)`, 10, 20);
  text(`C: mostrar controles (${mostrarControles?'ON':'OFF'})`, 10, height-24);
  text(`O: objeto animado (${mostrarObjeto?'ON':'OFF'})  |  ↑↓ velocidad  |  R: reset`, 10, height-10);
}
 
function keyPressed() {
  if (key === 'c' || key === 'C') mostrarControles = !mostrarControles;
  if (key === 'o' || key === 'O') mostrarObjeto    = !mostrarObjeto;
  if (keyCode === UP_ARROW)   velocidad = min(velocidad + 0.001, 0.02);
  if (keyCode === DOWN_ARROW) velocidad = max(velocidad - 0.001, 0.0005);
  if (key === 'r' || key === 'R') { t = 0; definirFirma(); }
}
 