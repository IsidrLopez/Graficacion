function setup() {
  createCanvas(600, 400);
  
}

function draw() {
  background(220);
  //Linea vertical central
  line(width/2,0, width/2,height);
  //Linea horizontal central
  line(0,height/2,width,height/2);
  //Ejercicio 1
  circle(width/2,height/2.5);
  //Ejercicio 2
  circle(0,0,50);
  circle(width, 0 ,50);
  circle(0,height,50);
  circle(width, height, 50);
  //Ejercicio 3
  let anchoRect = 200;
  let altoRect = 150;
  React(width/2 - anchoRect/ 52,height/2 - altoRect/2, anchoRect,altoRect);

}