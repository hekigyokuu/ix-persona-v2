// << FORM IDS AND LOGIN LINK - assigning the specific node into variable >>
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const authLink = document.getElementById('auth-link');

// << PAGE LOAD (GLOBAL) - checking the session if there is and return logged in and change the function of login anchor into logout anchor >>
// << PAGE LOAD (LOGIN PAGE) - adding event listener into the svg container that shows or hide a person based on the boolean >>
window.addEventListener('DOMContentLoaded', async () => {
    const { loggedIn } = await checkSession();
    if (loggedIn && authLink) {
        authLink.textContent = 'Logout';
        authLink.href = '#';
        authLink.classList.add('logout');
    }

    const showPasswordContainer = document.getElementById(
        'show-password-container'
    );
    const svgShowPassword = document.querySelector('.show-icon');
    const passwordInput = document.getElementById('login-password');

    let checked = false;
    if (showPasswordContainer && svgShowPassword && passwordInput) {
        showPasswordContainer.addEventListener('click', () => {
            if (!checked) {
                passwordInput.type = 'text';
                passwordInput.focus();
                svgShowPassword.style.strokeWidth = '3px';
                svgShowPassword.style.stroke = '#fff';
                checked = true;
            } else {
                passwordInput.type = 'password';
                passwordInput.focus();
                svgShowPassword.style.strokeWidth = '2px';
                svgShowPassword.style.stroke = '#111';
                checked = false;
            }
        });
    }
});

// << CHECKING IF THERE IS SESSION - request GET the data from app.js >>
const checkSession = async () => {
    try {
        const response = await fetch('/check-session', {
            credentials: 'include',
        });
        if (response.ok) {
            const sessionResponse = await response.json();
            console.log(sessionResponse);
            return sessionResponse;
        }
        return { loggedIn: false };
    } catch (err) {
        console.error('Session check failed', err);
        return { loggedIn: false };
    }
};

// << LOGIN FUNCTION - adding event listener to a form on submit that takes the input value that is stored in data object >>
// << LOGIN FUNCTION - modifying child elements of login button as per submit >>
// << LOGIN FUNCTION - modifying content and functionality of the LOGIN anchor into LOGOUT anchor in nav GLOBALLY >>
// << LOGIN FUNCTION - stringify the data object to be a JSON that is passed in body on fetch >>
// << SIGNUP FUNCTION - request POST the data into app.js and getting its response parsed that is displayed in a popup >>
// << LOGIN FUNCTION - if success: redirect into the specified response.redirect -> /enneagram-test >>
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

            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(
                    errorResponse.message ||
                        `HTTP error! status: ${response.status}`
                );
            }

            const serverResponse = await response.json();

            if (authLink) {
                authLink.textContent = 'Logout';
                authLink.href = '#';
                authLink.classList.add('logout');
            }

            displayPopup('Login successful! Redirecting...', {
                type: 'success',
            });

            setTimeout(() => {
                window.location.href = serverResponse.redirect;
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

// << SIGNUP FUNCTION - adding event listener to a form on submit that takes the input value that is stored in data object >>
// << SIGNUP FUNCTION - modifying child elements of signup button as per submit >>
// << SIGNUP FUNCTION - stringify the data object to be a JSON that is passed in body on fetch >>
// << SIGNUP FUNCTION - request POST the data into app.js and getting its response parsed that is displayed in a popup >>
// << SIGNUP FUNCTION - if success: redirect into the specified response.redirect -> /auth/login >>
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            username: document.getElementById('signup-username').value.trim(),
            password: (passw = document
                .getElementById('signup-password')
                .value.trim()),
            confirmPassword: document
                .getElementById('confirm-signup-password')
                .value.trim(),
            age: parseInt(document.getElementById('age').value),
            gender: document.getElementById('gender').value,
        };

        const signupSubmitButton = document.getElementById('signup-button');
        const originalText = signupSubmitButton.textContent;

        try {
            signupSubmitButton.disabled = true;
            signupSubmitButton.textContent = 'Processing...';

            const response = await fetch('/auth/create-account', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Signup failed');
            }

            const serverResponse = await response.json();

            displayPopup('Account created! Redirecting to login...', {
                type: 'success',
            });

            setTimeout(() => {
                window.location.href = serverResponse.redirect;
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

// << LOGOUT FUNCTION - request POST the data into app.js and >>
// << LOGOUT FUNCTION - modifying content and functionality of the LOGOUT anchor into LOGIN anchor in nav GLOBALLY >>
// << LOGOUT FUNCTION - if success: the parsed response getting it redirect property into specified redirection -> /auth/login >>
const logout = async () => {
    try {
        const response = await fetch('/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        if (authLink) {
            authLink.textContent = 'Login';
            authLink.href = '/auth/login';
            authLink.classList.remove('logout');
        }

        const logoutResponse = await response.json();
        window.location.href = logoutResponse.redirect;
    } catch (err) {
        console.error('Logout error:', err);
        displayPopup('Failed to logout. Please try again.', {
            type: 'error',
            duration: 2000,
        });
    }
};

// << AUTHENTICATION ANCHOR : LOGIN / LOGOUT - if logout: getting a popup for confirmation >>
// << AUTHENTICATION ANCHOR : LOGIN / LOGOUT - if logout confirmed: directing into logout() >>
if (authLink) {
    authLink.addEventListener('click', async (e) => {
        if (authLink.classList.contains('logout')) {
            e.preventDefault();

            logoutDisplay();
        }
    });
}
