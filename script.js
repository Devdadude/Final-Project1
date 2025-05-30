// COOKIE CLICKER
let cookieCount = 0;
let autoClickerCount = 0;
const autoClickerCost = 10;

const cookieBtn = document.getElementById("cookieBtn");
const cookieCountSpan = document.getElementById("cookieCount");
const buyAutoClickerBtn = document.getElementById("buyAutoClickerBtn");
const autoClickerCountSpan = document.getElementById("autoClickerCount");

// Clicking cookie manually
cookieBtn.addEventListener("click", () => {
  cookieCount++;
  updateCookieDisplay();
  updateAutoClickerButton();
});

// Buy auto clicker if enough cookies
buyAutoClickerBtn.addEventListener("click", () => {
  if (cookieCount >= autoClickerCost) {
    cookieCount -= autoClickerCost;
    autoClickerCount++;
    updateCookieDisplay();
    updateAutoClickerButton();
    updateAutoClickerCount();
  }
});

function updateCookieDisplay() {
  cookieCountSpan.textContent = cookieCount;
}

function updateAutoClickerCount() {
  autoClickerCountSpan.textContent = autoClickerCount;
}

function updateAutoClickerButton() {
  if (cookieCount < autoClickerCost) {
    buyAutoClickerBtn.disabled = true;
    buyAutoClickerBtn.style.opacity = 0.5;
    buyAutoClickerBtn.style.cursor = "not-allowed";
  } else {
    buyAutoClickerBtn.disabled = false;
    buyAutoClickerBtn.style.opacity = 1;
    buyAutoClickerBtn.style.cursor = "pointer";
  }
}

// Auto clicker generates cookies every second
setInterval(() => {
  cookieCount += autoClickerCount;
  updateCookieDisplay();
  updateAutoClickerButton();
  updateAutoClickerCount();
}, 1000);

// Initialize display states on page load
updateCookieDisplay();
updateAutoClickerCount();
updateAutoClickerButton();

// PONG GAME
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10, paddleHeight = 100, ballSize = 10;

let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;

let ballX = canvas.width / 2 - ballSize / 2;
let ballY = canvas.height / 2 - ballSize / 2;

let ballSpeedX = 4;
let ballSpeedY = 4;

let leftPaddleSpeed = 0;
let rightPaddleSpeed = 0;

const paddleSpeed = 7;

// Controls
const keys = {};
window.addEventListener("keydown", e => {
  keys[e.key] = true;
});
window.addEventListener("keyup", e => {
  keys[e.key] = false;
});

function movePaddles() {
  // Left paddle (W/S)
  if (keys["w"] && leftPaddleY > 0) leftPaddleY -= paddleSpeed;
  if (keys["s"] && leftPaddleY + paddleHeight < canvas.height) leftPaddleY += paddleSpeed;

  // Right paddle (Arrow Up/Down)
  if (keys["ArrowUp"] && rightPaddleY > 0) rightPaddleY -= paddleSpeed;
  if (keys["ArrowDown"] && rightPaddleY + paddleHeight < canvas.height) rightPaddleY += paddleSpeed;
}

function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Top and bottom collision
  if (ballY <= 0 || ballY + ballSize >= canvas.height) ballSpeedY = -ballSpeedY;

  // Left paddle collision
  if (
    ballX <= paddleWidth &&
    ballY + ballSize >= leftPaddleY &&
    ballY <= leftPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Right paddle collision
  if (
    ballX + ballSize >= canvas.width - paddleWidth &&
    ballY + ballSize >= rightPaddleY &&
    ballY <= rightPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Reset ball if it goes out of bounds
  if (ballX < 0 || ballX > canvas.width) {
    ballX = canvas.width / 2 - ballSize / 2;
    ballY = canvas.height / 2 - ballSize / 2;
    ballSpeedX = -ballSpeedX;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw paddles
  ctx.fillStyle = "#d72631";
  ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

  // Draw ball
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(ballX, ballY, ballSize, ballSize);
}

function gameLoop() {
  movePaddles();
  moveBall();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();

// HANGMAN
const words = ["JAVASCRIPT", "COMPUTER", "PROGRAM", "CODING", "WEBSITE"];
let chosenWord = "";
let guessedLetters = [];
let wrongGuesses = [];
let maxAttempts = 6;

const wordDisplay = document.getElementById("wordDisplay");
const letterInput = document.getElementById("letterInput");
const guessBtn = document.getElementById("guessBtn");
const wrongGuessesSpan = document.getElementById("wrongGuesses");
const attemptsLeftSpan = document.getElementById("attemptsLeft");

function initHangman() {
  chosenWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  wrongGuesses = [];
  maxAttempts = 6;
  updateWordDisplay();
  wrongGuessesSpan.textContent = "";
  attemptsLeftSpan.textContent = maxAttempts;
  letterInput.value = "";
}

function updateWordDisplay() {
  let display = "";
  for (let letter of chosenWord) {
    display += guessedLetters.includes(letter) ? letter + " " : "_ ";
  }
  wordDisplay.textContent = display.trim();
}

guessBtn.addEventListener("click", () => {
  const guess = letterInput.value.toUpperCase();
  if (!guess || guessedLetters.includes(guess) || wrongGuesses.includes(guess)) {
    letterInput.value = "";
    return;
  }

  if (chosenWord.includes(guess)) {
    guessedLetters.push(guess);
  } else {
    wrongGuesses.push(guess);
    maxAttempts--;
    attemptsLeftSpan.textContent = maxAttempts;
    wrongGuessesSpan.textContent = wrongGuesses.join(", ");
  }
  letterInput.value = "";
  updateWordDisplay();

  // Check for win
  if (chosenWord.split("").every(l => guessedLetters.includes(l))) {
    alert("You Win! The word was: " + chosenWord);
    initHangman();
  }

  // Check for lose
  if (maxAttempts <= 0) {
    alert("Game Over! The word was: " + chosenWord);
    initHangman();
  }
});

initHangman();
