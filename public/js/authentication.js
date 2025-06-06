// << PAGE LOAD (GLOBAL) - checking the session if there is and return logged in and change the function of login anchor into logout anchor >>
// << PAGE LOAD (LOGIN PAGE) - adding event listener into the svg container that shows or hide a person based on the boolean >>
window.addEventListener('DOMContentLoaded', async () => {
    const { loggedIn } = await checkSession();
    setAuthBtnState(loggedIn);

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
                svgShowPassword.style.stroke = 'var(--amber-700)';
                checked = false;
            }
        });
    }
});

// << CHECKING IF THERE IS SESSION - request GET the data from app.js >>
const checkSession = async () => {
    try {
        const sessionResponse = await fetch('/check-session', {
            credentials: 'include',
        });
        if (sessionResponse.ok) {
            const sessionData = await sessionResponse.json();
            console.log(sessionData);
            return sessionData;
        }
        return { loggedIn: false };
    } catch (err) {
        console.error('Session check failed', err);
        return { loggedIn: false };
    }
};

// << AUTHENTICATION ANCHOR : LOGIN / LOGOUT - if logout: getting a popup for confirmation >>
// << AUTHENTICATION ANCHOR : LOGIN / LOGOUT - if logout confirmed: directing into logout() >>
const authBtn = document.getElementById('auth-link');
authBtn?.addEventListener('click', async (e) => {
    if (authBtn.classList.contains('logout')) {
        e.preventDefault();

        logoutDisplay();
    } else {
        window.location.href = '/auth/login';
    }
});

// << FORM IDS AND LOGIN LINK - assigning the specific node into variable >>
const setAuthBtnState = (loggedIn) => {
    if (!authBtn) return;

    if (loggedIn) {
        authBtn.innerHTML = `Logout
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
      </svg>
      `;
        authBtn.classList.add('logout');
        authBtn.style.color = '#eb5b5b';
        authBtn.style.textShadow = '1px 1px 0px var(--rich-black)';
    } else {
        authBtn.innerHTML = `Login
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
        <polyline points="10 17 15 12 10 7"/>
        <line x1="15" y1="12" x2="3" y2="12"/>
        </svg>
        `;
        authBtn.classList.remove('logout');
        authBtn.style.color = '';
        authBtn.style.textShadow = 'none';
    }
};

// << LOGIN FUNCTION - adding event listener to a form on submit that takes the input value that is stored in data object >>
// << LOGIN FUNCTION - modifying child elements of login button as per submit >>
// << LOGIN FUNCTION - modifying content and functionality of the LOGIN anchor into LOGOUT anchor in nav GLOBALLY >>
// << LOGIN FUNCTION - stringify the data object to be a JSON that is passed in body on fetch >>
// << SIGNUP FUNCTION - request POST the data into app.js and getting its response parsed that is displayed in a popup >>
// << LOGIN FUNCTION - if success: redirect into the specified response.redirect -> /enneagram-test >>
const loginForm = document.getElementById('login-form');
loginForm?.addEventListener('submit', async (e) => {
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

        const loginResponse = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!loginResponse.ok) {
            const errorData = await loginResponse.json();
            throw new Error(
                errorData.message ||
                    `HTTP error! status: ${loginResponse.status}`
            );
        }

        const loginData = await loginResponse.json();
        setAuthBtnState(true);

        displayPopup('Login successful! Redirecting...', {
            type: 'success',
        });

        setTimeout(() => {
            window.location.href = loginData.redirect;
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

// << SIGNUP FUNCTION - adding event listener to a form on submit that takes the input value that is stored in data object >>
// << SIGNUP FUNCTION - modifying child elements of signup button as per submit >>
// << SIGNUP FUNCTION - stringify the data object to be a JSON that is passed in body on fetch >>
// << SIGNUP FUNCTION - request POST the data into app.js and getting its response parsed that is displayed in a popup >>
// << SIGNUP FUNCTION - if success: redirect into the specified response.redirect -> /auth/login >>
const signupForm = document.getElementById('signup-form');
signupForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById('name').value,
        username: document.getElementById('signup-username').value.trim(),
        password: document.getElementById('signup-password').value.trim(),
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

        const signupResponse = await fetch('/auth/create-account', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!signupResponse.ok) {
            const errorData = await signupResponse.json();
            throw new Error(errorData.message || 'Signup failed');
        }

        const signupData = await signupResponse.json();

        displayPopup('Account created! Redirecting to login...', {
            type: 'success',
        });

        setTimeout(() => {
            window.location.href = signupData.redirect;
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

// << LOGOUT FUNCTION - request POST the data into app.js and >>
// << LOGOUT FUNCTION - modifying content and functionality of the LOGOUT anchor into LOGIN anchor in nav GLOBALLY >>
// << LOGOUT FUNCTION - if success: the parsed response getting it redirect property into specified redirection -> /auth/login >>
const logout = async () => {
    try {
        const logoutResponse = await fetch('/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });

        if (!logoutResponse.ok) {
            throw new Error('Logout failed');
        }
        setAuthBtnState(false);
        const logoutData = await logoutResponse.json();
        window.location.href = logoutData.redirect;
    } catch (err) {
        console.error('Logout error:', err);
        displayPopup('Failed to logout. Please try again.', {
            type: 'error',
            duration: 2000,
        });
    }
};
