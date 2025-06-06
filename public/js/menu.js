document.addEventListener('DOMContentLoaded', () => {
    document
        .getElementById('start-button')
        ?.addEventListener('click', startTest);

    document
        .getElementById('profile-button')
        ?.addEventListener('click', openProfile);

    document.getElementById('home-button')?.addEventListener('click', goHome);

    document
        .getElementById('type-button')
        ?.addEventListener('click', viewTypes);

    document
        .getElementById('about-button')
        ?.addEventListener('click', openAbout);
});

const startTest = (e) => {
    e.preventDefault();
    pixelTransitionAndLocatorFunc('/enneagram-test');
};

const openProfile = (e) => {
    e.preventDefault();
    pixelTransitionAndLocatorFunc('/profile');
};

const goHome = (e) => {
    e.preventDefault();
    pixelTransitionAndLocatorFunc('/homepage');
};

const viewTypes = (e) => {
    e.preventDefault();
    pixelTransitionAndLocatorFunc('/enneagram-types');
};

const openAbout = (e) => {
    e.preventDefault();
    pixelTransitionAndLocatorFunc('/about-us');
};

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
