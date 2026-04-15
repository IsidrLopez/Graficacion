function setup() {
   createCanvas(600, 400, WEBGL); 
}

function draw(){
  background(30);
  orbitControl();
  stroke(255);
  strokeWeight(2);
  noFill();

  // 4 vertices de una piramide
  let v = [
    [0, -100, 0],
    [-80, 60, -80],
    [80, 60, 80],
  ];

  // Aristas: base + lados
  let e = [
    [1, 2], [2, 3], [3, 1],
    [0, 1], [0, 2], [0, 3],
  ];

  for (let i of e){
    let a = v[i[0]];
    let b = v[i[1]];
    line(a[0], a[1], a[2], a[0], a[1], a[2]);
  }
   
}