let isMuted = false;
// << TEST INSTRUCTION - popup that provide a detailed instruction that can be skip after 3 seconds >>

// << TEST INSTRUCTION POPUP >>
let instructionButtonTimeLeft = 3;
const skipInstruction = document.getElementById('skip-instruction');
const countdownInterval = setInterval(() => {
    instructionButtonTimeLeft--;
    skipInstruction.textContent = `Wait ${instructionButtonTimeLeft}s`;

    if (instructionButtonTimeLeft <= 0) {
        clearInterval(countdownInterval);
        skipInstruction.textContent = 'Take The Test Now';
        skipInstruction.disabled = false;
        skipInstruction.classList.add('enabled');
        skipInstruction.style.cursor = 'pointer';
    }
}, 1000);

// << TEST INSTRUCTION POPUP && SKIP BUTTON - add event listener that takes a callback for skipping and removing the instruction >>
const enneagramPopupInstruction = document.getElementById('popup-instruction');
skipInstruction.addEventListener('click', () => {
    if (!skipInstruction.disabled) {
        enneagramPopupInstruction.style.display = 'none';
        document.body.classList.remove('lock-scroll');
        enableKeyboard(); // Enable keyboard when skipping instructions
    }
});

// << ENNEAGRAM TYPES OBJECT - personalities with their corresponding types >>
const enneagramTypes = {
    'The Reformer': 'Type 1',
    'The Helper': 'Type 2',
    'The Achiever': 'Type 3',
    'The Individualist': 'Type 4',
    'The Investigator': 'Type 5',
    'The Loyalist': 'Type 6',
    'The Enthusiast': 'Type 7',
    'The Challenger': 'Type 8',
    'The Peacemaker': 'Type 9',
};

// << TYPES SCORES ARRAY OF OBJECTS - scores that is assigned into correspondiing personalities >>
let scores = {
    'The Reformer': 0,
    'The Helper': 0,
    'The Achiever': 0,
    'The Individualist': 0,
    'The Investigator': 0,
    'The Loyalist': 0,
    'The Enthusiast': 0,
    'The Challenger': 0,
    'The Peacemaker': 0,
};

const optionsContainer = document.getElementById('test-options-container');
const testResContainer = document.getElementById('test-res');
const testContainer = document.getElementById('test-questionnaire-container');

// << INITIALIZING THE CURRENT QUESTION INDEX >>
let currentQuestion = 0;

// << GENERATING HTML QUESTIONS AND OPTIONS FOR THE CORRESPONDING TYPE/INDEX - question are based on the index of the array of questions where the options have onclick properties calling the handleAnswer(@param weight) >>
let keyboardEventListener = null;
const showQuestion = (index) => {
    testContainer.innerHTML = '';
    optionsContainer.innerHTML = '';

    if (index >= testQuestions.length) {
        showResult();
        return;
    }

    const question = testQuestions[index];

    const questionDiv = document.createElement('div');
    questionDiv.className = 'test-question';
    questionDiv.innerHTML = `
        <div class="question">
            <p id="question-num">Question ${index + 1} of ${
        testQuestions.length
    }:</p>
            <p id="statement-a">${question.statementA}</p>
            <p id="separator-statement">OR</p>
            <p id="statement-b">${question.statementB}</p>
        </div>
    `;
    testContainer.append(questionDiv);

    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'test-options';
    optionsDiv.innerHTML = `
        <div class="btn-group">
            <button id="answer-a" onclick="handleAnswer('A')"><span>A</span>Select A</button>
            <button id="answer-b" onclick="handleAnswer('B')"><span>B</span>Select B</button>
            <button id="undo-button" class="undo-btn hidden" onclick="undoLastAnswer()">
                <span>U</span>↩ Undo
            </button>
        </div>
    `;
    optionsContainer.append(optionsDiv);

    updateUndoButtonVisibility();
};

// << SCORING LOGIC - based on the weight of answer it is multiplied and the type point where distributed to specific personality >>
let answerHistory = [];

const handleAnswer = (choice) => {
    console.log(scores);
    clickSFX();
    const question = testQuestions[currentQuestion];

    answerHistory.push({
        currentQuestion: currentQuestion,
        scores: { ...scores },
        choice: choice,
    });

    if (choice === 'A') {
        Object.keys(question.typePointsA).forEach((type) => {
            scores[type] += question.typePointsA[type];
        });
    } else if (choice === 'B') {
        Object.keys(question.typePointsB).forEach((type) => {
            scores[type] += question.typePointsB[type];
        });
    }

    currentQuestion++;
    showQuestion(currentQuestion);
};

