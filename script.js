"use script";
let canvas = document.querySelector("#snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let direction = "right";
let jogo = setInterval(iniciarJogo, 100);
let comida = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

function criarBG() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
  for (let index = 0; index < snake.length; index++) {
    context.fillStyle = "green";
    context.fillRect(snake[index].x, snake[index].y, box, box);
  }
}

function comerComida() {
  context.fillStyle = "red";
  context.fillRect(comida.x, comida.y, box, box);
}

function iniciarJogo() {
  if (snake[0].x > 15 * box && direction == "right") {
    snake[0].x = 0;
  }
  if (snake[0].x < 0 && direction == "left") {
    snake[0].x = 16 * box;
  }
  if (snake[0].y > 15 * box && direction == "down") {
    snake[0].y = 0;
  }
  if (snake[0].y < 0 && direction == "up") {
    snake[0].y = 16 * box;
  }

  for (let index = 1; index < snake.length; index++) {
    if (snake[0].x == snake[index].x && snake[0].y == snake[index].y) {
      clearInterval(jogo);
      alert("Game Over: :[");

      snake = [];
      snake[0] = {
        x: 8 * box,
        y: 8 * box,
      };
      jogo = setInterval(iniciarJogo, 100);
    }
  }

  criarBG();
  criarCobrinha();
  comerComida();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  switch (direction) {
    case "right":
      snakeX += box;
      break;
    case "left":
      snakeX -= box;
      break;
    case "up":
      snakeY -= box;
      break;
    case "down":
      snakeY += box;
      break;
  }

  if (snakeX != comida.x || snakeY != comida.y) {
    snake.pop();
  } else {
    comida = {
      x: Math.floor(Math.random() * 15 + 1) * box,
      y: Math.floor(Math.random() * 15 + 1) * box,
    };
  }

  snake.unshift({ x: snakeX, y: snakeY });
}

function update(ev) {
  switch (ev.keyCode) {
    case 37:
      if (direction != "right") direction = "left";
      break;
    case 38:
      if (direction != "down") direction = "up";
      break;
    case 39:
      if (direction != "left") direction = "right";
      break;
    case 40:
      if (direction != "up") direction = "down";
      break;
  }
}

document.addEventListener("keydown", update);
