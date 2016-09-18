function Paddle(xPos, yPos, width, height, speed, context) {
    this.xPosition = xPos;
    this.yPosition = yPos;
    this.initalPosition = yPos;
    this.width = width;
    this.height = height;
    this.context = context;
    this.speed = speed;
}

Paddle.prototype.render = function () {
    this.context.beginPath();
    this.context.rect(this.xPosition, this.yPosition, this.width, this.height);
    this.context.fill();
};

Paddle.prototype.move = function (direction) {
    if (direction === "up") {
        this.yPosition -= this.speed;
        if (this.yPosition < 0) {
            this.yPosition = 0;
        }
    } else if (direction === "down") {
        this.yPosition += this.speed;
        if (this.yPosition >= (this.context.canvas.height - this.height)) {
            this.yPosition = this.context.canvas.height - this.height;
        }
    }
};

Paddle.prototype.hitDetected = function (ballX, ballY, screenSide) {
    var top = this.yPosition;
    var bottom = this.yPosition + this.height;
    if(ballY >= top && ballY <= bottom){
        if(screenSide === 'r'){
            if(ballX >= this.leadingEdge && ballX <= this.backEdge){
                return true;
            } else {
                return false;
            }
        } else {
            if(ballX <= this.leadingEdge && ballX >= this.backEdge){
                return true;
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
};

Paddle.prototype.reset = function () {
    this.yPosition = this.initalPosition;
};

function Player(context) {
    this.paddle = new Paddle(782, 237.5, 8, 75, 7.5, context);
    this.paddle.leadingEdge = this.paddle.xPosition
    this.paddle.backEdge = this.paddle.xPosition + this.paddle.width;
    this.score = 0;
}

Player.prototype.render = function () {
    this.paddle.render();
};

Player.prototype.move = function (input) {
    if(input[38]){
        this.paddle.move("up");
    }
    if(input[40]){
        this.paddle.move("down");
    }
};

Player.prototype.hitDetected = function (ballX, ballY) {
    return this.paddle.hitDetected(ballX, ballY, "r");
};

Player.prototype.reset = function () {
    this.paddle.reset();
};

function Computer(context) {
    this.paddle = new Paddle(10, 237.5, 8, 75, 10, context);
    this.paddle.leadingEdge = this.paddle.xPosition + this.paddle.width;
    this.paddle.backEdge = this.paddle.xPosition;
    this.score = 0;
}

Computer.prototype.render = function () {
    this.paddle.render();
};

Computer.prototype.move = function(ballY) {
    var center = this.paddle.yPosition + (this.paddle.height / 2);
    var distanceToMove = ballY - center;
    var amISupid = Math.random() > .7;
    if (amISupid){
        distanceToMove = distanceToMove * ((Math.random() * 2) - 1);
    }
    if (distanceToMove > 0){
        if (distanceToMove > this.paddle.speed){
            this.paddle.move("down");
        } else {
            this.paddle.yPosition += distanceToMove;
        }
    } else if (distanceToMove < 0){
        if (distanceToMove < this.paddle.speed) {
            this.paddle.move("up");
        } else{
            this.paddle.yPosition -= distanceToMove;
        }
    }
    if (this.paddle.yPosition >= (this.paddle.context.canvas.height - this.height)){
        this.paddle.yPosition = this.context.canvas.height - this.height;
    } else if (this.paddle.yPosition < 0) {
        this.paddle.yPosition = 0;
    }
};

Computer.prototype.hitDetected = function (ballX, ballY) {
    return this.paddle.hitDetected(ballX, ballY, "l");
};

Computer.prototype.reset = function () {
    this.paddle.reset();
}

function Ball(initialXPos, initialYPos, radius, context) {
    this.xPosition = initialXPos;
    this.yPosition = initialYPos;
    this.initialX = initialXPos;
    this.initialY = initialYPos;
    this.radius = radius;
    this.context = context;
}

Ball.prototype.render = function () {
    this.context.beginPath();
    this.context.arc(this.xPosition, this.yPosition, this.radius, 0, 2 * Math.PI, false);
    this.context.fill();
};

Ball.prototype.updatePosition = function () {
    var updatedX = this.xPosition + this.xSpeed;
    var updatedY = this.yPosition + this.ySpeed;

    if(updatedY > this.context.canvas.height - this.radius || updatedY < this.radius) {
        this.ySpeed = -(this.ySpeed);
        updatedY += this.ySpeed;
    }
    
    if(player.hitDetected(updatedX, updatedY) || computer.hitDetected(updatedX, updatedY)) {
        this.xSpeed = -(this.xSpeed);
        updatedX += this.xSpeed;
    }
    
    this.xPosition = updatedX;
    this.yPosition = updatedY;
    
    if(this.xPosition > player.paddle.xPosition + player.paddle.width) {
        player.score++;
        serve();

    } else if(this.xPosition < computer.paddle.xPosition - computer.paddle.width){
        computer.score++;
        serve();
    }
};

Ball.prototype.serve = function () {
    this.xPosition = this.initialX;
    this.yPosition = this.initialY;
    this.xSpeed = (Math.random()* 22 ) - 11.5;
    this.ySpeed = (Math.random()* 22 ) - 11.5;
    if(this.xSpeed >= 0 && this.xSpeed < 7 ){
        this.xSpeed = 7;
    } else if(this.xSpeed < 0 && this.xSpeed > -7){
        this.xSpeed = -7;
    }
    if(this.ySpeed >= 0 && this.ySpeed < 7) {
        this.ySpeed = 7;
    } else if(this.ySpeed < 0 && this.xSpeed > -7) {
        this.ySpeed = -7;
    }
};

var canvas = document.getElementById("pongTable");
var context = canvas.getContext('2d');
var player = new Player(context);
var computer = new Computer(context);
var ball = new Ball(400, 275, 5, context);
var playerInput = {};
context.fillStyle = 'green';

var animate = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (step) { window.setTimeout(step, 1000 / 60); };

function serve() {
    ball.serve();
    computer.reset();
    player.reset();
}

function render() {
    player.render();
    computer.render();
    ball.render();
}

function step() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.move(playerInput);
    computer.move(ball.yPosition);
    ball.updatePosition();
    render();
    animate(step);
}

window.onload = function () {
    window.addEventListener('keyup', function (event) {
        playerInput[event.keyCode] = false;
    });
    window.addEventListener('keydown', function (event) {
        if (event.keyCode === 38 && playerInput[40]) {
            playerInput[40] = false;
        } else if(event.keyCode === 40 && playerInput[38]){
            playerInput[38] = false;
        }
        playerInput[event.keyCode] = true;
    });
    serve();
    animate(step);
};