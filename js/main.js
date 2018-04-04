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

var randPos = 0;
var x = canvas.width/2;
var y = canvas.height-30;

var ballRadius = 10;
var speedChanged = false;

var dx = 2;
var dy = -2;

var mouse = {};
mouse.x;
mouse.y;

canvas.addEventListener("mousemove", getMousePos);



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function getMousePos(MouseEvent) {
    mouse.x = mouseEvent.pageX - this.offsetLeft;
    mouse.y = mouseEvent.pageY - this.offsetTop;
}
function detectLeftMouse(event){
    var buttonsArray = [false, false, false, false, false, false, false, false, false];
    var mousePressed = false;

    document.onmousedown = function(e) {
        buttonsArray[e.button] = true;
        mousePressed = true;
        checkForClicks();
    };

    document.onmouseup = function(e) {
        buttonsArray[e.button] = false;
        mousePressed = false;
    };

    document.oncontextmenu = function() {
        return false;
    }
    return mousePressed;
}
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
function resetBall(){
    randPos = Math.floor(Math.random() * 500);
    x = canvas.width/2;
    y = canvas.height-randPos;
}
function borderCheck(){
    if(x + dx > canvas.width-ballRadius) {
        if(y >= p1.paddleY && y <= p1.paddleY+paddleHeight){
            dx = -dx;
        }else if(y < p1.paddleY || y > p1.paddleY+paddleHeight){
            p2.score += 1;
            resetBall();
        }
    }
    else if(x + dx < ballRadius){
        if(y >= p2.paddleY && y <= p2.paddleY+paddleHeight){
            dx = -dx;
        }else if(y < p2.paddleY || y > p2.paddleY+paddleHeight){
            p1.score += 1;
            resetBall();
        }
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {dy = -dy;}
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(" P1 Score: "+p1.score, 8, 20);
    ctx.fillText(" P2 Score: "+p2.score, 700, 20);
}
function checkWin(){
    if(p1.score == 5 || p2.score == 5 && speedChanged == false){
        dx *= 2;
        dy *= 2;
        speedChanged = true;
    }
    else if(p1.score >= 10){
        alert("Player 1 Wins YAY!!!");
        document.location.reload();
    }
    else if(p2.score >= 10){
        alert("Player 2 Wins YAY!!!");
        document.location.reload();
    }
}
function drawButtons(){
    //center button
    ctx.beginPath();
    ctx.rect((canvas.width/2)-75, (canvas.height/2)-25, 150, 50);
    ctx.fillStyle = "#C9C9C9";
    ctx.fill();
    ctx.closePath();
    //bottom button
    ctx.beginPath();
    ctx.rect((canvas.width/2)-75, (canvas.height/2)+75, 150, 50);
    ctx.fillStyle = "#C9C9C9";
    ctx.fill();
    ctx.closePath();
    //top button
    ctx.beginPath();
    ctx.rect((canvas.width/2)-75, (canvas.height/2)-125, 150, 50);
    ctx.fillStyle = "#C9C9C9";
    ctx.fill();
    ctx.closePath();
}
function drawTextOnButtons(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Easy", (canvas.width/2)-15, (canvas.height/2)-95);
    ctx.fillText("Medium", (canvas.width/2)-25, (canvas.height/2)+5);
    ctx.fillText("Hard", (canvas.width/2)-15, (canvas.height/2)+105);
}
function drawMenuTitle(){
    ctx.font = "60px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("CHOSE A GAME MODE", 65, 110);
}
function makeMenu(){
    drawButtons();
    drawTextOnButtons();
    drawMenuTitle();
}
function draw(){
    //hreinsa canvasinn
    //checkWin();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //drawPaddleP1();
    //drawPaddleP2();
    //drawScore();
    //drawBall();
    //movePaddles();
    //x += dx;
    //y += dy;
    //borderCheck();
    makeMenu();
    checkForClicks();
    detectLeftMouse();
}

setInterval(draw, 10);