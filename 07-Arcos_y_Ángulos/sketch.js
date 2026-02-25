// Ejercicio 1
arc(200, 110, 180, 180, 0, HALF_PI);

// Ejercicio 4
let cols= [[220,40,40],[240,240,240],
           [220,40,40],[240,240,240],[220,40,40]];
for (let i=0; i<5; i++){
  fill(...cols[i]);
  circle(200, 110, 200 - i*35);
}

// Ejercicio 5
fill(160,120,70);
rect(120,30,160,160,4);
fill(140,200,255,80);
rect(128,38,144,144);
stroke(160,120,70);
strokeWeight(6);
line(200,38,200,182);
line(128,110,272,110);

// Ejercicio 6
let n=8, r=55, cx=200, cy=110;
for (let i=0; ilet a = (TWO_PI/n)*i;
  circle(cx+r*cos(a), cy+r*sin(a), 50);
}
cricle(cx, cy, 45);

// Ejercicio 7
let n=6, cx=200, cy=110, r=88;
beginShape();
for (let i=0; ilet a = (TWO_PI)*i - HALF_PI;
     vertex(cx+r*cos(a), cy+r*sin(a))

     }
     endShape(CLOSE);