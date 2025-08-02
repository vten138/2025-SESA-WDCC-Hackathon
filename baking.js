let oven = document.getElementById("oven-closed");
const cake = document.getElementById("cake");

let ovenIsOpen = false;
let cakeInOven = false;

// Enable cake dragging
cake.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", "cake");
});

function setupDropZone(element) {
  element.ondragover = (e) => e.preventDefault();
  element.ondrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    if (data === "cake") {
      element.src = "images/Cake-images-png/oven-cake-open.png";
      element.classList.add("oven");
      cake.style.display = "none";
      cakeInOven = true;
      console.log("Cake dropped into oven!");
    }
  };
}

oven.addEventListener("click", () => {
  if (oven.dataset.animating === "true") return;
  oven.dataset.animating = "true";

  if (!ovenIsOpen) {
    //Open oven
    oven.src = "images/Cake-images-png/oven-opening.png";
    oven.classList.add("oven")

    setTimeout(() => {
      oven.src = cakeInOven
        ? "images/Cake-images-png/oven-cake-open.png"
        : "images/Cake-images-png/oven-open.png";

      oven.id = "oven-open";
      ovenIsOpen = true;
      oven.dataset.animating = "false";
      console.log("Oven is now open");

      // Re-select oven by updated ID
      oven = document.getElementById("oven-open");

      oven.addEventListener("dragover", (e) => e.preventDefault());

      oven.addEventListener("drop", (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        if (data === "cake") {
          oven.src = "images/Cake-images-png/oven-cake-open.png";
          oven.classList.add("oven")
          cake.style.display = "none";
          cakeInOven = true;
          console.log("Cake dropped into oven!");
        }
        // Re-select and set up oven after opening
        oven = document.getElementById("oven-open");
        setupDropZone(oven);

      });
    }, 2000);

  } else {
    // Close oven
    oven.src = "images/Cake-images-png/oven-opening.png";
    oven.classList.add("oven")

    setTimeout(() => {
      oven.src = cakeInOven
        ? "images/Cake-images-png/oven-cake-closed.png"
        : "images/Cake-images-png/oven-closed.png";

       //Re-select and set up oven after opening
        oven = document.getElementById("oven-open");
        setupDropZone(oven);

      oven.id = "oven-closed";
      oven.classList.add("oven")
      ovenIsOpen = false;
      oven.dataset.animating = "false";
      console.log("Oven is now closed");

      // Re-select oven again by updated ID
      oven = document.getElementById("oven-closed");
    }, 2000);
  }
});
