// When user scrolls it calls the scrollRotate function.
window.onscroll =  () => {
    scrollRotate();
}

let rotateElement = document.getElementById("rotate");


scrollRotate = () => {
    // Rotate text when user scrolls, up to a certain scroll point.
    if (window.scrollY < 135) {
        rotateElement.style.transform = "rotate(-" + window.scrollY + "deg)";
    }
    // When user scrolls past a certain point fade out the element.
    if (window.scrollY > 60 && window.scrollY < 130) {
        rotateElement.style.opacity = (130 - window.scrollY) / 70;
        rotateElement.style.pointerEvents = 'all';
    } else if (window.scrollY > 130) {
    rotateElement.style.opacity = 0;
    } else if (window.scrollY < 60) {
    rotateElement.style.opacity = 1;
   }
}


