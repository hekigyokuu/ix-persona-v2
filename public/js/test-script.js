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

// << TEST QUESTIONNAIRE ARRAY OF OBJECTS - containing a question and points that corresponds in object >>
const testQuestions = [
    // Type 1 (Reformer) vs Type 7 (Enthusiast)
    {
        statementA:
            "I have strict moral standards and get frustrated when others don't follow rules.",
        statementB:
            'I prefer keeping my options open and avoid being constrained by too many rules.',
        typePointsA: { 'The Reformer': 1 },
        typePointsB: { 'The Enthusiast': 1 },
    },

    // Type 2 (Helper) vs Type 5 (Investigator)
    {
        statementA:
            'I instinctively know what others need and often put their needs before my own.',
        statementB:
            'I need plenty of alone time to analyze things before engaging with others.',
        typePointsA: { 'The Helper': 1 },
        typePointsB: { 'The Investigator': 1 },
    },

    // Type 3 (Achiever) vs Type 9 (Peacemaker)
    {
        statementA:
            'I adapt my personality to impress others and win admiration.',
        statementB:
            "I'm content blending into the background and avoiding competition.",
        typePointsA: { 'The Achiever': 1 },
        typePointsB: { 'The Peacemaker': 1 },
    },

    // Type 4 (Individualist) vs Type 6 (Loyalist)
    {
        statementA:
            'I frequently experience deep emotions and a sense of being different from others.',
        statementB:
            'I seek security through reliable systems and trustworthy authorities.',
        typePointsA: { 'The Individualist': 1 },
        typePointsB: { 'The Loyalist': 1 },
    },

    // Type 8 (Challenger) vs Type 1 (Reformer)
    {
        statementA:
            'I take charge in crises and protect those I care about through direct action.',
        statementB:
            'I lead by setting a perfect example of how things should be done.',
        typePointsA: { 'The Challenger': 1 },
        typePointsB: { 'The Reformer': 1 },
    },

    // Type 7 (Enthusiast) vs Type 5 (Investigator)
    {
        statementA:
            'I crave new experiences and quickly move on when something gets boring.',
        statementB:
            'I immerse myself deeply in subjects that fascinate me for long periods.',
        typePointsA: { 'The Enthusiast': 1 },
        typePointsB: { 'The Investigator': 1 },
    },

    // Type 9 (Peacemaker) vs Type 3 (Achiever)
    {
        statementA:
            'I maintain peace by accommodating others and minimizing conflict.',
        statementB:
            'I push myself to achieve recognition and measurable success.',
        typePointsA: { 'The Peacemaker': 1 },
        typePointsB: { 'The Achiever': 1 },
    },

    // Type 6 (Loyalist) vs Type 8 (Challenger)
    {
        statementA: 'I prepare for worst-case scenarios to feel secure.',
        statementB: 'I confront threats head-on without hesitation.',
        typePointsA: { 'The Loyalist': 1 },
        typePointsB: { 'The Challenger': 1 },
    },

    // Type 4 (Individualist) vs Type 2 (Helper)
    {
        statementA:
            'I express my unique identity even if it makes me stand out.',
        statementB: 'I shape myself to be what others need me to be.',
        typePointsA: { 'The Individualist': 1 },
        typePointsB: { 'The Helper': 1 },
    },
    // Question 11: Type 5 vs Type 8
    {
        statementA:
            'I observe situations carefully before taking action to ensure I understand all variables.',
        statementB:
            'I trust my gut instincts and take immediate action when I see something that needs changing.',
        typePointsA: { 'The Investigator': 1 }, // Type 5
        typePointsB: { 'The Challenger': 1 }, // Type 8
    },

    // Question 12: Type 6 vs Type 9
    {
        statementA:
            "I play devil's advocate to anticipate potential problems in plans.",
        statementB: 'I focus on common ground to help groups reach consensus.',
        typePointsA: { 'The Loyalist': 1 }, // Type 6
        typePointsB: { 'The Peacemaker': 1 }, // Type 9
    },

    // Question 13: Type 2 vs Type 4
    {
        statementA: "I can quickly sense and adapt to others' emotional needs.",
        statementB:
            'I need others to recognize and appreciate my authentic self.',
        typePointsA: { 'The Helper': 1 }, // Type 2
        typePointsB: { 'The Individualist': 1 }, // Type 4
    },

    // Question 14: Type 3 vs Type 7
    {
        statementA:
            'I carefully cultivate my image to project success and competence.',
        statementB:
            'I pursue exciting opportunities without worrying about how others perceive me.',
        typePointsA: { 'The Achiever': 1 }, // Type 3
        typePointsB: { 'The Enthusiast': 1 }, // Type 7
    },

    // Question 15: Type 1 vs Type 6
    {
        statementA:
            'I have clear principles about how people should behave in different situations.',
        statementB:
            'I look to trusted authorities or systems to determine the right course of action.',
        typePointsA: { 'The Reformer': 1 }, // Type 1
        typePointsB: { 'The Loyalist': 1 }, // Type 6
    },

    // Question 16: Type 8 vs Type 2
    {
        statementA:
            'I protect vulnerable people by confronting injustice directly.',
        statementB:
            'I support vulnerable people by nurturing their emotional needs.',
        typePointsA: { 'The Challenger': 1 }, // Type 8
        typePointsB: { 'The Helper': 1 }, // Type 2
    },

    // Question 17: Type 4 vs Type 7
    {
        statementA:
            'I explore my complex emotions through creative expression.',
        statementB:
            'I avoid dwelling on negative emotions by staying busy with new activities.',
        typePointsA: { 'The Individualist': 1 }, // Type 4
        typePointsB: { 'The Enthusiast': 1 }, // Type 7
    },

    // Question 18: Type 5 vs Type 9
    {
        statementA:
            'I withdraw to process information before engaging with the world.',
        statementB: 'I go with the flow rather than overanalyzing situations.',
        typePointsA: { 'The Investigator': 1 }, // Type 5
        typePointsB: { 'The Peacemaker': 1 }, // Type 9
    },

    // Question 19: Type 3 vs Type 6
    {
        statementA:
            "I adapt my behavior to excel in whatever environment I'm in.",
        statementB:
            'I seek clear guidelines about expectations in different situations.',
        typePointsA: { 'The Achiever': 1 }, // Type 3
        typePointsB: { 'The Loyalist': 1 }, // Type 6
    },

    // Question 20: Type 1 vs Type 4
    {
        statementA:
            'I strive to meet high standards of correctness in everything I do.',
        statementB:
            'I value authentic self-expression more than getting everything perfect.',
        typePointsA: { 'The Reformer': 1 }, // Type 1
        typePointsB: { 'The Individualist': 1 }, // Type 4
    },

    // Question 21: Type 7 vs Type 9
    {
        statementA:
            'I constantly seek new experiences to stay stimulated and avoid boredom.',
        statementB:
            'I prefer familiar routines that help me maintain inner peace.',
        typePointsA: { 'The Enthusiast': 1 }, // Type 7
        typePointsB: { 'The Peacemaker': 1 }, // Type 9
    },

    // Question 22: Type 2 vs Type 8
    {
        statementA:
            'I build connections by being emotionally supportive and accommodating.',
        statementB:
            'I build connections by being direct and protecting my inner circle.',
        typePointsA: { 'The Helper': 1 }, // Type 2
        typePointsB: { 'The Challenger': 1 }, // Type 8
    },

    // Question 23: Type 5 vs Type 3
    {
        statementA: 'I develop deep expertise in niche areas that interest me.',
        statementB:
            'I develop broad competencies that help me advance in visible ways.',
        typePointsA: { 'The Investigator': 1 }, // Type 5
        typePointsB: { 'The Achiever': 1 }, // Type 3
    },

    // Question 24: Type 6 vs Type 7
    {
        statementA: 'I prepare contingency plans for potential problems.',
        statementB: 'I trust that I can improvise solutions if problems arise.',
        typePointsA: { 'The Loyalist': 1 }, // Type 6
        typePointsB: { 'The Enthusiast': 1 }, // Type 7
    },

    // Question 25: Type 9 vs Type 1
    {
        statementA:
            "I mediate conflicts by helping people understand each other's perspectives.",
        statementB:
            'I resolve conflicts by clarifying right vs. wrong behavior.',
        typePointsA: { 'The Peacemaker': 1 }, // Type 9
        typePointsB: { 'The Reformer': 1 }, // Type 1
    },

    // Question 26: Type 4 vs Type 5
    {
        statementA:
            'I express my identity through unique aesthetic choices and emotional depth.',
        statementB:
            'I express myself through intellectual pursuits and specialized knowledge.',
        typePointsA: { 'The Individualist': 1 }, // Type 4
        typePointsB: { 'The Investigator': 1 }, // Type 5
    },

    // Question 27: Type 8 vs Type 3
    {
        statementA:
            'I speak bluntly and take charge regardless of social consequences.',
        statementB:
            'I strategically present myself in ways that earn respect and admiration.',
        typePointsA: { 'The Challenger': 1 }, // Type 8
        typePointsB: { 'The Achiever': 1 }, // Type 3
    },

    // Question 28: Type 2 vs Type 7
    {
        statementA:
            'I remember important details about people to strengthen our connection.',
        statementB:
            'I enjoy meeting new people and having lighthearted fun together.',
        typePointsA: { 'The Helper': 1 }, // Type 2
        typePointsB: { 'The Enthusiast': 1 }, // Type 7
    },

    // Question 29: Type 1 vs Type 5
    {
        statementA:
            'I organize systems to ensure efficiency and moral correctness.',
        statementB:
            'I develop systems to understand complex ideas and conserve energy.',
        typePointsA: { 'The Reformer': 1 }, // Type 1
        typePointsB: { 'The Investigator': 1 }, // Type 5
    },

    // Question 30: Type 6 vs Type 4
    {
        statementA:
            'I look to traditions or reliable authorities for guidance.',
        statementB:
            "I reject conventions that don't align with my personal truth.",
        typePointsA: { 'The Loyalist': 1 }, // Type 6
        typePointsB: { 'The Individualist': 1 }, // Type 4
    },

    // Question 31: Type 9 vs Type 2
    {
        statementA: "I maintain harmony by accommodating others' preferences.",
        statementB: "I maintain connections by anticipating others' needs.",
        typePointsA: { 'The Peacemaker': 1 }, // Type 9
        typePointsB: { 'The Helper': 1 }, // Type 2
    },

    // Question 32: Type 7 vs Type 5
    {
        statementA:
            'I keep my schedule packed with diverse activities to stay engaged.',
        statementB:
            'I protect my unscheduled time for deep focus on interests.',
        typePointsA: { 'The Enthusiast': 1 }, // Type 7
        typePointsB: { 'The Investigator': 1 }, // Type 5
    },

    // Question 33: Type 3 vs Type 4
    {
        statementA:
            'I work hard to achieve recognition for my accomplishments.',
        statementB:
            'I work hard to create things that express my unique perspective.',
        typePointsA: { 'The Achiever': 1 }, // Type 3
        typePointsB: { 'The Individualist': 1 }, // Type 4
    },

    // Question 34: Type 8 vs Type 9
    {
        statementA: 'I confront problems directly to prevent future issues.',
        statementB:
            'I let minor problems go to maintain positive relationships.',
        typePointsA: { 'The Challenger': 1 }, // Type 8
        typePointsB: { 'The Peacemaker': 1 }, // Type 9
    },

    // Question 35: Type 1 vs Type 2
    {
        statementA:
            "I correct people when they're doing something wrong to help them improve.",
        statementB:
            'I support people unconditionally even when they make mistakes.',
        typePointsA: { 'The Reformer': 1 }, // Type 1
        typePointsB: { 'The Helper': 1 }, // Type 2
    },

    // Question 36: Type 5 vs Type 6
    {
        statementA:
            'I develop knowledge systems to feel prepared intellectually.',
        statementB: 'I develop safety systems to feel prepared practically.',
        typePointsA: { 'The Investigator': 1 }, // Type 5
        typePointsB: { 'The Loyalist': 1 }, // Type 6
    },
];

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
let isMuted = false;

const showResult = () => {
    if (keyboardEventListener) {
        document.removeEventListener('keyup', keyboardEventListener);
        keyboardEventListener = null;
    }
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
        '[SPACE] Click the card to reveal personality...';
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
                continueText.textContent = '[SPACE] Tap to continue...';
                testResContainer.style.cursor = 'pointer';

                const continueAction = () => {
                    continueText.classList.remove('fade-in');
                    window.location.href = '/enneagram-types';
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
function getTypeDescription(type) {
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
}

// << ASSIGNS THE SVG CODE INTO THE PERSONALITY BASED ON ITS TYPE >>
function getTypeSVG(topType) {
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
}

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

const toggleTestMute = () => {
    isMuted = !isMuted;
    const testMuteButton = document.getElementById('test-mute-toggle');
    testMuteButton.innerHTML = isMuted ? svgMuted : svgUnmuted;
    testMuteButton.classList.toggle('active', isMuted);
};

showQuestion(currentQuestion);
keyboardOption();
