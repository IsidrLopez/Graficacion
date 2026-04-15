function setup() {
   createCanvas(700, 500, WEBGL); 
}

function draw() {
  background (30);
  orbitControl();

  let r = 120;
  let detalle = 20;

  rotateY(frameCount * 0.01);
  stroke(100, 200, 255);
  noFill();

  for (let i = 0; i < detalle; i++){
    let phi1 = map(i,     0, detalle, 0, PI);
    let phi2 = map(i + 1, 0, detalle, 0, PI);

    beginShape(TRIANGLE_STRIP);
    for (let l= 0; j <= detalle; j++){
      let theta = map(j, 0, detalle, 0, TWO_PI);

      // Punto superior del anillo
      let x1 = r * sin(phi1) * cos(theta);
      let y1 = r * cos(phi1);
      let z1 = r * sin(phi1) * sin(theta);
      vertex(x1, y1, z1);

      // Punto inferior del anillo
      let x2 = r * sin(phi2) * cos(theta);
      let y2 = r * cos(phi2);
      let z2 = r * sin(phi2) * sin(theta);
      vertex(x2, y2, z2);

    }
    endShape();
  }
}

