from js import document

image = document.getElementById("dragImage")
drop_zone = document.getElementById("dropZone")
is_dragging = False

# Save initial position
original_left = int(image.style.left.replace('px', ''))
original_top = int(image.style.top.replace('px', ''))

# Set image at original position
image.style.left = f"{original_left}px"
image.style.top = f"{original_top}px"

def in_drop_zone(x, y):
    rect = drop_zone.getBoundingClientRect()
    return (rect.left <= x <= rect.right) and (rect.top <= y <= rect.bottom)

def on_mouse_down(evt):
    global is_dragging
    is_dragging = True
    image.style.cursor = "grabbing"

def on_mouse_up(evt):
    global is_dragging
    is_dragging = False
    image.style.cursor = "grab"

    if in_drop_zone(evt.pageX, evt.pageY):
        image.style.display = "none"
    else:
        # Snap back
        image.style.left = f"{original_left}px"
        image.style.top = f"{original_top}px"

def on_mouse_move(evt):
    if is_dragging:
        image.style.left = f"{evt.pageX - image.offsetWidth / 2}px"
        image.style.top = f"{evt.pageY - image.offsetHeight / 2}px"

# Event listeners
image.addEventListener("mousedown", on_mouse_down)
document.addEventListener("mouseup", on_mouse_up)
document.addEventListener("mousemove", on_mouse_move)