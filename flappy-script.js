const bird = document.getElementById('bird');
const gameContainer = document.getElementById('game-container');

let birdTop = 200;
let gravity = 2;
let isGameOver = false;

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
  const gap = 150;
  const pipeHeight = Math.floor(Math.random() * 200) + 50;

  pipeTop.classList.add('pipe', 'top');
  pipeBottom.classList.add('pipe', 'bottom');

  let pipeX = window.innerWidth;
  let hasScored = false;

  pipeTop.style.height = pipeHeight + 'px';
  pipeTop.style.left = pipeX + 'px';

  pipeBottom.style.height = pipeHeight + 'px';
  pipeBottom.style.left = pipeX + 'px';

  gameContainer.appendChild(pipeTop);
  gameContainer.appendChild(pipeBottom);

  const movePipe = setInterval(() => {
    if (isGameOver) {
      clearInterval(movePipe);
      pipeTop.remove();
      pipeBottom.remove();
      return;
    }

    pipeX -= 2;
    pipeTop.style.left = pipeX + 'px';
    pipeBottom.style.left = pipeX + 'px';

    const birdX = 150;
    const birdWidth = 60;
    const birdHeight = 60;
    const pipeWidth = 100;

    const pipeRightEdge = pipeX + pipeWidth;
    const birdRightEdge = birdX + birdWidth;
    const birdBottom = birdTop + birdHeight;

    if (pipeRightEdge > birdX && pipeX < birdRightEdge) {
      if (birdTop < pipeHeight || birdBottom > pipeHeight + gap) {
        gameOver();
      }
    }

    // ✅ Score logic
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

setInterval(() => {
  if (!isGameOver) {
    birdTop += gravity;
    bird.style.top = birdTop + 'px';

    if (birdTop > window.innerHeight || birdTop < 0) {
      gameOver();
    }
  }
}, 20);

setInterval(() => {
  if (!isGameOver) createPipe();
}, 2000);