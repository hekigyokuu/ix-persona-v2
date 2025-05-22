// << NAVBAR SCRIPT - event listener for navigation bar that add a class based on scrollY position >>
// << NAVBAR SCRIPT - event listener for logo in navigation bar that navigated to index page -> / >>
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY == 0) {
        navbar.classList.remove('scrolled-navbar');
    } else {
        navbar.classList.add('scrolled-navbar');
    }
});

const logo = document.getElementById('web-logo');

logo.addEventListener('click', () => {
    window.location.href = '/';
});
