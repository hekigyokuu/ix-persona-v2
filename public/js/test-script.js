// << TEST INSTRUCTION - popup that provide a detailed instruction that can be skip after 3 seconds >>
const popupInstruction = document.getElementById('popup-instruction');
const skipInstruction = document.getElementById('skip-instruction');

// << TEST INSTRUCTION POPUP >>
let timeLeft = 3;
const countdownInterval = setInterval(() => {
    timeLeft--;
    skipInstruction.textContent = `Wait ${timeLeft}s`;

    if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        skipInstruction.textContent = 'Take The Test Now';
        skipInstruction.disabled = false;
        skipInstruction.classList.add('enabled');
        skipInstruction.style.cursor = 'pointer';
    }
}, 1000);

// << TEST INSTRUCTION POPUP && SKIP BUTTON - add event listener that takes a callback for skipping and removing the instruction >>
skipInstruction.addEventListener('click', () => {
    if (!skipInstruction.disabled) {
        popupInstruction.style.display = 'none';
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
    // Type 1: The Reformer
    { text: 'Perfectionist ka ba?', typePoints: { 'The Reformer': 1 } },
    {
        text: 'Gusto mo ba ng laging maayos ang lahat?',
        typePoints: { 'The Reformer': 1 },
    },
    {
        text: 'Madali mo bang makita ang mga pagkakamali?',
        typePoints: { 'The Reformer': 1 },
    },

    // Type 2: The Helper
    {
        text: 'Tumutulong ka ba kahit pagod ka na?',
        typePoints: { 'The Helper': 1 },
    },
    {
        text: 'Gusto mong maramdamang kailangan ka?',
        typePoints: { 'The Helper': 1 },
    },
    {
        text: 'Na-touch ka ba kapag na-appreciate ka?',
        typePoints: { 'The Helper': 1 },
    },

    // Type 3: The Achiever
    {
        text: 'Mataas ba ang mga ambisyon mo?',
        typePoints: { 'The Achiever': 1 },
    },
    {
        text: 'Mahilig ka bang mag-set ng goals?',
        typePoints: { 'The Achiever': 1 },
    },
    {
        text: 'Gusto mong makita ng iba na successful ka?',
        typePoints: { 'The Achiever': 1 },
    },

    // Type 4: The Individualist
    {
        text: 'Madalas ka bang maging emosyonal o sensitibo?',
        typePoints: { 'The Individualist': 1 },
    },
    {
        text: 'Pakiramdam mo ba ay iba ka sa karamihan?',
        typePoints: { 'The Individualist': 1 },
    },
    {
        text: 'May oras ba na mas gusto mong mag-isa?',
        typePoints: { 'The Individualist': 1 },
    },

    // Type 5: The Investigator
    {
        text: 'Gusto mo bang matuto kahit walang assignment?',
        typePoints: { 'The Investigator': 1 },
    },
    {
        text: 'Mahilig ka bang mag-research tungkol sa mga interesting na topics?',
        typePoints: { 'The Investigator': 1 },
    },
    {
        text: 'Tahimik ka ba pero marami kang alam?',
        typePoints: { 'The Investigator': 1 },
    },

    // Type 6: The Loyalist
    {
        text: 'Gusto mo bang sigurado ka muna bago magdesisyon?',
        typePoints: { 'The Loyalist': 1 },
    },
    {
        text: 'Kinakabahan ka ba kapag walang klarong plano?',
        typePoints: { 'The Loyalist': 1 },
    },
    {
        text: 'Madalas ka bang mag-overthink?',
        typePoints: { 'The Loyalist': 1 },
    },

    // Type 7: The Enthusiast
    {
        text: 'Excited ka ba palagi sa mga bagong bagay?',
        typePoints: { 'The Enthusiast': 1 },
    },
    {
        text: 'Ayaw mong mabored o walang ginagawa?',
        typePoints: { 'The Enthusiast': 1 },
    },
    {
        text: 'Lagi ka bang naghahanap ng adventure?',
        typePoints: { 'The Enthusiast': 1 },
    },

    // Type 8: The Challenger
    {
        text: 'Malakas ba ang loob mo kahit may pressure?',
        typePoints: { 'The Challenger': 1 },
    },
    {
        text: 'Ayaw mo bang kinokontrol ka?',
        typePoints: { 'The Challenger': 1 },
    },
    {
        text: 'Protective ka ba sa mga mahal mo?',
        typePoints: { 'The Challenger': 1 },
    },

    // Type 9: The Peacemaker
    {
        text: 'Gusto mo ba ng katahimikan at pagkakaintindihan?',
        typePoints: { 'The Peacemaker': 1 },
    },
    {
        text: 'Iniiwasan mo ba ang conflict kahit ikaw ang tama?',
        typePoints: { 'The Peacemaker': 1 },
    },
    {
        text: 'Okay lang ba sa’yo mag-adjust para maiwasan ang gulo?',
        typePoints: { 'The Peacemaker': 1 },
    },
];

// << TYPES SCORES ARRAY OF OBJECTS - scores that is assigned into correspondong personalities >>
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

const testContainer = document.getElementById('test-questionnaire-container');
const optionsContainer = document.getElementById('test-options-container');
const testResContainer = document.getElementById('test-res');

// << INITIALIZING THE CURRENT QUESTION INDEX >>
let currentQuestion = 0;

// << GENERATING HTML QUESTIONS AND OPTIONS FOR THE CORRESPONDING TYPE/INDEX - question are based on the index of the array of questions where the options have onclick properties calling the handleAnswer(@param weight) >>
const showQuestion = (index) => {
    testContainer.innerHTML = '';
    optionsContainer.innerHTML = '';

    if (index >= testQuestions.length) {
        showResult();
        return;
    }

    const question = testQuestions[index];

    // Left side: question
    const questionDiv = document.createElement('div');
    questionDiv.className = 'test-question';
    questionDiv.innerHTML = `
        <div class="question">
            <p style="font-size: 2rem">Question ${index + 1} of ${
        testQuestions.length
    }:</p>
            <p style="font-size: 4rem";>${question.text}</p>
        </div>
    `;
    testContainer.appendChild(questionDiv);

    // Right side: options
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'test-options';
    optionsDiv.innerHTML = `
        <div class="btn-group">
            <button onclick="handleAnswer(4)" id="answer-five"><span>5</span>Strongly Agree</button>
            <button onclick="handleAnswer(3)" id="answer-four"><span>4</span>Agree</button>
            <button onclick="handleAnswer(2)" id="answer-three"><span>3</span>Neutral</button>
            <button onclick="handleAnswer(1)" id="answer-two"><span>2</span>Disagree</button>
            <button onclick="handleAnswer(0)" id="answer-one"><span>1</span>Strongly Disagree</button>
        </div>
    `;
    optionsContainer.appendChild(optionsDiv);
};

// << SCORING LOGIC - based on the weight of answer it is multiplied and the type point where distributed to specific personality >>
const handleAnswer = (weight) => {
    const question = testQuestions[currentQuestion];
    Object.keys(question.typePoints).forEach((type) => {
        scores[type] += question.typePoints[type] * weight;
    });
    currentQuestion++;
    showQuestion(currentQuestion);
};

// << TEST RESULT LOGIC - take the top scorer personality by .reduce method >>
// << TEST RESULT LOGIC - popping up the div of test result container >>
// << TEST RESULT LOGIC - removing the (hidden) class of card container and appending a text in the container >>
// << TEST RESULT LOGIC - card event listener that have a function to spin by adding class for spinning >>
// << TEST RESULT LOGIC - card event listener that have a function to spin by adding class for spinning >>
// << TEST RESULT LOGIC - ... >>
const showResult = () => {
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
    continueText.textContent = 'Tap the card to reveal personality...';
    continueText.style.position = 'absolute';
    continueText.style.bottom = '1%';
    continueText.style.left = '1%';
    continueText.style.textAlign = 'center';
    continueText.style.fontFamily = '"Jersey 25", sans-serif';
    continueText.style.fontSize = '2.2rem';
    testResContainer.append(continueText);

    card.addEventListener(
        'click',
        async () => {
            card.classList.add('spinning');
            testResContainer.classList.remove('fade-in');

            cardBack.innerHTML = `
                <div class="card-name">
                    <div class="card-type">??</div>
                </div>
                <div class="card-img"></div>
                <div class="card-brief-description"></div>
            `;

            setTimeout(async () => {
                const typeNumber = enneagramTypes[topType].split(' ')[1];
                card.classList.remove('spinning');
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

                testResContainer.classList.add(
                    'glowing',
                    `glowing-${typeNumber}`
                );
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
                    continueText.textContent = 'Tap to continue...';
                    testResContainer.style.cursor = 'pointer';

                    testResContainer.addEventListener('click', () => {
                        continueText.classList.remove('fade-in');
                        window.location.href = '/enneagram-types';
                    });
                }, 2000);
            }, 3100);
        },
        { once: true }
    );
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

// << KEYBOARD LISTENER - the user can answer the test with key (1-5) based on the weight answer >>
const keyboardOption = () => {
    const options = {
        1: 'answer-one',
        2: 'answer-two',
        3: 'answer-three',
        4: 'answer-four',
        5: 'answer-five',
    };

    document.addEventListener('keyup', (e) => {
        if (options[e.key]) {
            const testOptionButtons = document.getElementById(options[e.key]);
            if (testOptionButtons) {
                testOptionButtons.click();
            }
        }
    });
};

showQuestion(currentQuestion);
keyboardOption();
