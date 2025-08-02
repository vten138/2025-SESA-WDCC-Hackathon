const dragImg = document.getElementById('drag-img');
const dropZone = document.getElementById('drop-zone');

dragImg.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', dragImg.id);
});

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault(); // Allow dropping
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const draggedElement = document.getElementById(id);
  if (draggedElement) {
    draggedElement.remove(); // Make it disappear
  }
});