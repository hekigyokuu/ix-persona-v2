const ctaButtons = document.querySelectorAll(".cta-button");
ctaButtons.forEach(btn=> {
    btn.addEventListener("click", ()=> {
        window.location.href = "/test";
    });
});