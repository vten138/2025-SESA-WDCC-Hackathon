from js import document, window

drag_image = document.querySelector(".dragImage")
drop_zone = document.querySelector(".dropZone")
is_dragging = False

# Save initial position, with fallback
left_str = drag_image.style.left or "0px"
top_str = drag_image.style.top or "0px"
original_left = int(left_str.replace('px', ''))
original_top = int(top_str.replace('px', ''))

# Set image at original position
drag_image.style.left = f"{original_left}px"
drag_image.style.top = f"{original_top}px"

def in_drop_zone(x, y):
    rect = drop_zone.getBoundingClientRect()
    return (rect.left <= x <= rect.right) and (rect.top <= y <= rect.bottom)

def on_mouse_down(evt):
    global is_dragging
    is_dragging = True
    drag_image.style.cursor = "grabbing"

def on_mouse_move(evt):
    global is_dragging
    if is_dragging:
        drag_image.style.left = f"{evt.pageX - drag_image.offsetWidth / 2}px"
        drag_image.style.top = f"{evt.pageY - drag_image.offsetHeight / 2}px"

        # Highlight drop zone if hovered
        if in_drop_zone(evt.pageX, evt.pageY):
            drop_zone.classList.add("highlight")
        else:
            drop_zone.classList.remove("highlight")

def on_mouse_up(evt):
    global is_dragging
    is_dragging = False
    drag_image.style.cursor = "grab"

    drop_zone.classList.remove("highlight")

    if in_drop_zone(evt.pageX, evt.pageY):
        drag_image.style.display = "none"
    else:
        drag_image.style.left = f"{original_left}px"
        drag_image.style.top = f"{original_top}px"

# Attach event listeners
drag_image.addEventListener("mousedown", on_mouse_down)
document.addEventListener("mouseup", on_mouse_up)
document.addEventListener("mousemove", on_mouse_move)

oven = document.getElementById("oven-closed")

def after_delay():
    oven.src = "images/Cake-images-png/oven-open.png"
    oven.classList.add("dropZone")
    oven.id = "oven-open"

def openOven(evt):
    oven.src = "images/Cake-images-png/oven-opening.png"
    window.setTimeout(after_delay, 2000)

oven.addEventListener("click", openOven)

print("PyScript loaded and running!")
