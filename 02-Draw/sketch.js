//Ejercicio 1 
  let x = 0, vel = 5;
  function setup(){
    createCanvas(400,200);{
        background(30);
        circle(x, 100, 40);
        x += vel;
        if (x > width) x=0;
    }
  }
// Ejercicio 2
let y = 0, vel = 3;
function setup(){
    createCanvas(400,200);
    function draw(){
        background(30);
        circle(200, y ,40);
        y += vel;
        if (y > height) y = 0;

    }

}

// Ejercicio 3
let x = 0;
function setup(){
    createCanvas(400, 200);
    frameRate(30);

}
function draw(){
    background(30);
    circle(x, 100, 40);
    x += 3;
    if (x > width) x = 0;
}

// Ejercicio 4
let x= 0, contador = 0;
function setup(){
    createCanvas(400, 200);{
        function draw(){
            background(30);
            circle(x, 100, 40);
            x += 4;
            contador++;
            if (x > width){
                x = 0; contador = 0;
            }
        }
    }
}

//Ejercicio 5
let x=200, y=100, vx=3, vy=2;
function setup(){
    createCanvas(400, 200);{
        function draw(){
            background(30);
            circle(x, y ,40);
            x += vx; y += vy;
            if (x > width-20  || x < 20) vx *= -1;
            if (y > height-20 || y < 20) vy *= -1;
            
        }
    }
}

 // Ejercicio 6
 let x=200, y=20, vy=0;
 const g = 0.4;
 function setup(){
    createCanvas(400, 200);{
        function draw(){
            background(30);
            vy += g;
            y  += vy;
            if ( y > height-20){
                y = height-20;
                vy *= 0.85;
            }
            circle(x, y, 40);
        }
    }
 }


