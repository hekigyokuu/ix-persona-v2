const displayPopup = (popUpMessage, options = {}) => {
    const {
        type = 'info', // 'success' | 'error' | 'warning' | 'info'
        duration = 3000, // ms (0 = no auto-close)
        closable = true, // Show close button
    } = options;

    const popUp = document.createElement('div');
    popUp.style.position = 'fixed';
    popUp.style.top = '50%';
    popUp.style.left = '50%';
    popUp.style.transform = 'translate(-50%, -50%)';
    popUp.style.zIndex = '9999';
    popUp.style.display = 'flex';
    popUp.style.justifyContent = 'center';
    popUp.style.alignItems = 'center';
    popUp.style.width = '50%';
    popUp.style.maxWidth = '1920px';
    popUp.style.height = '50vh';
    popUp.style.padding = '20px';
    popUp.style.backgroundColor = '#87c4a9';
    popUp.style.border = '2px solid #111';
    popUp.style.borderRadius = '4px';
    popUp.style.boxShadow = '6px 6px 0px #111';

    if (closable) {
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
            popUp.remove();
        });
        popUp.appendChild(closeBtn);
    }

    const message = document.createElement('p');
    message.textContent = popUpMessage;
    message.style.fontSize = '1.5rem';

    const textColors = {
        success: '#1d5c20',
        error: '#a81a1a',
        warning: '#a89f8a',
        info: '#0a0a0a',
    };
    message.style.color = textColors[type] || textColors.info;

    popUp.appendChild(message);

    document.body.appendChild(popUp);

    if (duration > 0) {
        setTimeout(() => {
            popUp.remove();
        }, duration);
    }

    return popUp;
};

const logoutDisplay = () => {
    const logOutPopup = document.createElement('div');
    logOutPopup.style.position = 'fixed';
    logOutPopup.style.top = '50%';
    logOutPopup.style.left = '50%';
    logOutPopup.style.transform = 'translate(-50%, -50%)';
    logOutPopup.style.zIndex = '9999';

    logOutPopup.style.display = 'flex';
    logOutPopup.style.flexDirection = 'column';
    logOutPopup.style.justifyContent = 'center';
    logOutPopup.style.alignItems = 'center';

    logOutPopup.style.width = '50%';
    logOutPopup.style.maxWidth = '1920px';
    logOutPopup.style.height = '50vh';
    logOutPopup.style.padding = '20px';

    logOutPopup.style.backgroundColor = '#87c4a9';
    logOutPopup.style.border = '2px solid #111';
    logOutPopup.style.borderRadius = '4px';
    logOutPopup.style.boxShadow = '6px 6px 0px #111';

    const logOutBtn = document.createElement('button');

    logOutBtn.className = 'log-out-button';

    logOutBtn.textContent = 'Confirm';
    logOutBtn.style.width = '30%';
    logOutBtn.style.padding = '10px 20px';
    logOutBtn.style.marginTop = '5%';

    logOutBtn.style.backgroundColor = '#275e47';
    logOutBtn.style.border = '2px solid #111';
    logOutBtn.style.borderRadius = '4px';
    logOutBtn.style.boxShadow = '4px 4px 0px #2c2c2c';

    logOutBtn.style.fontFamily = '"Potta One", sans-serif';
    logOutBtn.style.fontSize = '1.2rem';
    logOutBtn.style.color = '#87c4a9';
    logOutBtn.style.transition = 'all .2s ease';

    logOutBtn.addEventListener('click', async () => {
        await logout();
        console.log('>> User Logout...');
        window.location.href = '/auth/login';
    });

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
        logOutPopup.remove();
    });

    const message = document.createElement('p');
    message.textContent = 'Are you sure logging out?';
    message.style.fontSize = '1.5rem';

    logOutPopup.append(closeBtn);
    logOutPopup.append(message);
    logOutPopup.append(logOutBtn);

    document.body.append(logOutPopup);
};
