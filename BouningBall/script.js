const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let score = 0;
let isGameOver = false;

let GameBoard = {};

let Ball = function(width,height){
    this.width = width;
    this.height = height;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2; 
    this.velocityX = 2; 
    this.velocityY = 2;       

    this.drawBall = function(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.moveBall = function(){
        this.x += this.velocityX;
        this.y -= this.velocityY;
        if((this.x + this.width > canvas.width) || this.x < 0){
            this.velocityX = -this.velocityX;
        }
        if(this.y + this.height > canvas.height || this.y < 0){
            this.velocityY = -this.velocityY;
        }
    }
};

let Bar = function(width,height,position){
    this.width = width;
    this.height = height;
    this.position = position;

    this.drawBar = function(){
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.position, canvas.height - this.height, this.width, this.height);
    }

    this.moveBar = function(){
        if(this.position < this.width/2){
            this.position = 0;
        }
        if(this.position > canvas.width - this.width){
            this.position = canvas.width - this.width;
        }
    }

    this.checkCollision = function(ball){
        if(ball.y + ball.height > canvas.height - this.height && ball.x + ball.width > this.position && ball.x < this.position + this.width){
            ball.y = canvas.height - this.height - ball.height;
            ball.velocityY = -ball.velocityY;
            ball.moveBall();
            score++;
        }
        else if(ball.y + ball.height>=canvas.height){
            isGameOver = true;
            document.getElementById("restartGame").style.display = "block";
            alert("Game Over! your score is: " + score);
            return;
        }
    }

    this.updatePosition = function(key){
        if(key === 'ArrowLeft'){
            if(this.position - this.width/2 +50 >= 0){
                this.position -= 10;
            }
        }
        if(key === 'ArrowRight'){
            if(this.position + this.width/2 +50 <= canvas.width){
                this.position += 10;
            }
        }
    }

};


let ball = new Ball(20, 20);
let bar = new Bar(100, 20, canvas.width / 2 - 50 );

let draw = function(){
    if(isGameOver) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.drawBall();
    bar.drawBar();
    ball.moveBall();
    bar.checkCollision(ball);

    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText("Điểm: " + score, 10, 20);

    requestAnimationFrame(draw);
};

document.getElementById("restartGame").addEventListener('click', function(){
    score = 0;
    isGameOver = false;
    ball = new Ball(20, 20);
    bar = new Bar(100, 20, canvas.width / 2 - 50);
    document.getElementById("restartGame").style.display = 'none';
    draw();
});

document.addEventListener('keydown', function(event){
    bar.updatePosition(event.key);
});

draw();




