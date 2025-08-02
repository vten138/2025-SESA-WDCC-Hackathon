const oven = document.getElementById("oven-closed");

oven.addEventListener("click", () => {
  // Prevent multiple clicks
  if (oven.dataset.clicked === "true") return;
  oven.dataset.clicked = "true";

  // Show opening animation
  oven.src = "images/Cake-images-png/oven-opening.png";

  setTimeout(() => {
    oven.src = "images/Cake-images-png/oven-open.png";
    oven.classList.add("dropZone");
    oven.id = "oven-open"; // Update ID
    console.log("Oven is now open");
  }, 2000);

  console.log("Oven clicked!");
});
