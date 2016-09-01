var paddleMiddleHeight  =  (gameBoard.height / 2) - 8;
var ballMiddleHeight = gameBoard.height / 2;
var ballMiddleWidth = gameBoard.width / 2;

function Paddle(x, y, height, width, context){
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.context = context;
}

Paddle.prototype.render = function(){
    this.context.beginPath();
    this.context.rect(this.x, this.y, this.height, this.width);
    this.context.fillStyle = 'green';
    this.context.fill();
}

function Player(context){
    this.paddle = new Paddle(10, paddleMiddleHeight, 15, 5, context);
}


Player.prototype.render = function(context){
    this.paddle.render();
};


function Computer(context){
    this.paddle = new Paddle(290, paddleMiddleHeight, 16, 5, context);
}

Computer.prototype.render = function(context){
    this.paddle.render();
};

window.onload = function(){
    var gameBoard = document.getElementById('game-screen');
    var gameBoard_context = gameBoard.getContext("2d");
    
    var player = new Player(gameBoard_context);
    var computer = new Computer(gameBoard_context);
};