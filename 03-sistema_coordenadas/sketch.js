let mostrarEjes = true;
let mostrarCuadrantes = true;
let mostrarInfo = true;
let ejemploActual = 1;

function setup() {
    createCanvas(600, 400);
}

function draw() {
    background(240);
    
    if (ejemploActual === 1) {
        dibujarEjemplo1();
    } else if (ejemploActual === 2) {
        dibujarEjemplo2();
    } else if (ejemploActual === 3) {
        dibujarEjemplo3();
    } else if (ejemploActual === 4) {
        dibujarEjemplo4();
    }
    
    if (mostrarInfo) {
        mostrarCoordenadasMouse();
    }
    mostrarControles();
}

// Ejercicio 1:
function dibujarEjemplo1() {
    fill(0);
    textSize(14);
    textStyle(BOLD);
    text("EJEMPLO 1: Puntos en esquinas y centro", 10, 25);
    
    if (mostrarEjes) {
        dibujarEjes();
    }
    
    fill(255, 0, 0);
    noStroke();
    
    circle(0, 0, 10);
    text("(0,0)", 10, 15);
    
    circle(width, 0, 10);
    text(`(${width},0)`, width - 60, 15);
    
    circle(0, height, 10);
    text(`(0,${height})`, 10, height - 10);
    
    circle(width, height, 10);
    text(`(${width},${height})`, width - 70, height - 10);
    
    fill(0, 0, 255);
    circle(width/2, height/2, 15);
    fill(0);
    text(`Centro (${width/2}, ${height/2})`, width/2 - 70, height/2 - 15);
    
    fill(0);
    textSize(12);
    textStyle(NORMAL);
    text("El canvas es una matriz de píxeles:", 10, 60);
    text(`width × height = ${width} × ${height} = ${width * height} píxeles`, 10, 80);
    text("Cada punto tiene coordenadas (x, y) donde 0 ≤ x ≤ width, 0 ≤ y ≤ height", 10, 100);
}

// Ejercicio 2
function dibujarEjemplo2() {
    fill(0);
    textSize(14);
    textStyle(BOLD);
    text("EJEMPLO 2: Ejes centrales y cuadrantes", 10, 25);
    
    if (mostrarCuadrantes) {
        dibujarCuadrantes();
    }
    
    stroke(0, 100, 200);
    strokeWeight(2);
    
    line(width/2, 0, width/2, height);
    
    line(0, height/2, width, height/2);

    fill(0);
    noStroke();
    textSize(12);
    text("Línea vertical: x = width/2 = " + (width/2), 10, 60);
    text("Línea horizontal: y = height/2 = " + (height/2), 10, 80);
    
    fill(255, 0, 0);
    noStroke();
    
    let cx1 = width/4;
    let cy1 = height/4;
    circle(cx1, cy1, 8);
    fill(0);
    text(`(${cx1}, ${cy1})`, cx1 + 10, cy1 - 10);
    
    fill(0, 255, 0);
    let cx2 = 3 * width/4;
    let cy2 = height/4;
    circle(cx2, cy2, 8);
    fill(0);
    text(`(${cx2}, ${cy2})`, cx2 + 10, cy2 - 10);
    
    fill(0, 0, 255);
    let cx3 = width/4;
    let cy3 = 3 * height/4;
    circle(cx3, cy3, 8);
    fill(0);
    text(`(${cx3}, ${cy3})`, cx3 + 10, cy3 - 10);
    
    fill(255, 255, 0);
    let cx4 = 3 * width/4;
    let cy4 = 3 * height/4;
    circle(cx4, cy4, 8);
    fill(0);
    text(`(${cx4}, ${cy4})`, cx4 + 10, cy4 - 10);
}

// Ejercicio 3
function dibujarEjemplo3() {
    fill(0);
    textSize(14);
    textStyle(BOLD);
    text("EJEMPLO 3: Distancia entre puntos", 10, 25);
    
    let cx = width/2;
    let cy = height/2;

    noFill();
    stroke(100, 100, 255);
    strokeWeight(1);
    circle(cx, cy, 200);
    
    fill(255, 0, 0);
    noStroke();
    circle(cx, cy, 10);
    fill(0);
    text("Centro", cx - 30, cy - 15);
    
    fill(0, 0, 255);
    circle(mouseX, mouseY, 10);
    
    stroke(0, 200, 0);
    strokeWeight(2);
    line(cx, cy, mouseX, mouseY);
    
    let d = dist(cx, cy, mouseX, mouseY);

    fill(0);
    noStroke();
    textSize(12);
    text("Fórmula de distancia:", 10, 60);
    text("d = √[(x₂ - x₁)² + (y₂ - y₁)²]", 10, 80);
    text(`Centro: (${cx}, ${cy})`, 10, 100);
    text(`Mouse: (${mouseX}, ${mouseY})`, 10, 120);
    text(`Distancia: ${d.toFixed(2)} píxeles`, 10, 140);
    
    if (d < 100) {
        fill(0, 150, 0);
        text("¡El mouse está dentro del círculo!", 10, 160);
    }
}

// Ejercicio 4
function dibujarEjemplo4() {
    fill(0);
    textSize(14);
    textStyle(BOLD);
    text("EJEMPLO 4: Matriz de puntos (discretización)", 10, 25);
    
    let espaciado = 40;
    
    for (let x = espaciado; x < width; x += espaciado) {
        for (let y = espaciado; y < height; y += espaciado) {
            fill(x % 255, y % 255, (x + y) % 255);
            noStroke();
            circle(x, y, 5);
        }
    }
    fill(0);
    textSize(12);
    text("El canvas es una matriz discreta de píxeles:", 10, 60);
    text(`Cada punto tiene coordenadas enteras (x, y) ∈ ℤ²`, 10, 80);
    text(`En este ejemplo: puntos cada ${espaciado} píxeles`, 10, 100);
    text(`Total de puntos: ${Math.floor(width/espaciado) * Math.floor(height/espaciado)}`, 10, 120);
}

// Funciones Auxiliares
function dibujarEjes() {
    stroke(200);
    strokeWeight(1);
    
    line(0, height/2, width, height/2);
    
    line(width/2, 0, width/2, height);
    
    fill(150);
    noStroke();
    for (let i = 0; i <= width; i += 50) {
        text(i, i, height/2 - 5);
    }
    for (let i = 0; i <= height; i += 50) {
        text(i, width/2 + 5, i);
    }
}

function dibujarCuadrantes() {
    noStroke();

    fill(255, 200, 200, 50);
    rect(0, 0, width/2, height/2);
    
    fill(200, 255, 200, 50);
    rect(width/2, 0, width/2, height/2);
    
    fill(200, 200, 255, 50);
    rect(0, height/2, width/2, height/2);
    

    fill(255, 255, 200, 50);
    rect(width/2, height/2, width/2, height/2);
    
    fill(100);
    textSize(20);
    text("I", 20, height/4);
    text("II", width - 40, height/4);
    text("III", 20, 3 * height/4);
    text("IV", width - 40, 3 * height/4);
}

function mostrarCoordenadasMouse() {
    fill(0);
    noStroke();
    textSize(12);
    text(`Mouse: (${mouseX}, ${mouseY})`, width - 150, height - 20);
}

function mostrarControles() {
    fill(50);
    textSize(10);
    text("Controles:", 10, height - 50);
    text("Presiona 1, 2, 3, 4 para cambiar de ejemplo", 10, height - 35);
    text("Presiona 'e' para mostrar/ocultar ejes", 10, height - 20);
    text("Presiona 'c' para mostrar/ocultar cuadrantes", 10, height - 5);
}