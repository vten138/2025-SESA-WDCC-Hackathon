const dragImgs = document.getElementsByClassName('ingredients');
const dropZone = document.getElementById('bowl-drop-zone');
const bowl = document.getElementById('bowl');
const whisk = document.getElementById('whisk');

// Store the original position of the whisk
const originalWhiskPosition = {
  top: whisk.style.top || '20px',
  left: whisk.style.left || '20px'
};

let bowlStage = 0;

const bowlImages = [
  'images/Cake-images-png/bowl1.png',
  'images/Cake-images-png/bowl2.png',
  'images/Cake-images-png/bowl3.png'
];

// Enable dragging for all ingredients
for (let img of dragImgs) {
  if (img.draggable) {
    img.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', img.id);
    });
  }
}

// Whisk drag setup
whisk.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', whisk.id);
});

// Allow drop on the bowl drop zone
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
});

// Drop handler
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const draggedElement = document.getElementById(id);

  if (!draggedElement || draggedElement === dropZone) return;

  if (draggedElement.id === 'whisk') {
    // --- Whisk Stirring Animation ---

    // Move to stir starting point
    whisk.style.left = `${bowl.offsetLeft + 60}px`;
    whisk.style.top = `${bowl.offsetTop - 20}px`;

    // Start stir animation
    whisk.classList.add('stirring');

    // On animation end, remove class and return to original position
    whisk.addEventListener('animationend', () => {
      whisk.classList.remove('stirring');

      // Return to original position
      whisk.style.left = originalWhiskPosition.left;
      whisk.style.top = originalWhiskPosition.top;
    }, { once: true });

  } else {
    // --- Ingredient logic ---
    draggedElement.remove();

    if (bowlStage < bowlImages.length) {
      bowl.src = bowlImages[bowlStage];
      bowlStage++;
    }
  }
});
