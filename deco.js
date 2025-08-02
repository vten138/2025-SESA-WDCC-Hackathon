const draggables = document.querySelectorAll('.deco');

const setToDropZone = {
  'set1': document.getElementById('drop-zone-1'),
  'set2': document.getElementById('drop-zone-2'),
  'set3': document.getElementById('drop-zone-3'),
};

// Store the dragged item's ID and set class
draggables.forEach(elem => {
  elem.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('id', e.target.id);
    const setClass = [...e.target.classList].find(cls => cls.startsWith('set'));
    e.dataTransfer.setData('set', setClass);
  });
});

// Drop zone behavior
Object.entries(setToDropZone).forEach(([setName, dropZone]) => {
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    const draggedSet = e.dataTransfer.getData('set');
    if (draggedSet === setName) {
      dropZone.classList.add('highlight');
    }
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('highlight');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('highlight');

    const id = e.dataTransfer.getData('id');
    const draggedSet = e.dataTransfer.getData('set');
    const draggedImg = document.getElementById(id);

    if (draggedSet === setName) {
      dropZone.innerHTML = ''; // remove previous from this set
      const newImg = document.createElement('img');
      newImg.src = draggedImg.src;
      newImg.classList.add('dropped-img');
      dropZone.appendChild(newImg);
    }
  });
});