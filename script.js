let canvas = document.getElementById("mycanvas");
let ctx = canvas.getContext("2d");

//Practice some drawing
// ctx.strokeStyle = "blue";
// ctx.strokeRect(200, 50, 100, 100);

// //draw circle
// ctx.beginPath();
// ctx.arc(150, 250, 40, 0, Math.PI *2);
// ctx.fillStyle = "green";
// ctx.fill();

// //draw some lines
// ctx.beginPath();
// ctx.moveTo(300, 200);
// ctx.lineTo(400, 300);
// ctx.strokeStyle = 'purple';
// ctx.lineWidth = 3;
// ctx.stroke();

//lets draw a face

function eyes(x,y){
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI *2);
    ctx.fillStyle = "black";
    ctx.fill();
}

//circle for face
ctx.beginPath();
ctx.arc(300, 300, 50, 0, Math.PI *2);
ctx.strokeStyle = "black";
ctx.lineWidth = 2;
ctx.stroke();

eyes(275, 290);
eyes(320, 290);

//drawing nose
ctx.beginPath();
ctx.moveTo(296,295);
ctx.lineTo(297, 315);
ctx.strokeStyle = "black";
ctx.lineWidth = 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(297,315);
ctx.lineTo(300, 312);
ctx.strokeStyle = "black";
ctx.lineWidth = 2;
ctx.stroke();

//draw mouth
// ctx.beginPath();
// ctx.ellipse(
//   298, // x (center)
//   330, // y (center)
//   20,  // radiusX (horizontal radius)
//   8,  // radiusY (vertical radius)
//   0,   // rotation (in radians)
//   0,   // start angle
//   2 * Math.PI // end angle
// );
// ctx.strokeStyle = 'black';
// ctx.lineWidth = 2;
// ctx.stroke();
ctx.beginPath();
ctx.arc(298, 325, 20, 0, Math.PI, false);
ctx.stroke();

//next touches

// Eyebrows
ctx.beginPath();
ctx.moveTo(265, 275);  // Left eyebrow
ctx.lineTo(285, 275);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(310, 275);  // Right eyebrow
ctx.lineTo(330, 275);
ctx.stroke();

// Hat (simple triangle)
ctx.beginPath();
ctx.moveTo(250, 270);  // Left corner
ctx.lineTo(350, 270);  // Right corner
ctx.lineTo(300, 220);  // Top point
ctx.closePath();
ctx.fillStyle = "green";
ctx.fill();
ctx.stroke();


//let's try animate feature
let x = 100;
let y = 100;
let dx = 2;
let dy = 2;
const radius = 20;

function update(){
    ctx.clearRect(0,0, canvas.width, canvas.height);


    //draw the ball
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();

    //move the ball by dx and dy
    x +=  dx;
    y +=  dy;

    //let's make the ball bouncy on the edges
    if(x + radius >canvas.width || x-radius < 0){
        dx = -dx;
    }
    if(y + radius > canvas.height || y - radius < 0){
        dy = -dy;
    }
    requestAnimationFrame(update);
}

update();
