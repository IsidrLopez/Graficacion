
Copiar

// ============================================================
// CAPÍTULO 7 — Arcos y Ángulos
// Temas: arc(), radianes, cos/sin, reloj analógico
// Alumno: Isidro López | ID: 24170608
// ============================================================

function setup() {
  createCanvas(600, 420);
}

function draw() {
  background(30, 30, 45);

  // ----------------------------------------------------------
  // SECCIÓN 1 — Tabla de arcos
  // arc(x, y, w, h, start, stop)
  // Un arco es una porción de elipse entre dos ángulos en radianes
  // π rad = 180°   →   círculo completo = 2π rad
  // ----------------------------------------------------------
  fill(255);
  noStroke();
  textSize(13);
  text("Tabla de Arcos (radianes):", 10, 22);

  let arcos = [
    { start: 0,       stop: HALF_PI,  label: "0 → π/2",   color: [255, 100, 100] },
    { start: 0,       stop: PI,       label: "0 → π",     color: [100, 255, 100] },
    { start: 0,       stop: PI*1.5,   label: "0 → 3π/2",  color: [100, 100, 255] },
    { start: 0,       stop: TWO_PI,   label: "0 → 2π",    color: [255, 220, 50]  },
    { start: -HALF_PI,stop: HALF_PI,  label: "-π/2 → π/2",color: [255, 150, 0]  }
  ];

  for (let i = 0; i < arcos.length; i++) {
    let ax = 55 + i * 110;
    let ay = 80;

    stroke(arcos[i].color[0], arcos[i].color[1], arcos[i].color[2]);
    strokeWeight(3);
    fill(arcos[i].color[0], arcos[i].color[1], arcos[i].color[2], 60);
    arc(ax, ay, 70, 70, arcos[i].start, arcos[i].stop, PIE);

    noStroke();
    fill(200);
    textSize(10);
    textAlign(CENTER);
    text(arcos[i].label, ax, ay + 48);
    textAlign(LEFT);
  }

  // ----------------------------------------------------------
  // SECCIÓN 2 — Trigonometría: punto en un círculo
  // x = cx + r*cos(θ)
  // y = cy + r*sin(θ)
  // ----------------------------------------------------------
  fill(200);
  noStroke();
  textSize(12);
  text("Trigonometría: x=cx+r·cos(θ)   y=cy+r·sin(θ)", 10, 148);

  // Círculo de referencia
  let cx2 = 100, cy2 = 220, r2 = 55;
  let ang2 = frameCount * 0.03; // ángulo que avanza con el tiempo

  noFill();
  stroke(100);
  strokeWeight(1);
  circle(cx2, cy2, r2 * 2);

  // Punto en la circunferencia
  let px = cx2 + r2 * cos(ang2);
  let py = cy2 + r2 * sin(ang2);

  stroke(100, 200, 255);
  strokeWeight(2);
  line(cx2, cy2, px, py); // radio

  fill(255, 80, 80);
  noStroke();
  circle(px, py, 10);

  // Proyecciones
  stroke(255, 100, 100, 150);
  strokeWeight(1);
  line(cx2, cy2, px, cy2); // proyección X
  line(px, cy2, px, py);   // proyección Y

  fill(220);
  noStroke();
  textSize(10);
  text("θ = " + nf(ang2 % TWO_PI, 1, 2) + " rad", cx2 - 30, cy2 + 75);
  text("x = " + nf(px - cx2, 1, 1), cx2 - 30, cy2 + 90);
  text("y = " + nf(py - cy2, 1, 1), cx2 - 30, cy2 + 105);

  // ----------------------------------------------------------
  // RELOJ ANALÓGICO
  // Usamos second(), minute(), hour() reales del sistema
  // Cada manecilla: ángulo = (valor / total) * TWO_PI
  // Restamos HALF_PI para que 0 apunte arriba (12 en reloj)
  // ----------------------------------------------------------
  let rcx = 420, rcy = 240, rr = 130;

  // Fondo del reloj
  fill(20, 20, 35);
  stroke(100, 100, 130);
  strokeWeight(3);
  circle(rcx, rcy, rr * 2);

  // 12 marcas horarias con trigonometría
  for (let i = 0; i < 12; i++) {
    let a  = TWO_PI * i / 12 - HALF_PI;
    let x1 = rcx + (rr - 8)  * cos(a);
    let y1 = rcy + (rr - 8)  * sin(a);
    let x2 = rcx + (rr - 18) * cos(a);
    let y2 = rcy + (rr - 18) * sin(a);
    stroke(200);
    strokeWeight(i % 3 === 0 ? 3 : 1);
    line(x1, y1, x2, y2);
  }

  // 60 marcas de minutos
  for (let i = 0; i < 60; i++) {
    let a  = TWO_PI * i / 60 - HALF_PI;
    let x1 = rcx + (rr - 5)  * cos(a);
    let y1 = rcy + (rr - 5)  * sin(a);
    let x2 = rcx + (rr - 10) * cos(a);
    let y2 = rcy + (rr - 10) * sin(a);
    stroke(100);
    strokeWeight(1);
    line(x1, y1, x2, y2);
  }

  // Hora real del sistema
  let s  = second();
  let m  = minute();
  let h  = hour() % 12;

  // Manecilla de HORAS
  let angH = (h / 12 + m / 720) * TWO_PI - HALF_PI;
  stroke(255);
  strokeWeight(6);
  line(rcx, rcy,
       rcx + rr * 0.5 * cos(angH),
       rcy + rr * 0.5 * sin(angH));

  // Manecilla de MINUTOS
  let angM = (m / 60 + s / 3600) * TWO_PI - HALF_PI;
  stroke(200, 200, 255);
  strokeWeight(4);
  line(rcx, rcy,
       rcx + rr * 0.75 * cos(angM),
       rcy + rr * 0.75 * sin(angM));

  // Manecilla de SEGUNDOS
  let angS = (s / 60) * TWO_PI - HALF_PI;
  stroke(255, 80, 80);
  strokeWeight(2);
  line(rcx, rcy,
       rcx + rr * 0.85 * cos(angS),
       rcy + rr * 0.85 * sin(angS));

  // Punto central
  fill(255);
  noStroke();
  circle(rcx, rcy, 10);

  // Arco de progreso de segundos
  stroke(255, 80, 80, 100);
  strokeWeight(6);
  noFill();
  arc(rcx, rcy, rr * 2 + 14, rr * 2 + 14, -HALF_PI, angS + HALF_PI * 0 - HALF_PI);

  // Hora digital
  fill(180);
  noStroke();
  textSize(12);
  textAlign(CENTER);
  text(nf(hour(), 2) + ":" + nf(m, 2) + ":" + nf(s, 2), rcx, rcy + rr + 18);
  textAlign(LEFT);

  // Fórmulas
  fill(160);
  textSize(11);
  text("angH = (h/12 + m/720) × 2π - π/2", 10, height - 28);
  text("angM = (m/60 + s/3600) × 2π - π/2", 10, height - 14);
}