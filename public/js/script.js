// NAVBAR SCRIPT
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", ()=> {
    if (window.scrollY == 0) {
        navbar.classList.remove("scrolled-navbar");
    } else {
        navbar.classList.add("scrolled-navbar");
    }
});

// CTA BUTTONS HREF LOCATOR
const ctaButtons = document.querySelectorAll(".cta-button");
ctaButtons.forEach(btn=> {
    btn.addEventListener("click", ()=> {
        window.location.href = "/test";
    });
});

// TEST FUNCTION
const enneagramTypes = {
    1: "The Reformer",
    2: "The Helper",
    3: "The Achiever",
    4: "The Individualist",
    5: "The Investigator",
    6: "The Loyalist",
    7: "The Enthusiast",
    8: "The Challenger",
    9: "The Peacemaker"
};

const testQuestions = [
    { text: "Perfectionist ka ba?", 
        typePoints: { 1: 1 } },
    { text: "Matulungin?", 
        typePoints: { 2: 1 } },
    { text: "Gusto mo ba yumaman?", 
        typePoints: { 3: 1 } },
    { text: "Sensitive ka ba?", 
        typePoints: { 4: 1 } },
    { text: "Enjoyable ba sayo pag-aaral?", 
        typePoints: { 5: 1 } },
    { text: "You always find security and worry everytme!", 
        typePoints: { 6: 1 } },
    { text: "Fun to be with?", 
        typePoints: { 7: 1 } },
    { text: "R U Sigma?", 
        typePoints: { 8: 1 } },
    { text: "Gusto mo lagi peaceful at walang away?", 
        typePoints: { 9: 1 } }
];

let currentQuestion = 0;
let scores = { 
    1: 0, 
    2: 0, 
    3: 0, 
    4: 0,
    5: 0, 
    6: 0, 
    7: 0, 
    8: 0, 
    9: 0 
};

const testContainer = document.getElementById("test");
const testResContainer = document.getElementById("test-res");

function showQuestion(index) {
    testContainer.innerHTML = "";

    if (index >= testQuestions.length) {
        showResult();
        return;
    }

    const question = testQuestions[index];
    const div = document.createElement("div");
    div.className = "test-question";

    div.innerHTML = `
        <p><strong>Question ${index + 1} of ${testQuestions.length}:</strong><br>${question.text}</p>
        <div class="btn-group">
            <button onclick="handleAnswer(0)">Strongly Disagree</button>
            <button onclick="handleAnswer(1)">Disagree</button>
            <button onclick="handleAnswer(2)">Neutral</button>
            <button onclick="handleAnswer(3)">Agree</button>
            <button onclick="handleAnswer(4)">Strongly Agree</button>
        </div>
    `;

    testContainer.append(div);
}

function handleAnswer(weight) {
    const question = testQuestions[currentQuestion];
    Object.keys(question.typePoints).forEach(type => {
        scores[type] += question.typePoints[type] * weight;
    });    
    currentQuestion++;
    showQuestion(currentQuestion);
}

  function showResult() {
    const topType = Object.keys(scores).reduce((a, b) =>
        scores[a] > scores[b] ? a : b
    );

    testResContainer.textContent = `Your dominant Enneagram type is: Type ${topType} – ${enneagramTypes[topType]}`;
}

showQuestion(currentQuestion);