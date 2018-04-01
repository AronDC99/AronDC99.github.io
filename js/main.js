var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var paddleHeight = 75;
var paddleWidth = 10;

var p1 = {};
p1.upPressed = false;
p1.downPressed = false;
p1.score = 0;
p1.paddleY = (canvas.height-paddleHeight)/2;

var p2 = {};
p2.upPressed = false;
p2.downPressed = false;
p2.score = 0;
p2.paddleY = (canvas.height-paddleHeight)/2;


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
    else if(e.keyCode == 87){
        p2.upPressed = true;
    }
    else if(e.keyCode == 83){
        p2.downPressed = true;
    }
}

function keyUpHandler(e){
    if(e.keyCode == 38){
        p1.upPressed = false;
    }
    else if(e.keyCode == 40){
        p1.downPressed = false;
    }
    else if(e.keyCode == 87){
        p2.upPressed = false;
    }
    else if(e.keyCode == 83){
        p2.downPressed = false;
    }
}

function drawPaddleP1(){
    ctx.beginPath();
    ctx.rect(canvas.width-paddleWidth, p1.paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddleP2(){
    ctx.beginPath();
    ctx.rect(0, p2.paddleY, paddleWidth, paddleHeight);
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

function movePaddles(){
    if(p1.downPressed && p1.paddleY < canvas.height-paddleHeight) {
        p1.paddleY += 7;
    }
    else if(p1.upPressed && p1.paddleY > 0) {
        p1.paddleY -= 7;
    }
    
    if(p2.downPressed && p2.paddleY < canvas.height-paddleHeight) {
        p2.paddleY += 7;
    }
    else if(p2.upPressed && p2.paddleY > 0) {
        p2.paddleY -= 7;
    }
}
function borderCheck(){
    console.log("paddle pos", p2.paddleY);
    console.log("ball pos", y);
    if(x + dx > canvas.width-ballRadius) {
        if(y > p2.paddleY && y < p2.paddleY + paddleHeight){
            dx = -dx;
        }else{
            p1.score += 1;
            //console.log("p1 score ", p1.score);
        }
    }
    else if(x + dx < ballRadius){
        if(y < p1.paddleY && y > p1.paddleY + paddleHeight){
            dy = -dy;
        }else{
            p2.score += 1;
            console.log("p2 score ", p2.score);
        }
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {dy = -dy;}
}

function drawScore(){
    ctx.font("24px Comic Sans");
    ctx.fillStyle("#006EA3");
    ctx.fillText("Test", 100, 100);
}

function draw(){
    //hreinsa canvasinn
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddleP1();
    drawPaddleP2();
    //drawScore();
    drawBall();
    movePaddles();
    x += dx;
    y += dy;
    borderCheck();
}

setInterval(draw, 10);