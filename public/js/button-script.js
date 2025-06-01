// << PAGE LOAD (SIGNUP PAGE) - appending the ages into the select tag (13 to 120+) >>
// << PAGE LOAD (GLOBAL) - adding functionality of navigation button and an anchor -> /enneagram-test >>
// << PAGE LOAD (GLOBAL) - adding functionality to profile button -> /profile >>
// << PAGE LOAD (INDEX PAGE) - adding functionality to personality type buttons @param buttonID && typeHash -> /enneagram-types${typeHash} >>
// << PERSONALITY TYPE BUTTONS ONCLICK (INDEX PAGE) - transition into the navigation of page id >>
document.addEventListener('DOMContentLoaded', () => {
    const ageSelect = document.getElementById('age');
    if (ageSelect) {
        for (let i = 13; i <= 120; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i + ' yrs';
            ageSelect.appendChild(option);
        }
    }

    const ctaButtons = document.querySelectorAll('.cta-button');
    const takeTest = document.getElementById('take-test-nav');
    if (takeTest) {
        takeTest.href = '/enneagram-test';
    }

    if (ctaButtons) {
        ctaButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                window.location.href = '/enneagram-test';
            });
        });
    }

    const profileNavButton = document.getElementById('toggle-profile-btn');
    if (profileNavButton) {
        profileNavButton.addEventListener('click', () => {
            window.location.href = '/profile';
        });
    }

    function createPixelTransition() {
        const overlay = document.createElement('div');

        Object.assign(overlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            backgroundColor: '#3a4657',
            zIndex: '9999',
            pointerEvents: 'none',
            display: 'none',
            imageRendering: 'pixelated',
            backgroundImage: `
      linear-gradient(45deg, #374151 25%, transparent 25%),
      linear-gradient(-45deg, #374151 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #374151 75%),
      linear-gradient(-45deg, transparent 75%, #374151 75%)
    `,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',

            clipPath: 'inset(50% 50% 50% 50%)',
        });

        overlay.id = 'pixel-transition';
        document.body.append(overlay);
        return overlay;
    }

    function startPixelTransition(url) {
        let overlay =
            document.getElementById('pixel-transition') ||
            createPixelTransition();

        overlay.style.display = 'block';
        overlay.style.clipPath = 'inset(50% 50% 50% 50%)';

        void overlay.offsetWidth;

        overlay.style.clipPath = 'inset(0% 0% 0% 0%)';
        overlay.style.transition = 'clip-path .6s steps(8, end)';

        overlay.addEventListener(
            'transitionend',
            function handler() {
                overlay.removeEventListener('transitionend', handler);
                setTimeout(() => {
                    overlay.remove();
                    window.location.href = url;
                }, 100);
            },
            { once: true }
        );
    }
    document.getElementById('go-menu').addEventListener('click', (e) => {
        e.preventDefault();
        startPixelTransition('/');
    });
    document.getElementById('go-types').addEventListener('click', (e) => {
        e.preventDefault();
        startPixelTransition('/enneagram-types');
    });
    document.getElementById('go-test').addEventListener('click', (e) => {
        e.preventDefault();
        startPixelTransition('/enneagram-test');
    });
    document.getElementById('go-home').addEventListener('click', (e) => {
        e.preventDefault();
        startPixelTransition('/homepage');
    });

    const setupTypeButton = (buttonId, typeHash) => {
        const typePosterButton = document.getElementById(buttonId);
        if (typePosterButton) {
            typePosterButton.addEventListener('click', () => {
                window.location.href = `/enneagram-types#${typeHash}`;
            });
        }
    };

    setupTypeButton('btn-to-one', 'type-one');
    setupTypeButton('btn-to-two', 'type-two');
    setupTypeButton('btn-to-three', 'type-three');
    setupTypeButton('btn-to-four', 'type-four');
    setupTypeButton('btn-to-five', 'type-five');
    setupTypeButton('btn-to-six', 'type-six');
    setupTypeButton('btn-to-seven', 'type-seven');
    setupTypeButton('btn-to-eight', 'type-eight');
    setupTypeButton('btn-to-nine', 'type-nine');

    setTimeout(() => {
        const hash = window.location.hash;
        if (hash) {
            const target = document.querySelector(hash);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'bottom',
                });
            }
        }
    }, 100);
});
