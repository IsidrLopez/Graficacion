// ============================================================
// CAPÍTULO 5 — Figuras Geométricas en p5.js
// Temas: line, rect, circle, ellipse, triangle, arc, quad
// Alumno: Isidro López | ID: 24170608
// ============================================================

function setup() {
  createCanvas(700, 500);
}

function draw() {
  background(240);

  // ----------------------------------------------------------
  // TÍTULO
  // ----------------------------------------------------------
  fill(30);
  noStroke();
  textSize(15);
  text("Figuras Geométricas en p5.js", 10, 22);

  // ----------------------------------------------------------
  // 1. line(x1, y1, x2, y2)
  // Recta entre P1=(x1,y1) y P2=(x2,y2)
  // Pendiente: m = (y2-y1)/(x2-x1)
  // ----------------------------------------------------------
  stroke(200, 50, 50);
  strokeWeight(3);
  line(20, 50, 120, 110);
  noStroke(); fill(0); textSize(11);
  text("line()", 45, 130);

  // ----------------------------------------------------------
  // 2. rect(x, y, w, h)
  // R = {(x,y) | a ≤ x ≤ a+w, b ≤ y ≤ b+h}
  // ----------------------------------------------------------
  stroke(0);
  strokeWeight(2);
  fill(100, 150, 255);
  rect(140, 50, 90, 60);
  noStroke(); fill(0); textSize(11);
  text("rect()", 165, 130);

  // ----------------------------------------------------------
  // 3. square(x, y, s) — caso particular: w = h = s
  // ----------------------------------------------------------
  stroke(0);
  strokeWeight(2);
  fill(255, 180, 50);
  square(250, 50, 60);
  noStroke(); fill(0); textSize(11);
  text("square()", 255, 130);

  // ----------------------------------------------------------
  // 4. circle(x, y, d)
  // Ecuación: (x-a)^2 + (y-b)^2 = r^2
  // d = diámetro = 2r
  // ----------------------------------------------------------
  stroke(0);
  strokeWeight(2);
  fill(80, 200, 120);
  circle(400, 80, 70); // centro (400,80), diámetro 70
  noStroke(); fill(0); textSize(11);
  text("circle()", 375, 130);

  // ----------------------------------------------------------
  // 5. ellipse(x, y, w, h)
  // Ecuación: (x-a)²/rx² + (y-b)²/ry² = 1
  // rx = w/2, ry = h/2
  // ----------------------------------------------------------
  stroke(0);
  strokeWeight(2);
  fill(220, 100, 200);
  ellipse(510, 80, 90, 50); // elipse ancha
  noStroke(); fill(0); textSize(11);
  text("ellipse()", 480, 130);

  // ----------------------------------------------------------
  // 6. triangle(x1,y1, x2,y2, x3,y3)
  // Polígono de 3 vértices
  // ----------------------------------------------------------
  stroke(0);
  strokeWeight(2);
  fill(255, 100, 100);
  triangle(630, 110, 590, 50, 670, 50);
  noStroke(); fill(0); textSize(11);
  text("triangle()", 595, 130);

  // ----------------------------------------------------------
  // 7. arc(x, y, w, h, start, stop)
  // Porción de elipse desde ángulo start hasta stop (radianes)
  // ----------------------------------------------------------
  stroke(0);
  strokeWeight(2);
  fill(255, 220, 50);
  arc(60, 200, 80, 80, 0, PI);         // semicírculo inferior
  noStroke(); fill(0); textSize(11);
  text("arc(0, PI)", 25, 255);

  stroke(0);
  fill(50, 200, 200);
  arc(160, 200, 80, 80, 0, TWO_PI * 0.75); // 270°
  noStroke(); fill(0); textSize(11);
  text("arc(0, 3π/2)", 130, 255);

  // ----------------------------------------------------------
  // 8. quad(x1,y1, x2,y2, x3,y3, x4,y4)
  // Polígono de 4 lados (unión de 2 triángulos)
  // Los puntos deben darse en orden horario o antihorario
  // ----------------------------------------------------------
  stroke(0);
  strokeWeight(2);
  fill(200, 150, 255);
  quad(250, 165, 320, 155, 340, 230, 260, 245);
  noStroke(); fill(0); textSize(11);
  text("quad()", 270, 260);

  // ----------------------------------------------------------
  // 9. POLÍGONO REGULAR con trigonometría
  // x = cx + r*cos(θ)   y = cy + r*sin(θ)
  // Dividimos 2π entre el número de lados
  // ----------------------------------------------------------
  let lados = 6; // hexágono
  let cx    = 450;
  let cy    = 200;
  let r     = 50;

  stroke(0);
  strokeWeight(2);
  fill(150, 255, 150);
  beginShape();
  for (let i = 0; i < lados; i++) {
    let angulo = TWO_PI * i / lados - HALF_PI; // empezar arriba
    let px = cx + r * cos(angulo);
    let py = cy + r * sin(angulo);
    vertex(px, py);
  }
  endShape(CLOSE);
  noStroke(); fill(0); textSize(11);
  text("Hexágono\nTrigonom.", 420, 265);

  // ----------------------------------------------------------
  // 10. CASA — ejemplo integrador del capítulo
  // Combina: rect (base), triangle (techo), rect (puerta), circle (sol)
  // ----------------------------------------------------------
  fill(30);
  noStroke();
  textSize(13);
  text("Ejemplo integrador: Casa", 10, 300);

  let bx = 30, by = 320;

  // Base
  fill(200, 150, 100);
  stroke(0); strokeWeight(2);
  rect(bx, by, 160, 120);

  // Techo (triángulo isósceles)
  fill(150, 50, 50);
  triangle(bx, by, bx + 80, by - 70, bx + 160, by);

  // Puerta
  fill(100, 60, 20);
  rect(bx + 60, by + 55, 40, 65);

  // Ventana
  fill(180, 220, 255);
  rect(bx + 15, by + 20, 35, 35);
  stroke(0); strokeWeight(1);
  line(bx + 32, by + 20, bx + 32, by + 55); // cruz ventana
  line(bx + 15, by + 37, bx + 50, by + 37);

  // Sol
  fill(255, 220, 0);
  noStroke();
  circle(bx + 220, by - 30, 55);

  // Suelo
  fill(100, 180, 80);
  noStroke();
  rect(bx, by + 120, 160, 15);

  // Descripción matemática
  noStroke(); fill(60); textSize(11);
  text("Base: rect(30,320,160,120)", 210, 325);
  text("Techo: triangle(isósceles)",  210, 342);
  text("Puerta: rect(90,375,40,65)",  210, 359);
  text("Sol: circle(250,290,55)",     210, 376);
  text("Círculo: (x-a)²+(y-b)²=r²",  210, 393);

  // Título inferior
  noStroke(); fill(80); textSize(11);
  text("Toda figura es un subconjunto F ⊂ ℤ² del plano discreto", 10, height - 8);
}
