// Ejercicio 1
fill(255, 80, 80);
circle(80, 100, 80);
fill(80, 220, 160);
circle(200, 100, 80);
fill(80, 160, 255);
circle(320, 100, 80);

// Ejercicio 2
strokeWeight(1);
circle(80, 100, 80);
strokeWeight(4);
circle(200, 100, 80);
strokeWeight(10);
circle(320, 100, 80);

// Ejercicio 3
noFill();
stroke(108, 143, 255);
strokeWeight(3);
circle(200, 100, 120);
rect(130, 60, 140, 80);

// Ejercicio 4
for (let i =0; i <innerWidth; i++){
    let c = (i/width) * 255;
    stroke(c);
    line(i, 0, i, height);
}

// Ejercicio 5
colorMode(HSB);
for( let i = 0; i < width; i++){
    stroke(i% 360, 100, 100);
    line(i, 0, i, height);

}
