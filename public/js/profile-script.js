document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/profile/api/profile');
        const data = await response.json();

        document.getElementById('profile-username').textContent = data.username;
        document.getElementById('profile-personality').textContent =
            data.personality;
        document.getElementById(
            'profile-name'
        ).textContent = `Name: ${data.name}`;
        document.getElementById('profile-age').textContent = `Age: ${data.age}`;
        document.getElementById(
            'profile-gender'
        ).textContent = `Gender: ${data.gender}`;

        const typeColors = {
            1: '#7c7a7a',
            2: '#ff2797',
            3: '#ffcb20',
            4: '#20a6ff',
            5: '#1dfdab',
            6: '#ffff20',
            7: '#ff6e21',
            8: '#ff1d1d',
            9: '#20ffa6',
        };

        const svgMap = {
            1: svgReformer,
            2: ``,
            3: ``,
            4: ``,
            5: ``,
            6: ``,
            7: ``,
            8: ``,
            9: ``,
        };

        const typeMatch = data.personality.match(/Type\s(\d+)/);

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

    document
        .getElementById('profile-retake-test')
        .addEventListener('click', () => {
            window.location.href = '/enneagram-test';
        });

    document.getElementById('profile-logout').addEventListener('click', () => {
        logoutDisplay();
    });
});
