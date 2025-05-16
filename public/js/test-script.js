document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!loggedInUser) {
        window.location.href = '/login';
    }
});

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

const testContainer = document.getElementById('test');
const testResContainer = document.getElementById('test-res');
let currentQuestion = 0;

const showQuestion = (index) => {
    testContainer.innerHTML = '';

    if (index >= testQuestions.length) {
        showResult();
        return;
    }

    const question = testQuestions[index];
    const div = document.createElement('div');
    div.className = 'test-question';

    div.innerHTML = `
       <div>
            <strong>Question ${index + 1} of ${testQuestions.length}:</strong>
            <h2>${question.text}</h2>
        </div>
        <div class="btn-group">
            <button onclick="handleAnswer(4)">Strongly Agree</button>
            <button onclick="handleAnswer(3)">Agree</button>
            <button onclick="handleAnswer(2)">Neutral</button>
            <button onclick="handleAnswer(1)">Disagree</button>
            <button onclick="handleAnswer(0)">Strongly Disagree</button>
        </div>
    `;

    testContainer.append(div);
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
    const checkTopType = (initialType, nextType) => {
        return scores[initialType] > scores[nextType] ? initialType : nextType;
    };
    const topType = Object.keys(scores).reduce(checkTopType);

    testResContainer.innerHTML = `Your dominant Enneagram type is: <br>${enneagramTypes[topType]} – ${topType}`;
};

showQuestion(currentQuestion);
