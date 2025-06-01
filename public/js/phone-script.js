function setRealVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setRealVH();
window.addEventListener('resize', setRealVH);
