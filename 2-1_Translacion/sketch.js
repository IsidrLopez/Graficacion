let tx = 0;
function setup(){
  rectMode(CENTER);

}
function draw() {
  background(240);
  tx += 2;

  push();
  translate(tx,0);
  fill(200, 80, 80);
  rect(150, 150, 120, 60);

  fill(80, 120, 200);
  circle(150, 110, 40);
  pop();  
}