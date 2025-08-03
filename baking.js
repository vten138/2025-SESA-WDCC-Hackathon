let oven = document.getElementById("oven-closed");
const cake = document.getElementById("unbaked-cake");
const bakingPopup = document.getElementById("baking-popup");
const ovenMitt = document.getElementById("oven-mitt");
const bakedCake = document.getElementById("baked-cake");
// Fix the ID to match your HTML (#next-step-button, not #next-step-btn)
const nextStepBtn = document.getElementById("next-step-button");

let ovenIsOpen = false;
let cakeInOven = false;
let cakeIsBaked = false;

// Enable cake dragging
cake.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", "cake");
});

// Enable oven mitt dragging
ovenMitt.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", "oven-mitt");
});

function setupDropZone(element) {
  element.ondragover = (e) => e.preventDefault();
  element.ondrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    if (data === "cake" && ovenIsOpen && !cakeInOven) {
      element.src = "images/Cake-images-png/oven-open-unbaked-cake.png";
      cake.style.display = "none";
      cakeInOven = true;
      cakeIsBaked = false;
      console.log("Cake dropped into oven (unbaked)!");
    }
  };
}

// Setup oven mitt drop zone for taking cake out
function setupOvenMittDropZone(element) {
  element.ondragover = (e) => e.preventDefault();
  element.ondrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    if (data === "oven-mitt" && ovenIsOpen && cakeIsBaked && oven.src.includes("oven-cake-open")) {
      bakedCake.style.display = "block";  // Show cake outside oven
      cakeInOven = false;
      cakeIsBaked = false;
      oven.src = "images/Cake-images-png/oven-open.png";  // Oven open without cake
      console.log("Cake taken out of oven!");

      // Show the Next Step button using CSS class toggle for animation
      nextStepBtn.classList.add("show");
    }
  };
}

oven.addEventListener("click", () => {
  if (oven.dataset.animating === "true") return;
  oven.dataset.animating = "true";

  if (!ovenIsOpen) {
    // Opening oven
    oven.src = cakeIsBaked
      ? "images/Cake-images-png/oven-opening-cooked.png"
      : "images/Cake-images-png/oven-opening.png";

    setTimeout(() => {
      if (cakeInOven) {
        oven.src = cakeIsBaked
          ? "images/Cake-images-png/oven-cake-open.png"
          : "images/Cake-images-png/oven-open-unbaked-cake.png";
      } else {
        oven.src = "images/Cake-images-png/oven-open.png";
      }

      ovenIsOpen = true;
      oven.dataset.animating = "false";
      console.log("Oven is now open");

      setupDropZone(oven);

      // Setup oven mitt drop zone only if baked cake open
      if (cakeIsBaked && oven.src.includes("oven-cake-open")) {
        setupOvenMittDropZone(oven);
      }
    }, 2000);

  } else if (oven.src.includes("oven-open-unbaked-cake")) {
    // Closing with unbaked cake
    oven.src = "images/Cake-images-png/oven-cake-closing.png";

    setTimeout(() => {
      oven.src = "images/Cake-images-png/oven-cake-closed.png";
      ovenIsOpen = false;
      oven.dataset.animating = "false";
      console.log("Oven is now closed with cake inside");

      startAutoBakeTimer(); // Auto-bake starts here
    }, 2000);

  } else if (oven.src.includes("oven-cake-open")) {
    // Closing with baked cake open
    oven.src = "images/Cake-images-png/oven-cake-closing.png";

    setTimeout(() => {
      oven.src = "images/Cake-images-png/oven-cake-closed.png";
      ovenIsOpen = false;
      oven.dataset.animating = "false";
      console.log("Oven is now closed with baked cake inside");
    }, 2000);

  } else if (oven.src.includes("oven-cake-closed.png") && cakeInOven) {
    // Open oven after baking time or manual click
    oven.src = "images/Cake-images-png/oven-opening-cooked.png";

    setTimeout(() => {
      oven.src = "images/Cake-images-png/oven-cake-open.png";
      ovenIsOpen = true;
      cakeIsBaked = true; // Make sure cake is marked as baked
      oven.dataset.animating = "false";
      console.log("Oven opened with baked cake!");

      // Setup oven mitt drop zone because cake is baked and oven open
      setupOvenMittDropZone(oven);
    }, 2000);

  } else {
    // Closing empty or unknown state
    oven.src = "images/Cake-images-png/oven-opening.png";

    setTimeout(() => {
      oven.src = "images/Cake-images-png/oven-closed.png";
      ovenIsOpen = false;
      oven.dataset.animating = "false";
      console.log("Oven is now closed");
    }, 2000);
  }
});

bakingPopup.addEventListener("click", () => {
  if (oven.src.includes("oven-cake-closed.png")) {
    bakingPopup.style.display = "none";
    oven.dataset.animating = "true";

    oven.src = "images/Cake-images-png/oven-opening-cooked.png";

    setTimeout(() => {
      oven.src = "images/Cake-images-png/oven-cake-open.png";
      ovenIsOpen = true;
      cakeIsBaked = true;
      oven.dataset.animating = "false";
      console.log("Oven opened with cooked cake!");

      // Setup oven mitt drop zone because cake is baked and oven open
      setupOvenMittDropZone(oven);
    }, 2000);
  }
});

function showCookingPopupAfterDelay() {
  if (oven.src.includes("oven-cake-closed.png")) {
    setTimeout(() => {
      bakingPopup.style.display = "block";

      setTimeout(() => {
        bakingPopup.style.display = "none";
      }, 2000);
    }, 500);
  }
}

// Monitor image changes for cooking popup trigger
const observer = new MutationObserver(() => {
  showCookingPopupAfterDelay();
});

observer.observe(oven, { attributes: true, attributeFilter: ['src'] });

// Auto-baking logic
function startAutoBakeTimer() {
  setTimeout(() => {
    if (cakeInOven && !cakeIsBaked && !ovenIsOpen && oven.src.includes("oven-cake-closed.png")) {
      cakeIsBaked = true;
      console.log("Cake automatically baked!");

      // Optional: Show popup to alert user
      bakingPopup.style.display = "block";
      setTimeout(() => {
        bakingPopup.style.display = "none";
      }, 2000);
    }
  }, 2000); // Auto-bake after 2 seconds
}

// Next Step button click handler — now uses class toggle
nextStepBtn.addEventListener("click", () => {
  console.log("Next step button clicked!");
  nextStepBtn.classList.remove("show");
  window.location.href = "game1-title3.html";
});

