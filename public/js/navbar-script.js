const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", ()=> {
    if (window.scrollY == 0) {
        navbar.classList.remove("scrolled-navbar");
    } else {
        navbar.classList.add("scrolled-navbar");
    }
});

const logo = document.getElementById("web-logo");

logo.addEventListener("click", ()=> {
    window.location.href = "/";
})