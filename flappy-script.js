const bird = document.getElementById('bird');
const gameContainer = document.getElementById('game-container');

let birdTop = 60;
let gravity = 2;
let isGameOver = false;
let isPaused = false;

document.addEventListener('keydown', flap);
document.addEventListener('click', flap);

let score = 0;
const scoreDisplay = document.getElementById('score');

function flap(e) {
  if (e.code === 'Space' || e.type === 'click') {
    birdTop -= 40;
  }
}

function createPipe() {
  const pipeTop = document.createElement('div');
  const pipeBottom = document.createElement('div');
  const gap = 200;
  const pipeHeight = Math.floor(Math.random() * 200) + 50;

  pipeTop.classList.add('pipe', 'top');
  pipeBottom.classList.add('pipe', 'bottom');

  let pipeX = window.innerWidth;
  let hasScored = false;

    pipeTop.style.height = pipeHeight + 'px';
    pipeTop.style.left = pipeX + 'px';

    const bottomPipeHeight = window.innerHeight - pipeHeight - gap;
    pipeBottom.style.height = bottomPipeHeight + 'px';
    pipeBottom.style.left = pipeX + 'px';

    // 🎨 Generate a random color
  const color = getRandomColor();
  pipeTop.style.backgroundColor = color;
  pipeBottom.style.backgroundColor = color;

  gameContainer.appendChild(pipeTop);
  gameContainer.appendChild(pipeBottom);

  
  const movePipe = setInterval(() => {
    if (isGameOver) {
      clearInterval(movePipe);
      pipeTop.remove();
      pipeBottom.remove();
    }

    pipeX -= 2;
    pipeTop.style.left = pipeX + 'px';
    pipeBottom.style.left = pipeX + 'px';

    const birdX = 150;       // Matches left: 150px
    const birdWidth = 60;
    const birdHeight = 60;

    const pipeWidth = 100;

    const pipeRightEdge = pipeX + pipeWidth;
    const birdRightEdge = birdX + birdWidth;

  if (pipeRightEdge > birdX && pipeX < birdRightEdge) {
    const birdBottom = birdTop + birdHeight;
    if (birdTop < pipeHeight || birdBottom > pipeHeight + gap) {
      gameOver();
    }
  }

  // ✅ Score update: only if bird has passed the pipe
    if (!hasScored && pipeX + pipeWidth < birdX) {
      score++;
      hasScored = true;
      scoreDisplay.textContent = score;
    }
}, 20);
}

function gameOver() {
  alert('Game Over');
  isGameOver = true;
  window.location.reload();
}

function getRandomColor() {
  const colors = ['#4CAF50', '#FF5722', '#3F51B5', '#FFC107', '#009688', '#E91E63'];
  return colors[Math.floor(Math.random() * colors.length)];
}

setInterval(() => {
  if (!isGameOver && !isPaused) {
    birdTop += gravity;
    bird.style.top = birdTop + 'px';

    if (birdTop > window.innerHeight || birdTop < 0) {
      gameOver();
    }
  }
}, 20);

setInterval(() => {
  if (!isGameOver) createPipe();
}, 3000);

createPipe();

const menuButton = document.getElementById('menu-button');

menuButton.addEventListener('click', () => {
  window.location.href = 'index.html'; // or your actual main menu file
});