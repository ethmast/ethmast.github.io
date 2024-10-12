window.onscroll =  () => {
    scrollRotate();
}

let portrait = document.getElementById("rotate");


scrollRotate = () => {
//    console.log(portrait[0]);
//    console.log(window.scrollY);
    if (window.scrollY < 110) {
    portrait.style.transform = "rotate(-" + window.scrollY + "deg)";
    }
    if (window.scrollY > 90) {
        portrait.style.opacity = 0;
        portrait.style.pointerEvents = 'all';
    } else {
        portrait.style.opacity = 1;
        portrait.style.pointerEvents = 'none';
    }
}


//console.log("rotate(" + window.scrollY/2 +"deg)")