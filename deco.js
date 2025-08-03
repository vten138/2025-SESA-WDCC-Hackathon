const draggables = document.querySelectorAll('.draggable');
const dropZone = document.getElementById('drop-zone');

// Map: drag ID → drop image path
const dropImageMap = {
  candle1: 'images/Cake-images-png/cake-decorating/21.png',
  candle2: 'images/Cake-images-png/cake-decorating/22.png',
  candle3: 'images/Cake-images-png/cake-decorating/23.png',
  icing1:  'images/Cake-images-png/cake-decorating/26.png',
  icing2:  'images/Cake-images-png/cake-decorating/25.png',
  icing3:  'images/Cake-images-png/cake-decorating/27.png',
  strawberry: 'images/Cake-images-png/cake-decorating/28.png'
};

// When dragging starts, store the ID of the element
draggables.forEach(elem => {
  elem.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('id', e.target.id);
  });
});

// Show highlight when dragging over drop zone
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('highlight');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('highlight');
});

// Handle the drop
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('highlight');

  const id = e.dataTransfer.getData('id');
  const newImg = document.createElement('img');
  newImg.src = dropImageMap[id] || 'images/full/default.png';
  newImg.classList.add('dropped-img');

  // Assign class based on type
  if (id.startsWith('icing')) {
    newImg.classList.add('dropped-icing');
  } else if (id.startsWith('candle')) {
    newImg.classList.add('dropped-candle');
  } else if (id === 'strawberry') {
    newImg.classList.add('dropped-strawberry');
  }

  // Position where dropped (rough center offset)
  newImg.style.position = 'absolute';
  newImg.style.left = '2vw';
  newImg.style.top = '2vh';

  dropZone.appendChild(newImg);
});
