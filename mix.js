const ingredients = document.getElementsByClassName('ingredients');
const dropZone = document.getElementById('bowl-drop-zone');
const bowl = document.getElementById('bowl');
const whisk = document.getElementById('whisk');

let bowlStage = 0;
const bowlImages = [
  'images/Cake-images-png/bowl1.png',
  'images/Cake-images-png/bowl2.png',
  'images/Cake-images-png/bowl3.png'
];

let originalWhiskX = 0;
let originalWhiskY = 0;

// Store original position after page layout
window.addEventListener('load', () => {
  originalWhiskX = whisk.offsetLeft;
  originalWhiskY = whisk.offsetTop;
});

// Allow dragging for all ingredients
for (let item of ingredients) {
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', item.id);
  });
}

// Allow dragging for whisk
whisk.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', 'whisk');
});

// Allow drop on bowl area
dropZone.addEventListener('dragover', (e) => e.preventDefault());

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const draggedId = e.dataTransfer.getData('text/plain');
  const draggedElem = document.getElementById(draggedId);

  if (!draggedElem) return;

  // ====== Whisk Drop ======
  if (draggedId === 'whisk') {
    const bowlCenterX = dropZone.offsetLeft + dropZone.offsetWidth / 2 - whisk.offsetWidth / 2;
    const bowlCenterY = dropZone.offsetTop + dropZone.offsetHeight / 2 - whisk.offsetHeight / 2;

    whisk.style.position = 'absolute';
    whisk.style.left = `${bowlCenterX}px`;
    whisk.style.top = `${bowlCenterY}px`;

    // Trigger stirring animation
    whisk.classList.add('stirring');

    // Reset after animation
    setTimeout(() => {
      whisk.classList.remove('stirring');
      whisk.style.transform = 'none'; // reset translate/scale
      whisk.style.left = `${originalWhiskX}px`;
      whisk.style.top = `${originalWhiskY}px`;
    }, 3000); // match animation duration
  }

  // ====== Ingredient Drop ======
  else if (draggedElem.classList.contains('ingredients')) {
    draggedElem.style.display = 'none';

    if (bowlStage < bowlImages.length) {
      bowl.src = bowlImages[bowlStage];
      bowlStage++;
    }
  }
});