const undoLastAnswer = () => {
    clickSFX();
    if (answerHistory.length === 0) return;

    const lastAnswer = answerHistory.pop();
    currentQuestion = lastAnswer.currentQuestion;
    scores = { ...lastAnswer.scores };

    showQuestion(currentQuestion);
};

const updateUndoButtonVisibility = () => {
    const undoButton = document.getElementById('undo-button');
    if (undoButton) {
        undoButton.classList.toggle('hidden', answerHistory.length === 0);
    }
};

// << TEST RESULT LOGIC - take the top scorer personality by .reduce method >>
// << TEST RESULT LOGIC - popping up the div of test result container >>
// << TEST RESULT LOGIC - removing the (hidden) class of card container and appending a text in the container >>
// << TEST RESULT LOGIC - card event listener that have a function to spin by adding class for spinning >>
// << TEST RESULT LOGIC - card event listener that have a function to spin by adding class for spinning >>
// << TEST RESULT LOGIC - ... >>

const showResult = () => {
    disableKeyboard();
    const topType = Object.keys(scores).reduce((a, b) =>
        scores[a] > scores[b] ? a : b
    );

    const resultText = `${enneagramTypes[topType]} – ${topType}`;
    const container = document.getElementById('card-container');
    const card = document.getElementById('card');
    const cardBack = document.getElementById('card-result');

    testResContainer.style.display = 'block';
    testResContainer.style.position = 'absolute';
    testResContainer.style.zIndex = '999999';
    testResContainer.style.top = '0';
    testResContainer.style.height = '100vh';
    testResContainer.style.width = '100%';
    testResContainer.style.backgroundColor = 'var(--rich-black)';
    testResContainer.classList.add('fade-in');

    container.classList.remove('hidden');

    const continueText = document.createElement('p');
    continueText.id = 'continue-text';
    continueText.textContent =
        '[ SPACE ] Click the card to reveal personality...';
    continueText.style.position = 'absolute';
    continueText.style.bottom = '1%';
    continueText.style.left = '1%';
    continueText.style.textAlign = 'center';
    continueText.style.fontFamily = '"Jersey 25", sans-serif';
    continueText.style.fontSize = '2.2rem';
    testResContainer.append(continueText);

    // Function to handle card reveal
    const revealCard = async () => {
        const flippingAudio = new Audio('sfx/flipping.wav');
        flippingAudio.playbackRate = 1.1;
        if (!isMuted) flippingAudio.play();
        card.classList.add('spinning');
        testResContainer.classList.remove('fade-in');
        console.log(isMuted);

        cardBack.innerHTML = `
            <div class="card-name">
                <div class="card-type">??</div>
            </div>
            <div class="card-img"></div>
            <div class="card-brief-description"></div>
        `;

        const isRevealMuted = isMuted;
        setTimeout(async () => {
            flippingAudio.pause();
            flippingAudio.remove();
            const typeNumber = enneagramTypes[topType].split(' ')[1];
            const revealCardAudio = new Audio('sfx/reveal.wav');
            card.classList.remove('spinning');

            if (!isRevealMuted)
                revealCardAudio.play().then(() => revealCardAudio.remove());

            cardBack.innerHTML = `
                <div class="card-name">
                    <div class="card-type" id="card-type-container">${typeNumber}</div>
                    ${topType}
                </div>
                <div class="card-img" id="card-img-container"></div>
                <div class="card-brief-description" id="card-description-container">
                    ${getTypeDescription(topType)}
                </div>
            `;
            const cardTypeContainer = document.getElementById(
                'card-type-container'
            );
            const cardImgContainer =
                document.getElementById('card-img-container');
            cardImgContainer.innerHTML = getTypeSVG(topType);
            card.classList.add('flipped');

            testResContainer.classList.add('glowing', `glowing-${typeNumber}`);
            continueText.style.color = 'var(--charcoal)';
            continueText.style.textShadow = '2px 2px 0px var(--rich-black)';
            cardTypeContainer.classList.add(
                'card-type-color',
                `glowing-${typeNumber}`
            );
            cardImgContainer.classList.add(
                'inset-glowing',
                `glowing-${typeNumber}`
            );
            void card.offsetWidth;

            try {
                const saveResponse = await fetch(
                    '/enneagram-test/save-test-result',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ personality: resultText }),
                    }
                );

                const saveData = await saveResponse.json();
                if (!saveData.success) {
                    console.error('Failed to save test result');
                }

                const historyResponse = await fetch(
                    '/enneagram-test/log-history',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ personality: resultText }),
                    }
                );

                const historyData = await historyResponse.json();
                if (!historyData.success) {
                    console.error('Failed to log test history');
                }
            } catch (error) {
                console.error('Error saving test result:', error);
            }

            setTimeout(() => {
                continueText.classList.add('fade-in');
                continueText.textContent = '[ SPACE ] Tap to continue...';
                testResContainer.style.cursor = 'pointer';

                const continueAction = () => {
                    continueText.classList.remove('fade-in');
                    window.location.href = '/profile';
                };

                testResContainer.addEventListener('click', continueAction, {
                    once: true,
                });

                const handleKeyPress = (e) => {
                    if (e.key === ' ') {
                        document.removeEventListener('keydown', handleKeyPress);
                        continueAction();
                    }
                };
                document.addEventListener('keydown', handleKeyPress);
            }, 2000);
        }, 3100);
    };

    card.addEventListener('click', revealCard, { once: true });

    const handleInitialKeyPress = (e) => {
        if (e.key === ' ') {
            document.removeEventListener('keydown', handleInitialKeyPress);
            revealCard();
        }
    };
    document.addEventListener('keydown', handleInitialKeyPress);
};

