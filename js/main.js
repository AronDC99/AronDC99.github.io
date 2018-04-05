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

var mouse = {};
mouse.x;
mouse.y;

var ballCount = 1;
var randPos = 0;
var x = canvas.width/2;
var y = canvas.height-30;

var ballRadius = 10;
var speedChanged = false;

var dx = 2;
var dy = -2;

var speedX = 2;
var speedY = -2;

var balls = [];
var difficultySet = false;


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function getMousePos(mouseEvent) {
    if(mouseEvent.pageX || mouseEvent.pageY == 0){
        mouse.x = mouseEvent.pageX - this.offsetLeft;
        mouse.y = mouseEvent.pageY - this.offsetTop;
    }else if(mouseEvent.offsetX || mouseEvent.offsetY == 0){
        mouse.x = mouseEvent.offsetX;
        mouse.y = mouseEvent.offsetY;
    }
}
function checkClicks(){
    //check if the mouse x if over the buttons
    if(mouse.x > (canvas.width/2)-75 && mouse.x < ((canvas.width/2)-75)+150){
        //if the y is at the same pos as the center button
        if(mouse.y > (canvas.height/2)-25 && mouse.y < ((canvas.height/2)-25)+50){
            console.log("Clicked center btn");
            setDifficulty(1);
        }
        else if(mouse.y > (canvas.height/2)-125 && mouse.y < ((canvas.height/2)-125)+50){
            console.log("Clicked top btn");
            setDifficulty(0);
        }
        else if(mouse.y > (canvas.height/2)+75 && mouse.y < ((canvas.height/2)+75)+50){
            console.log("Clicked bottom btn");
            setDifficulty(2);
        }
    }
}
function setDifficulty(level){
    if(level == 0){
        speedX = 2;
        speedY = -2;
        makeBalls(ballCount);
        resetBall();
    }
    else if(level == 1){
        speedX = 4;
        speedY = -4;
        makeBalls(ballCount);
        resetBall();
    }else if(level == 2){
        ballCount = 2;
        speedX = 2;
        speedY = -2;
        makeBalls(ballCount);
        resetBall();
    }
    difficultySet = true;
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
    for(let i = 0; i < ballCount; i++){
        ctx.beginPath()
        ctx.arc(balls[i].x, balls[i].y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    
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
    for(let i = 0; i < ballCount; i++){
        randPos = Math.floor(Math.random() * 500);
        balls[i].x = canvas.width/2;
        balls[i].y = canvas.height-randPos;
    }
}
function borderCheck(){
    for(let i = 0; i < ballCount; i++){
        if(balls[i].x + balls[i].dx > canvas.width-ballRadius) {
            if(balls[i].y >= p1.paddleY && balls[i].y <= p1.paddleY+paddleHeight){
                balls[i].dx = -balls[i].dx;
            }else if(balls[i].y < p1.paddleY || balls[i].y > p1.paddleY+paddleHeight){
                p2.score += 1;
                resetBall();
            }
        }
        else if(balls[i].x + balls[i].dx < ballRadius){
            if(balls[i].y >= p2.paddleY && balls[i].y <= p2.paddleY+paddleHeight){
                balls[i].dx = -balls[i].dx;
            }else if(balls[i].y < p2.paddleY || balls[i].y > p2.paddleY+paddleHeight){
                p1.score += 1;
                resetBall();
            }
        }
        if(balls[i].y + balls[i].dy > canvas.height-ballRadius || balls[i].y + balls[i].dy < ballRadius) {balls[i].dy = -balls[i].dy;}
    }
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(" P1 Score: "+p1.score, 8, 20);
    ctx.fillText(" P2 Score: "+p2.score, 700, 20);
}
function checkWin(){
    if(p1.score == 5 && speedChanged == false){
        for(let i = 0; i < ballCount; i++){
            balls[i].dx *= 2;
            balls[i].dy *= 2;
        }
        speedChanged = true;
    }else if(p2.score == 5 && speedChanged == false){
        for(let i = 0; i < ballCount; i++){
            balls[i].dx *= 2;
            balls[i].dy *= 2;
        }
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
function makeBalls(){
    for(let i = 0; i < ballCount; i++){
        balls.push({
            x: canvas.width/2,
            y: canvas.height-30,
            dx: speedX,
            dy: speedY
        })
    }
}
function moveBalls(){
    for(let i = 0; i < ballCount; i++){
        balls[i].x += balls[i].dx;
        balls[i].y += balls[i].dy;
    }
}
function makeMenu(){
    drawButtons();
    drawTextOnButtons();
    drawMenuTitle();
    canvas.addEventListener("mousemove", getMousePos);
    canvas.addEventListener("mouseup", checkClicks);
}
function draw(){
    //hreinsa canvasinn
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(!difficultySet){
        makeMenu();
    }else{
        checkWin();
        drawPaddleP1();
        drawPaddleP2();
        drawScore();
        drawBall();
        movePaddles();
        moveBalls();
        borderCheck();
    }
}

setInterval(draw, 10);