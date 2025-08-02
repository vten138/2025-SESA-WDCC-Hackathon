const bird = document.getElementById('bird');
const gameContainer = document.getElementById('game-container');
const flappyGameAudio = new Audio('audio/flappy-game.mp3');
flappyGameAudio.volume = 0.8;
flappyGameAudio. play();

let birdTop = 60;
let gravity = 2;
let isGameOver = false;
let isPaused = false;

document.addEventListener('keydown', flap);
document.addEventListener('click', flap);

let score = 0;
const scoreDisplay = document.getElementById('score');

const scoreAudio = new Audio('audio/coin-collecting.mp3');
scoreAudio.volume = 0.8;

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

    const birdX = 150;       // Matches left: 150px
    const birdWidth = 60;
    const birdHeight = 60;
    const pipeWidth = 100;

    if (!isPaused) {
      pipeX -= 2;
      pipeTop.style.left = pipeX + 'px';
      pipeBottom.style.left = pipeX + 'px';

  // Collision detection
  const pipeRightEdge = pipeX + pipeWidth;
  const birdRightEdge = birdX + birdWidth;
  const birdBottom = birdTop + birdHeight;

  if (pipeRightEdge > birdX && pipeX < birdRightEdge) {
    if (birdTop < pipeHeight || birdBottom > pipeHeight + gap) {
      gameOver();
    }
  }
}
    const pipeRightEdge = pipeX + pipeWidth;
    const birdRightEdge = birdX + birdWidth;
    const birdBottom = birdTop + birdHeight;

  if (pipeRightEdge > birdX && pipeX < birdRightEdge) {
    if (birdTop < pipeHeight || birdBottom > pipeHeight + gap) {
      gameOver();
    }
  }

  const menuButton = document.getElementById('menu-button');
  menuButton.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
  
  if (!hasScored && pipeX + pipeWidth < birdX) {
      score++;
      hasScored = true;
      scoreDisplay.textContent = score;

      scoreAudio.currentTime = 0;
      scoreAudio.play().catch((err) =>
        console.warn("Audio play failed:", err)
      );

      if (score === 2) showWinScreen();
    }
  }, 20);
}

function gameOver() {
  isGameOver = true;
  const gameOverScreen = document.getElementById('game-over-screen');
  gameOverScreen.style.display = 'flex';
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

const pauseButton = document.getElementById('pause-button');

pauseButton.addEventListener('click', () => {
  isPaused = !isPaused;

  // Optional: change button text while paused
  if (isPaused) {
    pauseButton.textContent = 'Resume';
  } else {
    pauseButton.textContent = 'Pause';
  }
});

document.getElementById('restart-button').addEventListener('click', () => {
  window.location.reload(); // Restart game
});

document.getElementById('home-button').addEventListener('click', () => {
  window.location.href = 'index.html'; // Or your main menu file
});

function showWinScreen() {
  const winAudio = new Audio('audio/you-win.mp3');
  document.getElementById('win-screen').style.display = 'flex';
  winAudio.volume = 0.8;
  winAudio.play().catch((err) => console.warn("Audio play failed:", err));
  isGameOver = true;
}

document.getElementById('restart-win').addEventListener('click', () => {
  window.location.reload(); // Restart game
});

document.getElementById('home-win').addEventListener('click', () => {
  window.location.href = 'index.html'; // Or your main menu
});