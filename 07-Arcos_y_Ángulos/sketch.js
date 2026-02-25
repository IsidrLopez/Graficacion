// Ejercicio 1
arc(200, 110, 180, 180, 0, HALF_PI);

// Ejercicio 2
arc(200, 110, 180, 180, PI, TWO_PI);

// Ejercicio 3
for (let i=0; i<12; i++){
  let a = (TWO_PI/12)*i - HALF_PI;
  let x1=cx+r1*cos(a), y1=cy+r1*sin(a);
  let x2=cx+r1*cos(a), y2=cy+r1*sin(a);

}

// Ejercicio 4
let a1 = frameCount * 0.04;
let a2 = frameCount * 0.008;

line(cx, cy, cx+r*0.8*cos(a1), cy+r*0.8*sin(a1));
line(cx, cy, cx+r*0.5*cos(a2), cy+r*0.5*sin(a2));

// Ejercicio 5
function draw(){
  let s = (second()/60) * TWO_PI - HALF_PI;
  let m = (minuto()/60) * TWO_PI - HALF_PI;
  let h = (hour()  /12) * TWO_PI - HALF_PI;

  line(cx,cy, cx+r*0.9*cos(s), cy+r*0.9*sin(s));

  line(cx,cy, cx+r*0.75*cos(m), cy+r*0.75*sin(m));

  line(cx,cy, cx+r*0.5*cos(h), cy+r*0.5*sin(h));

}
