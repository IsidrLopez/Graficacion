// Ejercicio 1 
  //let x =0;
  //function setup() {
  //createCanvas(600, 200);
  //background(220);
//}

  //function draw() {
  //background(220);
  //circle(x, height/2, 40);
  //x = x + 3;
  //fill(0);
  //text(`Frame: ${frameCount}`, 10, 20);
  //text(`Posición x: ${Math.round(x)}`, 10, 40);
//}

// Ejercicio 2
//let x2 = 0;
 //function setup() {
    //createCanvas(600, 200);
//}

//function draw() {
    //circle(x2, height/2, 40);
    //x2 += 3;
    //if (x2 > width + 20) {
        //x2 = -20;
    //}
//}

// Ejercicio 3
//let x3 = 0;

//function setup() {
    //createCanvas(600, 200);
    //frameRate(30);
//}

//function draw() {
    //background(220);
    //circle(x3, height/2, 40);
    //x3 += 3;
    
    //text(`FPS: ${frameRate().toFixed(1)}`, 10, 20);
    //text(`Frame: ${frameCount}`, 10, 40);
    
    //if (x3 > width + 20) {
        //x3 = -20;
    //}
//}

// Ejercicio 4
//let y = 0;

//function setup() {
    //createCanvas(200, 400);
//}

//function draw() {
    //background(220);
    //circle(width/2, y, 40);
    //y += 3;
    
    //if (y > height + 20) {
        //y = -20;
    //}
//}

 // Ejercicio 5
   //let x = 0;
//let velocidad = 3;

//function setup() {
    //createCanvas(600, 200);
//}

//function draw() {
    //background(220);
    
    //circle(x, height/2, 40);
    
    //x += velocidad;
    
    //if (x > width - 20 || x < 20) {
        //velocidad = -velocidad;
    //}
    
    //fill(0);
    //text(`Posición: ${Math.round(x)}`, 10, 20);
    //text(`Velocidad: ${velocidad}`, 10, 40);
    //text(`Frame: ${frameCount}`, 10, 60);
    
//}

// Ejercicio 6
//let x6 = 200;
//let y6 = 100;
//let vx = 4;
//let vy = 3;
//let radio = 20;

//function setup() {
    //createCanvas(400, 300);
//}

//function draw() {
    //background(220);
    
    //circle(x6, y6, radio*2);
    
    //x6 += vx;
    //y6 += vy;
    
    //if (x6 > width - radio || x6 < radio) {
        //vx = -vx;
    //}
    
    //if (y6 > height - radio || y6 < radio) {
       // vy = -vy;
    //}
    
    t//ext(`vx = ${vx}`, 10, 20);
    //text(`vy = ${vy}`, 10, 40);
//}

// Ejercicio 7
let x7 = 200;
let y7 = 50;
let vx7 = 2;
let vy7 = 0;
let gravedad = 0.5;
//let radio = 20;

function setup() {
    createCanvas(400, 300);
}

function draw() {
    background(220);
    
    // Dibujar círculo
    circle(x7, y7, radio*2);
    
    vy7 += gravedad;
    
    // Mover
    x7 += vx7;
    y7 += vy7;
    
    if (y7 > height - radio) {
        y7 = height - radio;
        vy7 = -vy7 * 0.8; 
    }
    
    if (x7 > width - radio || x7 < radio) {
        vx7 = -vx7;
    }
    
    text(`vy = ${vy7.toFixed(1)}`, 10, 20);
    text(`Energía: ${((vx7*vx7 + vy7*vy7)/2).toFixed(1)}`, 10, 40);
}

// Ejercicio 8
let x8 = 0;
let animando = true;

function setup() {
    createCanvas(400, 200);
}

function draw() {
    background(220);
    circle(x8, height/2, 40);
    x8 += 2;
    
    if (x8 > width + 20) {
        x8 = -20;
    }
    
    text("Presiona 'p' para pausar/reanudar", 10, 20);
    text("Presiona 'd' para avanzar un frame", 10, 40);
    text(`Animando: ${animando ? "SÍ" : "NO"}`, 10, 60);
}

function keyPressed() {
    if (key === 'p') {
        if (animando) {
            noLoop();  
            animando = false;
        } else {
            loop();    
            animando = true;
        }
    }
    
    if (key === 'd') {
        redraw();
    }
}

