function setup(){
  createCanvas(500,250);
}

function draw(){
  background(230);

  textSize(14);
  fill(0);
  text("Con smooth", 80, 30);
  text("Sin smooth", 330, 30);

  smooth();
  strokeWeight(10);
  line(50, 200, 150, 50);
  circle(100,150,80);

  noSmooth();
  line(300,200,400,500);
  circle(350,150,80);
  }
