const ingredients = document.getElementsByClassName('ingredients');
const dropZone = document.getElementById('bowl-drop-zone');
const bowl = document.getElementById('bowl');
const whisk = document.getElementById('whisk');
const nextButton = document.getElementById('next-step-button');

let bowlStage = 0;
let whiskUsedAtStage = -1; // Track the bowl stage at which whisk was last used

const bowlImages = [
  'images/Cake-images-png/bowl1.png',
  'images/Cake-images-png/bowl2.png',
  'images/Cake-images-png/bowl3.png'
];

let originalWhiskX = 0;
let originalWhiskY = 0;

window.addEventListener('load', () => {
  originalWhiskX = whisk.offsetLeft;
  originalWhiskY = whisk.offsetTop;
});

// Enable drag for ingredients
for (let item of ingredients) {
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', item.id);
  });
}

// Enable drag for whisk
whisk.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', 'whisk');
});

// Allow drop
dropZone.addEventListener('dragover', (e) => e.preventDefault());

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const draggedId = e.dataTransfer.getData('text/plain');
  const draggedElem = document.getElementById(draggedId);

  if (!draggedElem) return;

  // === Whisk dropped ===
  if (draggedId === 'whisk') {
    const bowlCenterX = dropZone.offsetLeft + dropZone.offsetWidth / 2 - whisk.offsetWidth / 2;
    const bowlCenterY = dropZone.offsetTop + dropZone.offsetHeight / 2 - whisk.offsetHeight / 2;

    whisk.style.position = 'absolute';
    whisk.style.left = `${bowlCenterX}px`;
    whisk.style.top = `${bowlCenterY}px`;

    whisk.classList.add('stirring');

    // Record when whisk is used
    whiskUsedAtStage = bowlStage;

    setTimeout(() => {
      whisk.classList.remove('stirring');
      whisk.style.transform = 'none';
      whisk.style.left = `${originalWhiskX}px`;
      whisk.style.top = `${originalWhiskY}px`;

      // Show button only if whisk used after last ingredient is added
      if (bowlStage === bowlImages.length && whiskUsedAtStage === bowlImages.length) {
        nextButton.classList.add('show');
      }
    }, 3000);
  }

  // === Ingredient dropped ===
  else if (draggedElem.classList.contains('ingredients')) {
    draggedElem.style.display = 'none';

    if (bowlStage < bowlImages.length) {
      bowl.src = bowlImages[bowlStage];
      bowlStage++;
    }

    // Show button only if whisk used after last ingredient
    if (bowlStage === bowlImages.length && whiskUsedAtStage === bowlImages.length) {
      nextButton.classList.add('show');
    }
  }
});