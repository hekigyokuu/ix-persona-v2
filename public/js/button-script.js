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

    ctaButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            window.location.href = '/login';
        });
    });

    const setupTypeButton = (buttonId, typeHash) => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', () => {
                window.location.href = `/enneagram-types#${typeHash}`;
            });
        }
    };

    const profileButton = document.getElementById('toggle-profile-btn');
    profileButton.addEventListener('click', () => {
        window.location.href = '/profile';
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
