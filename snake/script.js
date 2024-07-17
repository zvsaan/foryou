const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [{ x: 9 * box, y: 10 * box }];
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};
let direction;
let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.key == 'a' && direction != "RIGHT") {
        direction = "LEFT";
    } else if (event.key == 'w' && direction != "DOWN") {
        direction = "UP";
    } else if (event.key == 'd' && direction != "LEFT") {
        direction = "RIGHT";
    } else if (event.key == 's' && direction != "UP") {
        direction = "DOWN";
    }
}

document.getElementById("left").addEventListener("click", () => {
    if (direction != "RIGHT") direction = "LEFT";
});

document.getElementById("up").addEventListener("click", () => {
    if (direction != "DOWN") direction = "UP";
});

document.getElementById("right").addEventListener("click", () => {
    if (direction != "LEFT") direction = "RIGHT";
});

document.getElementById("down").addEventListener("click", () => {
    if (direction != "UP") direction = "DOWN";
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "lime" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "LEFT") snakeX -= box;
    if (direction == "UP") snakeY -= box;
    if (direction == "RIGHT") snakeX += box;
    if (direction == "DOWN") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (
        snakeX < 0 || snakeX >= canvasSize || snakeY < 0 || snakeY >= canvasSize ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        alert("Game Over");
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Arial";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

let game = setInterval(draw, 120);