/*--------------------------------- Cookie Clicker ---------------------------------*/
let cookie = document.getElementById("cookie");
let counter = document.getElementById("counter");
let upgradeBtn = document.getElementById("upgrade");
let autoClickerBtn = document.getElementById("autoClicker");

let cookies = 0;
let clickPower = 1;
let autoClicking = false;
let autoClickInterval;

cookie.addEventListener("click", () => {
	cookies += clickPower;
	counter.innerText = cookies;
});

upgradeBtn.addEventListener("click", () => {
	if (cookies >= 10) {
		cookies -= 10;
		clickPower += 1;
		counter.innerText = cookies;
	}
});

autoClickerBtn.addEventListener("click", () => {
	if (cookies >= 50 && !autoClicking) {
		cookies -= 50;
		autoClicking = true;
		counter.innerText = cookies;
		autoClickInterval = setInterval(() => {
			cookies += clickPower;
			counter.innerText = cookies;
		}, 1000);
	}
});

/*--------------------------------- Hangman ---------------------------------*/
const wordList = ["javascript", "hangman", "computer", "programming", "interface"];
let chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
let display = Array(chosenWord.length).fill("_");
let guessedLetters = [];
let attemptsLeft = 6;

document.getElementById("wordDisplay").innerText = display.join(" ");
document.getElementById("attempts").innerText = `Attempts left: ${attemptsLeft}`;

function guessLetter() {
	let input = document.getElementById("letterInput").value.toLowerCase();
	if (!input || input.length !== 1 || guessedLetters.includes(input)) return;

	guessedLetters.push(input);
	if (chosenWord.includes(input)) {
		for (let i = 0; i < chosenWord.length; i++) {
			if (chosenWord[i] === input) display[i] = input;
		}
	} else {
		attemptsLeft--;
	}

	document.getElementById("wordDisplay").innerText = display.join(" ");
	document.getElementById("attempts").innerText = `Attempts left: ${attemptsLeft}`;
	if (!display.includes("_")) {
		alert("You win!");
	} else if (attemptsLeft <= 0) {
		alert(`Game over! The word was: ${chosenWord}`);
	}
}

/*--------------------------------- Pong ---------------------------------*/
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10;
const paddleHeight = 100;
let playerY = canvas.height / 2 - paddleHeight / 2;
let aiY = canvas.height / 2 - paddleHeight / 2;

const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 3;

function drawRect(x, y, w, h, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2);
	ctx.closePath();
	ctx.fill();
}

function drawNet() {
	for (let i = 0; i < canvas.height; i += 15) {
		drawRect(canvas.width / 2 - 1, i, 2, 10, "white");
	}
}

function render() {
	drawRect(0, 0, canvas.width, canvas.height, "black");
	drawNet();
	drawRect(0, playerY, paddleWidth, paddleHeight, "white");
	drawRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight, "white");
	drawCircle(ballX, ballY, ballSize, "white");
}

function update() {
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if (ballY + ballSize > canvas.height || ballY - ballSize < 0) ballSpeedY = -ballSpeedY;

	if (
		ballX - ballSize < paddleWidth &&
		ballY > playerY &&
		ballY < playerY + paddleHeight
	) {
		ballSpeedX = -ballSpeedX;
	}

	if (
		ballX + ballSize > canvas.width - paddleWidth &&
		ballY > aiY &&
		ballY < aiY + paddleHeight
	) {
		ballSpeedX = -ballSpeedX;
	}

	if (ballX < 0 || ballX > canvas.width) {
		ballX = canvas.width / 2;
		ballY = canvas.height / 2;
		ballSpeedX = -ballSpeedX;
	}

	let aiCenter = aiY + paddleHeight / 2;
	if (aiCenter < ballY - 35) aiY += 4;
	else if (aiCenter > ballY + 35) aiY -= 4;
}

document.addEventListener("mousemove", (e) => {
	playerY = e.clientY - canvas.getBoundingClientRect().top - paddleHeight / 2;
});

function gameLoop() {
	update();
	render();
	requestAnimationFrame(gameLoop);
}

gameLoop();
