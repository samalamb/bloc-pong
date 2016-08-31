window.onload = function(){
    var gameBoard = document.getElementById('game-screen');
    var gameBoard_context = gameBoard.getContext("2d");
    var paddleMiddleHeight  =  (gameBoard.height / 2) - 8;
    var ballMiddleHeight = gameBoard.height / 2;
    var ballMiddleWidth = gameBoard.width / 2;
    
    function Paddle(x, y, height, width){
        gameBoard_context.fillStyle = 'green';
        gameBoard_context.fillRect(x, y, width, height);
    }
    
    function Ball(x, y, sideLength){
        gameBoard_context.fillStyle = 'green';
        gameBoard_context.fillRect(x, y, sideLength, sideLength);
    }
    
    var player = new Paddle(5, paddleMiddleHeight, 15, 5);    
    var computer = new Paddle(290, paddleMiddleHeight, 16, 5);
    var ball = new Ball(ballMiddleWidth, ballMiddleHeight, 3);
};