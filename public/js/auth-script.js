document.addEventListener('DOMContentLoaded', () => {
    const ageSelect = document.getElementById('age');
    if (ageSelect) {
        for (let i = 13; i <= 120; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i + ' yrs';
            ageSelect.appendChild(option);
        }
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm && document.getElementById('login-username')) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            handleLogin();
        });
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm && document.getElementById('signup-username')) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            handleSignup();
        });
    }

    const authLink = document.getElementById('auth-link');
    const user = getCurrentUser();

    if (authLink) {
        if (user && user.isLoggedIn) {
            authLink.textContent = 'Logout';
            authLink.href = '#';
            authLink.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
                window.location.href = '/login';
            });
        } else {
            authLink.textContent = 'Login';
            authLink.href = '/login';
        }
    }
});

const USERS_KEY = 'users';
const LOGGED_IN_USER_KEY = 'loggedInUser';

const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY)) || [];

const saveUsers = (users) =>
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

const getCurrentUsername = () => localStorage.getItem(LOGGED_IN_USER_KEY);

const getCurrentUser = () => {
    const username = getCurrentUsername();
    return getUsers().find((user) => user.username === username) || null;
};

const isUserLoggedIn = () => Boolean(getCurrentUsername());

const signup = (username, password) => {
    const users = getUsers();

    if (users.some((user) => user.username === username)) {
        return { success: false, message: 'Username already exists.' };
    }

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;

    const newUser = {
        name,
        username,
        password,
        age,
        gender,
        isLoggedIn: false,
        personality: null,
    };

    users.push(newUser);
    saveUsers(users);

    return { success: true, message: 'Signup successful!' };
};

const login = (username, password) => {
    const users = getUsers();
    const user = users.find(
        (user) => user.username === username && user.password === password
    );

    if (!user) {
        return { success: false, message: 'Invalid username or password.' };
    }

    user.isLoggedIn = true;
    saveUsers(users);
    localStorage.setItem(LOGGED_IN_USER_KEY, username);

    return { success: true, message: 'Login successful!' };
};

const logout = () => {
    const users = getUsers();
    const username = getCurrentUsername();

    const user = users.find((user) => user.username === username);
    if (user) user.isLoggedIn = false;

    localStorage.removeItem(LOGGED_IN_USER_KEY);
    saveUsers(users);
};

const handleSignup = () => {
    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value.trim();

    if (!username || !password) {
        const signUpPopup = document.createElement('div');
        signUpPopup.style.position = 'fixed';
        signUpPopup.style.top = '50%';
        signUpPopup.style.left = '50%';
        signUpPopup.style.transform = 'translate(-50%, -50%)';
        signUpPopup.style.zIndex = '9999';

        signUpPopup.style.display = 'flex';
        signUpPopup.style.justifyContent = 'center';
        signUpPopup.style.alignItems = 'center';

        signUpPopup.style.width = '50%';
        signUpPopup.style.height = '50vh';
        signUpPopup.style.padding = '20px';

        signUpPopup.style.backgroundColor = '#87c4a9';
        signUpPopup.style.border = '2px solid #111';
        signUpPopup.style.borderRadius = '4px';
        signUpPopup.style.boxShadow = '6px 6px 0px #111';

        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✖';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '5px';
        closeBtn.style.right = '10px';
        closeBtn.style.border = 'none';
        closeBtn.style.background = 'transparent';
        closeBtn.style.fontSize = '16px';
        closeBtn.style.cursor = 'pointer';

        closeBtn.addEventListener('click', () => {
            signUpPopup.remove();
        });

        const message = document.createElement('p');
        message.textContent = 'Please enter both username and password.';
        message.style.fontSize = '1.5rem';

        signUpPopup.append(closeBtn);
        signUpPopup.append(message);

        document.body.append(signUpPopup);
        return;
    }

    const result = signup(username, password);

    const signUpPopup = document.createElement('div');
    signUpPopup.style.position = 'fixed';
    signUpPopup.style.top = '50%';
    signUpPopup.style.left = '50%';
    signUpPopup.style.transform = 'translate(-50%, -50%)';
    signUpPopup.style.zIndex = '9999';

    signUpPopup.style.display = 'flex';
    signUpPopup.style.justifyContent = 'center';
    signUpPopup.style.alignItems = 'center';

    signUpPopup.style.width = '50%';
    signUpPopup.style.height = '50vh';
    signUpPopup.style.padding = '20px';

    signUpPopup.style.backgroundColor = '#87c4a9';
    signUpPopup.style.border = '2px solid #111';
    signUpPopup.style.borderRadius = '4px';
    signUpPopup.style.boxShadow = '6px 6px 0px #111';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✖';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '5px';
    closeBtn.style.right = '10px';
    closeBtn.style.border = 'none';
    closeBtn.style.background = 'transparent';
    closeBtn.style.fontSize = '16px';
    closeBtn.style.cursor = 'pointer';

    closeBtn.addEventListener('click', () => {
        signUpPopup.remove();
    });

    const message = document.createElement('p');
    message.textContent = result.message;
    message.style.fontSize = '1.5rem';

    signUpPopup.append(closeBtn);
    signUpPopup.append(message);

    document.body.append(signUpPopup);

    if (result.success) {
        setTimeout(() => {
            window.location.href = '/login';
        }, 1000);
    }
};

const handleLogin = () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const result = login(username, password);

    const loginPopup = document.createElement('div');
    loginPopup.style.position = 'fixed';
    loginPopup.style.top = '50%';
    loginPopup.style.left = '50%';
    loginPopup.style.transform = 'translate(-50%, -50%)';
    loginPopup.style.zIndex = '9999';

    loginPopup.style.display = 'flex';
    loginPopup.style.justifyContent = 'center';
    loginPopup.style.alignItems = 'center';

    loginPopup.style.width = '50%';
    loginPopup.style.height = '50vh';
    loginPopup.style.padding = '20px';

    loginPopup.style.backgroundColor = '#87c4a9';
    loginPopup.style.border = '2px solid #111';
    loginPopup.style.borderRadius = '4px';
    loginPopup.style.boxShadow = '6px 6px 0px #111';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✖';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '5px';
    closeBtn.style.right = '10px';
    closeBtn.style.border = 'none';
    closeBtn.style.background = 'transparent';
    closeBtn.style.fontSize = '16px';
    closeBtn.style.cursor = 'pointer';

    closeBtn.addEventListener('click', () => {
        loginPopup.remove();
    });

    const message = document.createElement('p');
    message.textContent = result.message;
    message.style.fontSize = '1.5rem';

    loginPopup.append(closeBtn);
    loginPopup.append(message);

    document.body.append(loginPopup);

    if (result.success) {
        setTimeout(() => {
            window.location.href = '/enneagram-test';
        }, 1000);
    }
};
