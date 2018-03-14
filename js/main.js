var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var paddleHeight = 75;
var paddleWidth = 10;
var paddleY = (canvas.height-paddleHeight)/2;

var p1 = {};
p1.upPressed = false;
p1.downPressed = false;

var p2 = {};
p2.upPressed = false;
p2.downPressed = false;

var x = canvas.width/2;
var y = canvas.height-30;

var ballRadius = 10;

var dx = 2;
var dy = -2;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
    if(e.keyCode == 38){
        p1.upPressed = true;
    }
    else if(e.keyCode == 40){
        p1.downPressed = true;
    }
}

function keyUpHandler(e){
    if(e.keyCode == 38){
        p1.upPressed = false;
    }
    else if(e.keyCode == 40){
        p1.downPressed = false;
    }
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(canvas.width-paddleWidth, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBall(){
    //teikna bolta
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function borderCheck(){
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {dx = -dx;}
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {dy = -dy;}
}
function draw(){
    //hreinsa canvasinn
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    
    x += dx;
    y += dy;
    borderCheck();
}

setInterval(draw, 10);