let oven = document.getElementById("oven-closed");
const cake = document.getElementById("unbaked-cake");
const bakingPopup = document.getElementById("baking-popup");

let ovenIsOpen = false;
let cakeInOven = false;
let cakeIsBaked = false;

// Enable cake dragging
cake.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", "cake");
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

oven.addEventListener("click", () => {
  if (oven.dataset.animating === "true") return;
  oven.dataset.animating = "true";

  if (!ovenIsOpen) {
    // Opening oven
    oven.src = "images/Cake-images-png/oven-opening.png";

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
    }, 2000);

  } else {
    // Closing oven
    if (oven.src.includes("oven-open-unbaked-cake")) {
      oven.src = "images/Cake-images-png/oven-cake-closing.png";

      setTimeout(() => {
        oven.src = "images/Cake-images-png/oven-cake-closed.png";
        ovenIsOpen = false;
        oven.dataset.animating = "false";
        console.log("Oven is now closed with cake inside");
      }, 2000);

    } else if (oven.src.includes("oven-cake-open")) {
      // Closing baked cake manually
      oven.src = "images/Cake-images-png/oven-cake-closing.png";

      setTimeout(() => {
        oven.src = "images/Cake-images-png/oven-cake-closed.png";
        ovenIsOpen = false;
        oven.dataset.animating = "false";
        console.log("Oven is now closed with baked cake inside");
      }, 2000);

    } else {
      oven.src = "images/Cake-images-png/oven-opening.png";

      setTimeout(() => {
        oven.src = "images/Cake-images-png/oven-closed.png";
        ovenIsOpen = false;
        oven.dataset.animating = "false";
        console.log("Oven is now closed");
      }, 2000);
    }
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
    }, 2000);
  }
});

function showCookingPopupAfterDelay() {
  if (oven.src.includes("oven-cake-closed.png")) {
    setTimeout(() => {
      bakingPopup.style.display = "block";

      setTimeout(() => {
        bakingPopup.style.display = "none";
      }, 5000);
    }, 2000);
  }
}

// Monitor image changes for cooking popup trigger
const observer = new MutationObserver(() => {
  showCookingPopupAfterDelay();
});

observer.observe(oven, { attributes: true, attributeFilter: ['src'] });
