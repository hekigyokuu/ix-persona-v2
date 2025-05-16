document.addEventListener('DOMContentLoaded', () => {
    const user = getCurrentUser();

    const ctaButtons = document.querySelectorAll('.cta-button');
    const takeTest = document.getElementById('take-test-nav');

    if (user && user.isLoggedIn) takeTest.href = '/enneagram-test';
    else takeTest.href = '/login';

    ctaButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            if (user && user.isLoggedIn)
                window.location.href = '/enneagram-test';
            else window.location.href = '/login';
        });
    });

    const btnToOne = document.getElementById('btn-to-one');
    const btnToTwo = document.getElementById('btn-to-two');
    const btnToThree = document.getElementById('btn-to-three');
    const btnToFour = document.getElementById('btn-to-four');
    const btnToFive = document.getElementById('btn-to-five');
    const btnToSix = document.getElementById('btn-to-six');
    const btnToSeven = document.getElementById('btn-to-seven');
    const btnToEight = document.getElementById('btn-to-eight');
    const btnToNine = document.getElementById('btn-to-nine');

    btnToOne.addEventListener('click', () => {
        window.location.href = '/enneagram-types#type-one';
    });

    btnToTwo.addEventListener('click', () => {
        window.location.href = '/enneagram-types#type-two';
    });

    btnToThree.addEventListener('click', () => {
        window.location.href = '/enneagram-types#type-three';
    });

    btnToFour.addEventListener('click', () => {
        window.location.href = '/enneagram-types#type-four';
    });

    btnToFive.addEventListener('click', () => {
        window.location.href = '/enneagram-types#type-five';
    });

    btnToSix.addEventListener('click', () => {
        window.location.href = '/enneagram-types#type-six';
    });

    btnToSeven.addEventListener('click', () => {
        window.location.href = '/enneagram-types#type-seven';
    });

    btnToEight.addEventListener('click', () => {
        window.location.href = '/enneagram-types#type-eight';
    });

    btnToNine.addEventListener('click', () => {
        window.location.href = '/enneagram-types#type-nine';
    });
});
