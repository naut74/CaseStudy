const canvas = document.getElementById('snake');
const ctx= canvas.getContext('2d');

const box = 20;
let direction = "right";
let snake = [{x:box*5, y:box *5}];
let food = {x: Math.floor(Math.random() * (canvas.width / box)) * box, y: Math.floor(Math.random() * (canvas.height / box)) * box };

document.addEventListener('keydown', (event) => {
    if (event.key === "ArrowUp" && direction!== "down") {
        direction = "up";
    } else if (event.key === "ArrowDown" && direction!== "up") {
        direction = "down";
    } else if (event.key === "ArrowLeft" && direction!== "right") {
        direction = "left";   
    } else if (event.key === "ArrowRight" && direction!== "left") {
        direction = "right";
    }
});

function drawSnake(){
    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i === 0)? "green" : "lightgreen";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "darkgreen";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
}

function updateGame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction === "right") snakeX += box;
    if(direction === "left") snakeX -= box;
    if(direction === "up") snakeY -= box;
    if(direction === "down") snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        food = { 
            x: Math.floor(Math.random() * (canvas.width / box)) * box, 
            y: Math.floor(Math.random() * (canvas.height / box)) * box 
        }; 
    } else {
        snake.pop(); 
    }
    
    const snakeHead = {x: snakeX, y: snakeY};
    
    if(snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(snakeHead, snake)){
        clearInterval(game);
        alert("Game Over");
    }
    
    snake.unshift(snakeHead);
}

function collision(head, array){
    for(let i = 1; i < array.length; i++){
        if(head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

const game = setInterval(updateGame, 100);
