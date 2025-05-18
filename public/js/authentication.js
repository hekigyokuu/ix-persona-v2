const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const authLink = document.getElementById('auth-link');

window.addEventListener('DOMContentLoaded', async function checkSession() {
    try {
        const res = await fetch('/session', { credentials: 'include' });
        if (res.ok) {
            const session = await res.json();

            if (session.loggedIn) {
                authLink.textContent = 'Logout';
                authLink.href = '#';
                authLink.classList.add('logout');

                return session.loggedIn;
            }
        }
    } catch (err) {
        console.error('Session check failed', err);
    }
});

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            username: document.getElementById('login-username').value,
            password: document.getElementById('login-password').value,
        };

        const loginSubmitButton = document.getElementById('login-button');
        const originalText = loginSubmitButton.textContent;

        try {
            loginSubmitButton.disabled = true;
            loginSubmitButton.textContent = 'Processing...';

            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message ||
                        `HTTP error! status: ${response.status}`
                );
            }

            const result = await response.json();

            if (authLink) {
                authLink.textContent = 'Logout';
                authLink.href = '#';
                authLink.classList.add('logout');
            }

            displayPopup('Login successful! Redirecting...', {
                type: 'success',
            });

            setTimeout(() => {
                window.location.href = result.redirect;
            }, 1500);
        } catch (err) {
            displayPopup(`Error: ${err.message}`, {
                type: 'error',
                duration: 1500,
            });
        } finally {
            loginSubmitButton.disabled = false;
            loginSubmitButton.textContent = originalText;
        }
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fullName = document.getElementById('name').value;
        const usern = document.getElementById('signup-username').value.trim();
        const passw = document.getElementById('signup-password').value.trim();
        const confirmPassword = document
            .getElementById('confirm-signup-password')
            .value.trim();
        const userAge = parseInt(document.getElementById('age').value);
        const userGender = document.getElementById('gender').value;

        if (!usern || !passw) {
            displayPopup('Please enter both username and password.', {
                type: 'error',
            });
            return;
        }

        if (passw.length < 8) {
            displayPopup('Password must have at least 8 characters.', {
                type: 'error',
            });
            return;
        }

        if (!/[A-Z]/.test(passw) || !/[0-9]/.test(passw)) {
            displayPopup(
                'Password needs at least 1 number and 1 uppercase letter',
                {
                    type: 'error',
                }
            );
            return;
        }

        if (!/[!@#$%^&*]/.test(passw)) {
            displayPopup('Password needs at least 1 special character', {
                type: 'error',
            });
            return;
        }

        if (passw !== confirmPassword) {
            displayPopup("Passwords don't match.", { type: 'error' });
            return;
        }

        if (!userAge || userAge < 13) {
            displayPopup('Enter your age (13yrs old or above).', {
                type: 'error',
            });
            return;
        }

        const data = {
            name: fullName,
            username: usern,
            password: passw,
            age: userAge,
            gender: userGender,
        };

        const signupSubmitButton = document.getElementById('signup-button');
        const originalText = signupSubmitButton.textContent;

        try {
            signupSubmitButton.disabled = true;
            signupSubmitButton.textContent = 'Processing...';

            const response = await fetch('/create-account', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Signup failed');
            }

            const result = await response.json();

            displayPopup('Account created! Redirecting to login...', {
                type: 'success',
            });

            setTimeout(() => {
                window.location.href = result.redirect;
            }, 1500);
        } catch (err) {
            console.error('Signup error:', err);
            displayPopup(`Error: ${err.message}`, {
                type: 'error',
                duration: 2000,
            });
        } finally {
            signupSubmitButton.disabled = false;
            signupSubmitButton.textContent = originalText;
        }
    });
}

const logout = async () => {
    try {
        const response = await fetch('/logout', {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        if (authLink) {
            authLink.textContent = 'Login';
            authLink.href = '/login';
            authLink.classList.remove('logout');
        }

        window.location.href = '/login';
    } catch (err) {
        console.error('Logout error:', err);
        displayPopup('Failed to logout. Please try again.', {
            type: 'error',
            duration: 2000,
        });
    }
};

if (authLink) {
    authLink.addEventListener('click', async (e) => {
        if (authLink.classList.contains('logout')) {
            e.preventDefault();

            logoutDisplay();
        }
    });
}
