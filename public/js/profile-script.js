document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/profile');
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
            1: '#b41fff',
            2: '#ff2797',
            3: '#ffcb20',
            4: '#20a6ff',
            5: '#1dfdab',
            6: '#ffff20',
            7: '#ff6e21',
            8: '#ff1d1d',
            9: '#20ffa6',
        };

        const typeMatch = data.personality.match(/Type\s(\d+)/);

        if (typeMatch) {
            const typeNumber = typeMatch[1];
            const profileImage = document.querySelector('.profile-image');

            const color = typeColors[typeNumber];
            profileImage.style.setProperty('--glow-color', color);

            profileImage.style.color = '#111';
            profileImage.style.fontWeight = 'bold';

            profileImage.classList.add('glow-animated');
        }
    } catch (err) {
        console.error('Error fetching profile:', err);
        window.location.href = '/login';
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
