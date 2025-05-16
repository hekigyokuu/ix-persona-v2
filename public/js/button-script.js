document.addEventListener('DOMContentLoaded', () => {
    const user = getCurrentUser();

    const ctaButtons = document.querySelectorAll('.cta-button');
    const takeTest = document.getElementById('take-test-nav');

    takeTest.href = user && user.isLoggedIn ? '/enneagram-test' : '/login';

    ctaButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            if (user && user.isLoggedIn)
                window.location.href = '/enneagram-test';
            else window.location.href = '/login';
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

    const toggleBtn = document.getElementById('toggle-profile-btn');
    const profileDiv = document.getElementById('personal-profile');

    if (toggleBtn && profileDiv) {
        toggleBtn.addEventListener('click', () => {
            const user = getCurrentUser();
            if (!user) {
                window.location.href = '/login';
                return;
            }

            profileDiv.classList.toggle('hidden');
            if (!profileDiv.classList.contains('hidden')) {
                displayProfile();
            }

            document
                .querySelector('.close-personal-profile')
                .addEventListener('click', () => {
                    profileDiv.classList.add('hidden');
                });
        });
    }
});

function displayProfile() {
    const user = getCurrentUser();
    if (!user) return;

    const profileDiv = document.getElementById('personal-profile');
    if (!profileDiv) return;

    const usernameText = document.getElementById('profile-username');
    const personalityText = document.getElementById('profile-personality');
    const personalDetailsDiv = document.querySelector('.personal-details');
    const nameText = document.getElementById('profile-name');
    const ageText = document.getElementById('profile-age');
    const genderText = document.getElementById('profile-gender');
    const closeButton = document.querySelector('.close-personal-profile');

    personalityText.textContent = user.personality || 'Not determined yet';
    usernameText.textContent = user.username || 'Unknown';
    nameText.textContent = user.name || 'Not specified';
    ageText.textContent = user.age ? `${user.age} yrs` : 'Not specified';
    genderText.textContent = user.gender || 'Not specified';

    switch (user.personality) {
        case 'The Reformer':
            usernameText.style.color = '#e6d6f2';
            personalityText.style.color = '#e6d6f2';
            profileDiv.style.backgroundColor = '#4a148c';
            personalDetailsDiv.style.border = '2px dashed #e6d6f2';
            personalDetailsDiv.style.color = '#e6d6f2';
            closeButton.style.color = '#e6d6f2';
            break;
        case 'The Helper':
            usernameText.style.color = '#fbe4e4';
            personalityText.style.color = '#fbe4e4';
            profileDiv.style.backgroundColor = '#880e4f';
            personalDetailsDiv.style.border = '2px dashed #fbe4e4';
            personalDetailsDiv.style.color = '#fbe4e4';
            closeButton.style.color = '#fbe4e4';
            break;
        case 'The Achiever':
            usernameText.style.color = '#fff6cc';
            personalityText.style.color = '#fff6cc';
            profileDiv.style.backgroundColor = '#ff6f00';
            personalDetailsDiv.style.border = '2px dashed #fff6cc';
            personalDetailsDiv.style.color = '#fff6cc';
            closeButton.style.color = '#fff6cc';
            break;
        case 'The Individualist':
            usernameText.style.color = '#ddeeff';
            personalityText.style.color = '#ddeeff';
            profileDiv.style.backgroundColor = '#0d47a1';
            personalDetailsDiv.style.border = '2px dashed #ddeeff';
            personalDetailsDiv.style.color = '#ddeeff';
            closeButton.style.color = '#ddeeff';
            break;
        case 'The Investigator':
            usernameText.style.color = '#e8eaf6';
            personalityText.style.color = '#e8eaf6';
            profileDiv.style.backgroundColor = '#303f9f';
            personalDetailsDiv.style.border = '2px dashed #e8eaf6';
            personalDetailsDiv.style.color = '#e8eaf6';
            closeButton.style.color = '#e8eaf6';
            break;
        case 'The Loyalist':
            usernameText.style.color = '#d0e7ff';
            personalityText.style.color = '#d0e7ff';
            profileDiv.style.backgroundColor = '#0d47a1';
            personalDetailsDiv.style.border = '2px dashed #d0e7ff';
            personalDetailsDiv.style.color = '#d0e7ff';
            closeButton.style.color = '#d0e7ff';
            break;
        case 'The Enthusiast':
            usernameText.style.color = '#fff4d6';
            personalityText.style.color = '#fff4d6';
            profileDiv.style.backgroundColor = '#e65100';
            personalDetailsDiv.style.border = '2px dashed #fff4d6';
            personalDetailsDiv.style.color = '#fff4d6';
            closeButton.style.color = '#fff4d6';
            break;
        case 'The Challenger':
            usernameText.style.color = '#fcdada';
            personalityText.style.color = '#fcdada';
            profileDiv.style.backgroundColor = '#b71c1c';
            personalDetailsDiv.style.border = '2px dashed #fcdada';
            personalDetailsDiv.style.color = '#fcdada';
            closeButton.style.color = '#fcdada';
            break;
        case 'The Peacemaker':
            usernameText.style.color = '#dbf7e4';
            personalityText.style.color = '#dbf7e4';
            profileDiv.style.backgroundColor = '#1b5e20';
            personalDetailsDiv.style.border = '2px dashed #dbf7e4';
            personalDetailsDiv.style.color = '#dbf7e4';
            closeButton.style.color = '#dbf7e4';
            break;
        default:
            profileDiv.style.backgroundColor = '#f0f0f0';
            personalityText.style.color = '#444';
            usernameText.style.color = '#222';
            personalDetailsDiv.style.border = '2px dashed #ccc';
            personalDetailsDiv.style.color = '#444';
            closeButton.style.color = '#444';
    }
}
