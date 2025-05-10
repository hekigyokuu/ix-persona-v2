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

// HAHAHHAHAHHAHA

const popup = document.getElementById('popupAd');
const skipBtn = document.getElementById('skipAdBtn');
const countdownText = document.getElementById('countdown');
let timeLeft = 10;

const countdownInterval = setInterval(() => {
    timeLeft--;
    countdownText.textContent = `You can skip in ${timeLeft} second${
        timeLeft === 1 ? '' : 's'
    }...`;

    if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        countdownText.textContent = 'You can now skip the ad.';
        skipBtn.disabled = false;
        skipBtn.classList.add('enabled');
        skipBtn.style.cursor = 'pointer';
    }
}, 1000);

skipBtn.addEventListener('click', () => {
    if (!skipBtn.disabled) {
        popup.style.display = 'none';
        document.body.classList.remove('lock-scroll');
    }
});
