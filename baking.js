// Get elements
const oven = document.getElementById("oven-closed");

// Oven click handler
oven.addEventListener("click", () => {
  oven.src = "images/Cake-images-png/oven-opening.png";

  setTimeout(() => {
    oven.src = "images/Cake-images-png/oven-open.png";
    oven.classList.add("dropZone");
    oven.id = "oven-open";
    console.log("Oven is now open");
  }, 2000);

  console.log("Oven clicked!");
});
