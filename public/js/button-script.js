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
        const option = document.createElement('option');
        option.value = '120+';
        option.textContent = i + ' yrs';
        ageSelect.appendChild(option);
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
