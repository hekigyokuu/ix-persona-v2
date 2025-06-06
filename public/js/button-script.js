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

    const testMuteToggle = document.getElementById('test-mute-toggle');
    testMuteToggle ? (testMuteToggle.innerHTML = svgUnmuted) : null;

    buttonNavigationRoutes.forEach(({ selector, url }) => {
        const navButton = document.getElementById(selector);
        navButton?.addEventListener('click', (e) => {
            e.preventDefault();
            pixelTransitionAndLocatorFunc(url);
        });
    });

    typesNavigationToFullDescriptionRoutes.forEach(({ selector, url }) => {
        const typesNavigation = document.querySelector(selector);
        if (typesNavigation) {
            typesNavigation?.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = `#${url}`;
            });
        }
    });

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

const createPixelTransition = () => {
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
};

const pixelTransitionAndLocatorFunc = (url) => {
    let overlay =
        document.getElementById('pixel-transition') || createPixelTransition();

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
};

const buttonNavigationRoutes = [
    { selector: 'logo-go-home', url: '/homepage' },
    { selector: 'take-the-test-button-homepage', url: '/enneagram-test' },
    { selector: 'go-menu', url: '/' },
    { selector: 'go-types', url: '/enneagram-types' },
    { selector: 'go-test', url: '/enneagram-test' },
    { selector: 'go-home', url: '/homepage' },
    { selector: 'go-profile', url: '/profile' },
];

const typesNavigationToFullDescriptionRoutes = [
    // Type One - The Reformer
    { selector: '#type-one h3', url: 'reformer-fulldesc' },
    {
        selector: '#type-one .title-description-container',
        url: 'reformer-fulldesc',
    },

    // Type Two - The Helper
    { selector: '#type-two h3', url: 'helper-fulldesc' },
    {
        selector: '#type-two .title-description-container',
        url: 'helper-fulldesc',
    },

    // Type Three - The Achiever
    { selector: '#type-three h3', url: 'achiever-fulldesc' },
    {
        selector: '#type-three .title-description-container',
        url: 'achiever-fulldesc',
    },

    // Type Four - The Individualist
    { selector: '#type-four h3', url: 'individualist-fulldesc' },
    {
        selector: '#type-four .title-description-container',
        url: 'individualist-fulldesc',
    },

    // Type Five - The Investigator
    { selector: '#type-five h3', url: 'investigator-fulldesc' },
    {
        selector: '#type-five .title-description-container',
        url: 'investigator-fulldesc',
    },

    // Type Six - The Loyalist
    { selector: '#type-six h3', url: 'loyalist-fulldesc' },
    {
        selector: '#type-six .title-description-container',
        url: 'loyalist-fulldesc',
    },

    // Type Seven - The Enthusiast
    { selector: '#type-seven h3', url: 'enthusiast-fulldesc' },
    {
        selector: '#type-seven .title-description-container',
        url: 'enthusiast-fulldesc',
    },

    // Type Eight - The Challenger
    { selector: '#type-eight h3', url: 'challenger-fulldesc' },
    {
        selector: '#type-eight .title-description-container',
        url: 'challenger-fulldesc',
    },

    // Type Nine - The Peacemaker
    { selector: '#type-nine h3', url: 'peacemaker-fulldesc' },
    {
        selector: '#type-nine .title-description-container',
        url: 'peacemaker-fulldesc',
    },
];

const setupTypeButton = (buttonId, typeHash) => {
    const typePosterButton = document.getElementById(buttonId);
    if (typePosterButton) {
        typePosterButton.addEventListener('click', (e) => {
            e.preventDefault();
            pixelTransitionAndLocatorFunc(`/enneagram-types#${typeHash}`);
        });
    }
};

document.addEventListener('keydown', (event) => {
    const globalKeyToMenu = event.key.toLowerCase();
    if (globalKeyToMenu === 'm') {
        pixelTransitionAndLocatorFunc('/');
    }
});
