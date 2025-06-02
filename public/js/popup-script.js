// << POPUP FOR AUTHENTICATION - generate a popup with displayPopup(@param popUpMessage, options) >>
// << POPUP FOR LOGOUT CONFIRMATION - generate a popup with logoutDisplay() >>

const displayPopup = (
    popUpMessage,
    { type = 'info', duration = 3000, closable = true } = {}
) => {
    const popUp = document.createElement('div');
    popUp.id = 'popup-display';
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
    popUp.style.backgroundColor = 'var(--charcoal)';
    popUp.style.border = '1px solid var(--light-slate)';
    popUp.style.borderRadius = '2px';
    popUp.style.boxShadow = '6px 6px 0px var(--rich-black)';

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
    message.style.fontFamily = '"Jersey 25", monospace';
    message.style.textShadow = '2px 2px 0px var(--rich-black)';
    message.style.textAlign = 'center';
    message.textContent = popUpMessage;
    message.style.fontSize = '2rem';

    const textColors = {
        success: '#51d858',
        error: '#eb5b5b',
        warning: '#a89f8a',
        info: '#d1cdc3',
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
    logOutPopup.id = 'logout-display';
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

    logOutPopup.style.backgroundColor = 'var(--charcoal)';
    logOutPopup.style.border = '1px solid var(--light-slate)';
    logOutPopup.style.borderRadius = '2px';
    logOutPopup.style.boxShadow = '6px 6px 0px var(--rich-black)';

    const logOutBtn = document.createElement('button');
    logOutBtn.className = 'log-out-button';

    logOutBtn.textContent = 'Confirm';
    logOutBtn.style.width = '30%';
    logOutBtn.style.padding = '10px 20px';
    logOutBtn.style.marginTop = '5%';

    logOutBtn.style.backgroundColor = 'var(--amber-700)';
    logOutBtn.style.border = '1px solid var(--amber-500)';
    logOutBtn.style.borderRadius = '2px';
    logOutBtn.style.boxShadow = '6px 6px 0px var(--rich-black)';

    logOutBtn.style.color = 'var(--white-smoke)';
    logOutBtn.style.transition = 'all .2s ease';

    logOutBtn.style.fontFamily = '"Jersey 25", monospace';
    logOutBtn.style.textShadow = '2px 2px 0px var(--rich-black)';
    logOutBtn.style.textAlign = 'center';
    logOutBtn.style.fontSize = '1.5rem';

    logOutBtn.addEventListener('click', async () => {
        await logout();
        console.log('>> User Logout...');
        window.location.href = '/auth/login';
    });

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✖';
    closeBtn.style.color = 'var(--white-smoke)';
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
    message.style.fontFamily = '"Jersey 25", monospace';
    message.style.textShadow = '2px 2px 0px var(--rich-black)';
    message.style.textAlign = 'center';
    message.style.fontSize = '2rem';
    message.style.color = 'var(--white-smoke)';

    logOutPopup.append(closeBtn);
    logOutPopup.append(message);
    logOutPopup.append(logOutBtn);

    document.body.append(logOutPopup);
};
