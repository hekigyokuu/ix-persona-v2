document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/profile');
        const data = await response.json();
        document.getElementById('profile-name').textContent = data.name;
        document.getElementById('profile-username').textContent = data.username;
        document.getElementById('profile-age').textContent = data.age;
        document.getElementById('profile-gender').textContent = data.gender;
        document.getElementById('profile-personality').textContent =
            data.personality;
    } catch (err) {
        console.error('Error fetching profile:', err);
        window.location.href = '/login';
    }

    document
        .getElementById('profile-retake-test')
        .addEventListener('click', () => {
            window.location.href = '/enneagram-test';
        });

    document
        .getElementById('profile-logout')
        .addEventListener('click', async () => {
            try {
                const response = await fetch('/logout', {
                    method: 'POST',
                });
                const data = response.json();
                if (data.success) {
                    window.location.href = '/login';
                }
            } catch (err) {
                console.error('Error logging out profile:', err);
            }
        });
});
