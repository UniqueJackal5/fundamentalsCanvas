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

// function eyes(x,y){
//     ctx.beginPath();
//     ctx.arc(x, y, 10, 0, Math.PI *2);
//     ctx.fillStyle = "black";
//     ctx.fill();
// }

// //circle for face
// ctx.beginPath();
// ctx.arc(300, 300, 50, 0, Math.PI *2);
// ctx.strokeStyle = "black";
// ctx.lineWidth = 2;
// ctx.stroke();

// eyes(275, 290);
// eyes(320, 290);

// //drawing nose
// ctx.beginPath();
// ctx.moveTo(296,295);
// ctx.lineTo(297, 315);
// ctx.strokeStyle = "black";
// ctx.lineWidth = 2;
// ctx.stroke();

// ctx.beginPath();
// ctx.moveTo(297,315);
// ctx.lineTo(300, 312);
// ctx.strokeStyle = "black";
// ctx.lineWidth = 2;
// ctx.stroke();

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
// ctx.beginPath();
// ctx.arc(298, 325, 20, 0, Math.PI, false);
// ctx.stroke();

// //next touches

// // Eyebrows
// ctx.beginPath();
// ctx.moveTo(265, 275);  // Left eyebrow
// ctx.lineTo(285, 275);
// ctx.stroke();

// ctx.beginPath();
// ctx.moveTo(310, 275);  // Right eyebrow
// ctx.lineTo(330, 275);
// ctx.stroke();

// // Hat (simple triangle)
// ctx.beginPath();
// ctx.moveTo(250, 270);  // Left corner
// ctx.lineTo(350, 270);  // Right corner
// ctx.lineTo(300, 220);  // Top point
// ctx.closePath();
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.stroke();


//let's try animate feature
let balls = [];
let friction = 0.99;
let gravity = 0.5;
const defaultRadius = 8;

class Ball {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.dx = (Math.random() - 0.5) * 10;
    this.dy = (Math.random() - 0.5) * 10;
    this.radius = defaultRadius * (0.5 + Math.random());
  }
}

// Add event listeners for controls
document.getElementById('gravitySlider').addEventListener('input', function(e) {
    gravity = parseFloat(e.target.value);
    document.getElementById('gravityValue').textContent = gravity.toFixed(1);
});

document.getElementById('frictionSlider').addEventListener('input', function(e) {
    friction = parseFloat(e.target.value);
    document.getElementById('frictionValue').textContent = friction.toFixed(2);
});

document.getElementById('velXSlider').addEventListener('input', function(e) {
    document.getElementById('velXValue').textContent = parseFloat(e.target.value).toFixed(1);
});

document.getElementById('velYSlider').addEventListener('input', function(e) {
    document.getElementById('velYValue').textContent = parseFloat(e.target.value).toFixed(1);
});

document.getElementById('applyVelocity').addEventListener('click', function() {
    // Initialize balls array with specified count
    const ballCount = parseInt(document.getElementById('ballCount').value) || 5;
    balls = Array.from({length: ballCount}, () => new Ball());
});

document.getElementById('resetParams').addEventListener('click', function() {
    gravity = 0.5;
    friction = 0.99;
    document.getElementById('gravitySlider').value = gravity;
    document.getElementById('frictionSlider').value = friction;
    document.getElementById('velXSlider').value = 0;
    document.getElementById('velYSlider').value = 0;
    document.getElementById('gravityValue').textContent = gravity.toFixed(1);
    document.getElementById('frictionValue').textContent = friction.toFixed(2);
    document.getElementById('velXValue').textContent = 0;
    document.getElementById('velYValue').textContent = 0;
    
    // Reset balls array
    balls = Array.from({length: 5}, () => new Ball());
    document.getElementById('ballCount').value = 5;
});

function update(){
    ctx.clearRect(0,0, canvas.width, canvas.height);

    // Draw all balls
    balls.forEach(b => ball(b));
    requestAnimationFrame(update);
}

function ball(b){
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 60%)`;
    ctx.fill();

    // Update ball physics
    b.x += b.dx;
    b.y += b.dy;
    b.dy += gravity;
    b.dx *= friction;
    b.dy *= friction * 0.98;
    
    // Stop micro movements
    if(Math.abs(b.dx) < 0.5) b.dx = 0;

    // Handle canvas boundaries
    if(b.x + b.radius > canvas.width || b.x - b.radius < 0) {
        b.dx = -b.dx * friction;
    }
    if(b.y + b.radius > canvas.height - 0.1) {
        b.dy = -b.dy * 0.7;
        b.y = canvas.height - b.radius;
        if(Math.abs(b.dy) < 0.5) b.dy = 0;
    }
    if(b.y - b.radius < 0) {
        b.dy = -b.dy;
    }
}

update();
