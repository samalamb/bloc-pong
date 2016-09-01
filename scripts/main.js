var gameBoard = document.getElementById('game-screen');
var gameBoard_context = gameBoard.getContext("2d");

var Paddle = function(x, y, height, width){
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
};

Paddle.prototype.render = function(context){
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = "green";
    context.fill();
};

Paddle.prototype.move = function(key){
    if(key === 38){
        this.y -= 5;
        if(this.y <= 0){
            this.y = 0;
        }
    }
    else if(key === 40){
        this.y += 5;
        if(this.y >= (gameBoard.height - this.height)){
            this.y = gameBoard.height - this.height;
        }
    }
};

var Player = function(){
    this.paddle = new Paddle(5, 65, 15, 5);
};


Player.prototype.render = function(context){
    this.paddle.render(context);
};


var Computer = function(context){
    this.paddle = new Paddle(290, 65, 16, 5);
};

Computer.prototype.render = function(context){
    this.paddle.render(context);
};

var Ball = function(){
    this.ball = new Paddle(140, 70, 3, 4);
};

Ball.prototype.render = function(context){
    this.ball.render(context);
};

var render = function(context){
    player.render(context);
    computer.render(context);
    ball.render(context);
};

var step = function(){
    gameBoard_context.canvas.width = gameBoard_context.canvas.width;
    render(gameBoard_context);
    animate(step);
};

var animate = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(step) { window.setTimeout(callback, 1000/60) };



var player = new Player();
var computer = new Computer();
var ball = new Ball();

//google hotkey to select next match - spend 20 minutes on hotkeys in brackets
window.onload = function(){
    window.addEventListener("keydown", function(event){
        player.paddle.move(event.keyCode);
    });
    animate(step);
};