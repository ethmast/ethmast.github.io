// When user scrolls it calls the scrollRotate function.
window.onscroll =  () => {
    scrollRotate();
}

let rotateElement = document.getElementById("rotate");


scrollRotate = () => {
    // Rotate text when user scrolls, up to a certain scroll point.
    if (window.scrollY < 110) {
        rotateElement.style.transform = "rotate(-" + window.scrollY + "deg)";
    }
    // When user scrolls past a certain point fade out the element.
    if (window.scrollY > 90) {
        rotateElement.style.opacity = 0;
        rotateElement.style.pointerEvents = 'all';
    } else { // Fade back in if user scrolls back up.
        rotateElement.style.opacity = 1;
        rotateElement.style.pointerEvents = 'none';
    }
}


