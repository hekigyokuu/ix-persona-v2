const popupInstruction = document.getElementById('popup-instruction');
const skipInstruction = document.getElementById('skip-instruction');
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

skipInstruction.addEventListener('click', () => {
    if (!skipInstruction.disabled) {
        popupInstruction.style.display = 'none';
        document.body.classList.remove('lock-scroll');
    }
});

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
let currentQuestion = 0;

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
            <strong>Question ${index + 1} of ${testQuestions.length}:</strong>
            <h2>${question.text}</h2>
        </div>
    `;
    testContainer.appendChild(questionDiv);

    // Right side: options
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'test-options';
    optionsDiv.innerHTML = `
        <div class="btn-group">
            <button onclick="handleAnswer(4)" id="answer-five">Strongly Agree</button>
            <button onclick="handleAnswer(3)" id="answer-four">Agree</button>
            <button onclick="handleAnswer(2)" id="answer-three">Neutral</button>
            <button onclick="handleAnswer(1)" id="answer-two">Disagree</button>
            <button onclick="handleAnswer(0)" id="answer-one">Strongly Disagree</button>
        </div>
    `;
    optionsContainer.appendChild(optionsDiv);
};

const handleAnswer = (weight) => {
    const question = testQuestions[currentQuestion];
    Object.keys(question.typePoints).forEach((type) => {
        scores[type] += question.typePoints[type] * weight;
    });
    currentQuestion++;
    showQuestion(currentQuestion);
};

const showResult = () => {
    const topType = Object.keys(scores).reduce((a, b) =>
        scores[a] > scores[b] ? a : b
    );

    const resultText = `${enneagramTypes[topType]} – ${topType}`;
    const container = document.getElementById('card-container');
    const card = document.getElementById('card');
    const cardBack = document.getElementById('card-result');

    testContainer.style.display = 'block';
    testResContainer.style.position = 'absolute';
    testResContainer.style.zIndex = '999999';
    testResContainer.style.top = '0';
    testResContainer.style.height = '100vh';
    testResContainer.style.width = '100%';
    testResContainer.style.backgroundColor = 'var(--green-darker-darker)';
    testResContainer.classList.add('fade-in');

    container.classList.remove('hidden');

    const continueText = document.createElement('p');
    continueText.textContent = 'Tap the card to reveal personality...';
    continueText.style.position = 'absolute';
    continueText.style.bottom = '1%';
    continueText.style.left = '1%';
    continueText.style.textAlign = 'center';
    continueText.style.fontFamily = '"Preahvihear", sans-serif';
    continueText.style.fontSize = '1.6rem';
    testResContainer.append(continueText);

    card.addEventListener(
        'click',
        () => {
            card.classList.add('spinning');

            cardBack.innerHTML = `
    <div class="card-name">
          <div class="card-type">??</div>
        </div>
        <div class="card-img"></div>
        <div class="card-brief-description"></div>
  `;

            setTimeout(() => {
                card.classList.remove('spinning');
                cardBack.innerHTML = `
    <div class="card-name">
          <div class="card-type">??</div>
          ${resultText}
        </div>
        <div class="card-img"></div>
        <div class="card-brief-description">lalagyan dito description dynamically based sa makukuhang types sa test and there will be anchor tag that will navigate to its type like this: KUMALALA SAVESTA</div>
  `;
                card.classList.add('flipped');

                switch (topType) {
                    case 'The Reformer':
                        card.classList.add('glowing', 'glowing-one');
                        testResContainer.classList.add(
                            'inset-glowing',
                            'glowing-one'
                        );
                        break;
                    case 'The Helper':
                        card.classList.add('glowing', 'glowing-two');
                        testResContainer.classList.add(
                            'inset-glowing',
                            'glowing-two'
                        );
                        break;
                    case 'The Achiever':
                        card.classList.add('glowing', 'glowing-three');
                        testResContainer.classList.add(
                            'inset-glowing',
                            'glowing-three'
                        );
                        break;
                    case 'The Individualist':
                        card.classList.add('glowing', 'glowing-four');
                        testResContainer.classList.add(
                            'inset-glowing',
                            'glowing-four'
                        );
                        break;
                    case 'The Investigator':
                        card.classList.add('glowing', 'glowing-five');
                        testResContainer.classList.add(
                            'inset-glowing',
                            'glowing-five'
                        );
                        break;
                    case 'The Loyalist':
                        card.classList.add('glowing', 'glowing-six');
                        testResContainer.classList.add(
                            'inset-glowing',
                            'glowing-six'
                        );
                        break;
                    case 'The Enthusiast':
                        card.classList.add('glowing', 'glowing-seven');
                        testResContainer.classList.add(
                            'inset-glowing',
                            'glowing-seven'
                        );
                        break;
                    case 'The Challenger':
                        card.classList.add('glowing', 'glowing-eight');
                        testResContainer.classList.add(
                            'inset-glowing',
                            'glowing-eight'
                        );
                        break;
                    case 'The Peacemaker':
                        card.classList.add('glowing', 'glowing-nine');
                        testResContainer.classList.add(
                            'inset-glowing',
                            'glowing-nine'
                        );
                        break;
                    default:
                        console.warn('Unknown type:', topType);
                }

                cardBack.style.display = 'flex';
                setTimeout(() => {
                    continueText.classList.add('fade-in');
                    continueText.textContent = 'Tap the continue...';
                    testResContainer.style.cursor = 'pointer';

                    testResContainer.addEventListener('click', () => {
                        continueText.classList.remove('fade-in');
                        testResContainer.classList.remove('fade-in');
                        window.location.href = '/enneagram-types';
                    });
                }, 2000);
            }, 3100);
        },
        { once: true }
    );
};

showQuestion(currentQuestion);

//answer test using keyboard
function keyboardOption() {
    const options = {
        1: 'answer-one',
        2: 'answer-two',
        3: 'answer-three',
        4: 'answer-four',
        5: 'answer-five',
    };

    const result = document.getElementById('result');

    document.addEventListener('keyup', function (event) {
        if (options[event.key]) {
            const btn = document.getElementById(options[event.key]);
            if (btn) {
                btn.click();
            }
        }
    });
}

keyboardOption();
