let vertices = [
  [-50, -50, -50], [50, -50, -50], [50, 50, -50], [-50, 50, -50],
  [-50, -50,  50], [50, -50,  50], [50, 50,  50], [-50, 50,  50]
];

let edges = [
   [0,1], [1,2], [2,3], [3,0],  // cara trasera
   [4,5], [5,6], [6,7], [7,4],  // cara delantera
   [0,4], [1,5], [2,6], [3,7],  // laterales
]

function setup() {
   createCanvas(800, 500, WEBGL); 
}

function draw(){
  background(30);
  orbitControl();

  // Cubo wireframe (izquierda)
  push();
  translate(-220, 0, 0);
  stroke(255);
  noFill();
  rotateY(frameCount * 0.01);
  for (let e of edges) {
    let v1 = vertices[e[0]];
    let v2 = vertices[e[1]];
    line(v1[0], v1[1], v1[2], v2[0], v2[1], v2[2]);

  }
  pop();

  // Esfera (centro)
  push();
  noStroke();
  fill(100, 180, 255);
  sphere(60);
  pop();

  // Objeto rotanto en eje arbitrario (derecha)
  push();
  translate(220, 0, 0);
  noStroke();
  fill(220 ,180, 60);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.015);
  torus(50, 15);
  pop();

}
 

