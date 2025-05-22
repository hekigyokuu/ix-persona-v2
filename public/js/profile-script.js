// << PAGE LOAD (PROFILE PAGE) - displaying user data from the data receive from a GET request >>
// << PAGE LOAD (PROFILE PAGE) - assigning the type color and svg into the profile image container dnamically based on the user's personality extracted >>
// << RETAKE TEST BUTTON - adding onclick function the navigate into -> /enneagram-test >>
// << PROFILE LOGOUT BUTTON - adding onclick function that popup the logoutDisplay for logout confirmation >>

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/profile/api/profile');
        const userData = await response.json();

        document.getElementById('profile-username').textContent =
            userData.username;
        document.getElementById('profile-personality').textContent =
            userData.personality;
        document.getElementById(
            'profile-name'
        ).textContent = `Name: ${userData.name}`;
        document.getElementById(
            'profile-age'
        ).textContent = `Age: ${userData.age}`;
        document.getElementById(
            'profile-gender'
        ).textContent = `Gender: ${userData.gender}`;

        const typeColors = {
            1: '#7c7a7a',
            2: '#e79cc3',
            3: '#ffcb20',
            4: '#9f6ea5',
            5: '#7767a3',
            6: '#e5e591',
            7: '#ff6e21',
            8: '#ff1d1d',
            9: '#507a4e',
        };

        const svgMap = {
            1: svgReformer,
            2: svgHelper,
            3: ``,
            4: svgIndividualist,
            5: svgInvestigator,
            6: svgLoyalist,
            7: ``,
            8: ``,
            9: svgPeacemaker,
        };

        const typeMatch = userData.personality.match(/Type\s(\d+)/);

        if (typeMatch) {
            const typeNumber = typeMatch[1];
            const profileImage = document.querySelector('.profile-image');
            profileImage.innerHTML = svgMap[typeNumber];

            const color = typeColors[typeNumber];
            profileImage.style.backgroundColor = color;
        }
    } catch (err) {
        console.error('Error fetching profile:', err);
        window.location.href = '/auth/login';
        return;
    }

    const retakeTestButton = document.getElementById('profile-retake-test');

    if (retakeTestButton) {
        retakeTestButton.addEventListener('click', () => {
            window.location.href = '/enneagram-test';
        });
    }

    const profileLogout = document.getElementById('profile-logout');

    if (profileLogout) {
        profileLogout.addEventListener('click', () => {
            logoutDisplay();
        });
    }
});
