const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 300;

let score = 0;
let targets = [];
let gameInterval;
let timeInterval;
let gameTime = 30;
let timeLeft = gameTime;

class Target {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = 'blue';
    }

    draw() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    }
}

function addTarget() {
    const size = 15;
    const x = Math.random() * (canvas.width - size * 2) + size;
    const y = Math.random() * (canvas.height - size * 2) + size;
    targets.push(new Target(x, y, size));
}

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    targets.forEach(target => target.draw());
}

function checkHit(x, y) {
    targets = targets.filter(target => {
        const dist = Math.hypot(target.x - x, target.y - y);
        if (dist < target.size) {
            score++;
            document.getElementById('score').textContent = score;
            return false;
        }
        return true;
    });
}

function startGame() {
    score = 0;
    timeLeft = gameTime;
    document.getElementById('score').textContent = score;
    document.getElementById('timeLeft').textContent = timeLeft;
    document.getElementById('gameOver').classList.add('hidden');
    targets = [];
    gameInterval = setInterval(() => {
        addTarget();
        update();
    }, 1000);
    timeInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timeLeft').textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(timeInterval);
    update();
    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOver').classList.remove('hidden');
}

document.getElementById('startBtn').addEventListener('click', startGame);

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    checkHit(x, y);
});