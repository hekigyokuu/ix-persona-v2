// << PAGE LOAD (PROFILE PAGE) - displaying user data from the data receive from a GET request >>
// << PAGE LOAD (PROFILE PAGE) - assigning the type color and svg into the profile image container dnamically based on the user's personality extracted >>
// << RETAKE TEST BUTTON - adding onclick function the navigate into -> /enneagram-test >>
// << PROFILE LOGOUT BUTTON - adding onclick function that popup the logoutDisplay for logout confirmation >>
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const profileApiResponse = await fetch('/profile/api/profile');
        const userData = await profileApiResponse.json();

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

        const typeMatch = userData.personality.match(/Type\s(\d+)/);

        if (typeMatch) {
            const typeNumber = typeMatch[1];
            const profileImage = document.querySelector('.profile-image');
            profileImage.innerHTML = svgMap[typeNumber];

            const color = typeColors[typeNumber];
            profileImage.style.backgroundColor = color;
        }

        try {
            const historyResponse = await fetch('/enneagram-test/history');
            const historyData = await historyResponse.json();

            if (historyData.success && historyData.history.length > 0) {
                displayHistory(historyData.history);
            } else {
                document.getElementById('history-log-container').innerHTML =
                    '<p class="no-history">No test history found.</p>';
            }
        } catch (historyError) {
            console.error('Error loading history:', historyError);
            document.getElementById('history-log-container').innerHTML =
                '<p class="history-error">Error loading test history.</p>';
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

const typeColors = {
    1: '#d3d3d3',
    2: '#e2b3cb',
    3: '#e0d4ac',
    4: '#9f6ea5',
    5: '#7767a3',
    6: '#e5e591',
    7: '#a8c6cf',
    8: '#b45b5b',
    9: '#9eb99c',
};

const svgMap = {
    1: svgReformer,
    2: svgHelper,
    3: svgAchiever,
    4: svgIndividualist,
    5: svgInvestigator,
    6: svgLoyalist,
    7: svgEnthusiast,
    8: svgChallenger,
    9: svgPeacemaker,
};

function displayHistory(history) {
    const container = document.getElementById('history-log-container');
    container.innerHTML = '';

    history.forEach((item) => {
        const historyLogItem = document.createElement('div');
        historyLogItem.className = 'history-log-item';

        const date = new Date(item.takenAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

        const typeMatch = item.personality.match(/Type\s(\d+)/);
        const typeNumber = typeMatch ? typeMatch[1] : null;
        const typeColor = typeColors[typeNumber] || '#ccc';

        historyLogItem.innerHTML = `
            <span class="personality" style="color: ${typeColor}; font-weight: 400;">
                ${item.personality}
            </span>
            <span class="date">${date}</span>
        `;

        container.appendChild(historyLogItem);
    });
}
