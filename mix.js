// Drop zone (bowl image)
const dropZone = document.getElementById("bowl");

// Sequence of images the bowl changes through
const stepImages = [
  "images/Cake-images-png/bowl.png", // initial
  "images/Cake-images-png/21.png",
  "images/Cake-images-png/22.png",
  "images/Cake-images-png/23.png"
];

let currentStep = 0;        // Start at step 0
let draggedId = null;       // Keep track of the dragged image ID

// Set up dragstart on all draggable ingredients
document.querySelectorAll(".dragImage").forEach(elem => {
  elem.addEventListener("dragstart", (e) => {
    draggedId = e.target.id; // Store the ID
    e.dataTransfer.setData("text/plain", draggedId);
  });
});

// Allow the bowl to receive drops
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault(); // Required to allow dropping
});

// Handle the drop
dropZone.addEventListener("drop", (e) => {
  e.preventDefault();

  const draggedElem = document.getElementById(draggedId);

  // 1. Hide the dragged ingredient from the counter
  if (draggedElem) {
    draggedElem.style.display = "none"; // or use opacity for animation
  }

  // 2. Update the bowl image to the next step
  if (currentStep < stepImages.length - 1) {
    currentStep++;
    dropZone.src = stepImages[currentStep];
  }

  // 3. Reset drag tracking
  draggedId = null;
});