from js import document

drag_image = document.getElementByClass("dragImage")
drop_zone = document.getElementByClass("dropZone")
is_dragging = False

# Save initial position
original_left = int(drag_image.style.left.replace('px', ''))
original_top = int(drag_image.style.top.replace('px', ''))

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
    if is_dragging:
        drag_image.style.left = f"{evt.pageX - image.offsetWidth / 2}px"
        drag_image.style.top = f"{evt.pageY - image.offsetHeight / 2}px"
              
        # Check hover for highlight
        if in_drop_zone(evt.pageX, evt.pageY):
            drop_zone.classList.add("highlight")
        else:
            drop_zone.classList.remove("highlight")

def on_mouse_up(evt):
    global is_dragging
    is_dragging = False
    drag_image.style.cursor = "grab"

    # Remove highlight after mouse up
    drop_zone.classList.remove("highlight")

    if in_drop_zone(evt.pageX, evt.pageY):
        drag_image.style.display = "none"
    else:
        # Snap back
        drag_image.style.left = f"{original_left}px"
        drag_image.style.top = f"{original_top}px"


# Event listeners
drag_image.addEventListener("mousedown", on_mouse_down)
document.addEventListener("mouseup", on_mouse_up)
document.addEventListener("mousemove", on_mouse_move)