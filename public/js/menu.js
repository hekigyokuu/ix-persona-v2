document.addEventListener('DOMContentLoaded', () => {
    const testButton = document.getElementById('start-button');
    const profileButton = document.getElementById('profile-button');
    const homeButton = document.getElementById('home-button');
    const typeButton = document.getElementById('type-button');
    const aboutButton = document.getElementById('about-button');
    const escButton = document.getElementById('esc-button');

    function createPixelTransition() {
        // Create overlay element
        const overlay = document.createElement('div');

        // Style the overlay with pixelated effect
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

    function startTest(e) {
        e.preventDefault();
        startPixelTransition('/enneagram-test');
    }

    function openProfile(e) {
        e.preventDefault();
        startPixelTransition('/profile');
    }

    function goHome(e) {
        e.preventDefault();
        startPixelTransition('/homepage');
    }

    function viewTypes(e) {
        e.preventDefault();
        startPixelTransition('/enneagram-types');
    }

    function openAbout(e) {
        e.preventDefault();
        startPixelTransition('/about-us');
    }

    if (testButton) {
        testButton.addEventListener('click', startTest);
    }
    if (profileButton) {
        profileButton.addEventListener('click', openProfile);
    }
    if (homeButton) {
        homeButton.addEventListener('click', goHome);
    }
    if (typeButton) {
        typeButton.addEventListener('click', viewTypes);
    }
    if (aboutButton) {
        aboutButton.addEventListener('click', openAbout);
    }
    document.addEventListener('keydown', (event) => {
        const key = event.key.toLowerCase();
        switch (key) {
            case 't':
                startTest(event);
                break;
            case 'p':
                openProfile(event);
                break;
            case 'h':
                goHome(event);
                break;
            case 'e':
                viewTypes(event);
                break;
            case 'a':
                openAbout(event);
                break;
        }
    });
});