// << ASSIGNS THE DESCRIPTION INTO THE PERSONALITY BASED ON ITS TYPE >>
const getTypeDescription = (type) => {
    const descriptions = {
        'The Reformer':
            'Rational and idealistic, principled, purposeful, self-controlled, and perfectionistic.',
        'The Helper':
            'Caring, generous, people-pleasing, possessive, and demonstrative.',
        'The Achiever':
            'Success-oriented, pragmatic, adaptive, excelling, driven, and image-conscious.',
        'The Individualist':
            'Expressive, dramatic, self-absorbed, and temperamental.',
        'The Investigator':
            'Intense, cerebral, perceptive, innovative, secretive, and isolated.',
        'The Loyalist': 'Engaging, responsible, anxious, and suspicious.',
        'The Enthusiast':
            'Spontaneous, versatile, distractible, and scattered.',
        'The Challenger':
            'Self-confident, decisive, willful, and confrontational.',
        'The Peacemaker': 'Receptive, reassuring, agreeable, and complacent.',
    };
    return descriptions[type] || 'Discover more about your personality type.';
};

// << ASSIGNS THE SVG CODE INTO THE PERSONALITY BASED ON ITS TYPE >>
const getTypeSVG = (topType) => {
    const svgMap = {
        'The Reformer': svgReformer,
        'The Helper': svgHelper,
        'The Achiever': svgAchiever,
        'The Individualist': svgIndividualist,
        'The Investigator': svgInvestigator,
        'The Loyalist': svgLoyalist,
        'The Enthusiast': svgEnthusiast,
        'The Challenger': svgChallenger,
        'The Peacemaker': svgPeacemaker,
    };

    return svgMap[topType] || '';
};

const clickSFX = () => {
    if (isMuted) return;

    const clickAudio = new Audio('sfx/click.wav');
    clickAudio.play().then(() => clickAudio.remove());
};

// << KEYBOARD LISTENER - the user can answer the test with key (1-5) based on the weight answer >>
const keyboardOption = () => {
    if (keyboardEventListener) {
        document.removeEventListener('keyup', keyboardEventListener);
    }

    keyboardEventListener = (e) => {
        if (e.key === 'a' || e.key === 'A') {
            handleAnswer('A');
        } else if (e.key === 'b' || e.key === 'B') {
            handleAnswer('B');
        } else if (e.key === 'u' || e.key === 'U') {
            undoLastAnswer();
        }
    };

    document.addEventListener('keyup', keyboardEventListener);
};

const disableKeyboard = () => {
    if (keyboardEventListener) {
        document.removeEventListener('keyup', keyboardEventListener);
        keyboardEventListener = null;
    }
};

const enableKeyboard = () => {
    if (!keyboardEventListener) {
        keyboardOption();
    }
};

const toggleTestMute = () => {
    isMuted = !isMuted;
    const testMuteButton = document.getElementById('test-mute-toggle');
    testMuteButton.innerHTML = isMuted ? svgMuted : svgUnmuted;
    testMuteButton.classList.toggle('active', isMuted);
};

showQuestion(currentQuestion);
keyboardOption();
disableKeyboard();
