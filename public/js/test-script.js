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
    // Type 1: The Perfectionist
    { text: "Perfectionist ka ba?", typePoints: { 1: 1 } },
    { text: "Gusto mo ba ng maayos at organisado lahat?", typePoints: { 1: 1 } },
    { text: "Napapansin mo ba agad ang mali?", typePoints: { 1: 1 } },
    { text: "Strict ka ba sa sarili mo?", typePoints: { 1: 1 } },
    { text: "Ayaw mo ba ng tamad at pabaya?", typePoints: { 1: 1 } },
  
    // Type 2: The Helper
    { text: "Matulungin ka ba sa iba kahit pagod ka na?", typePoints: { 2: 1 } },
    { text: "Gusto mo bang maramdaman na kailangan ka nila?", typePoints: { 2: 1 } },
    { text: "Madali ka bang ma-touch pag na-appreciate ka?", typePoints: { 2: 1 } },
    { text: "Feeling mo ba love equals service?", typePoints: { 2: 1 } },
    { text: "Gusto mo bang lagi kang nandyan para sa iba?", typePoints: { 2: 1 } },
  
    // Type 3: The Achiever
    { text: "Gusto mo ba yumaman?", typePoints: { 3: 1 } },
    { text: "Goal-setter ka ba?", typePoints: { 3: 1 } },
    { text: "Gusto mo bang maging successful sa mata ng iba?", typePoints: { 3: 1 } },
    { text: "Madali kang ma-motivate pag may reward?", typePoints: { 3: 1 } },
    { text: "Pakiramdam mo ba dapat palagi kang productive?", typePoints: { 3: 1 } },
  
    // Type 4: The Individualist
    { text: "Sensitive ka ba?", typePoints: { 4: 1 } },
    { text: "Unique ba pakiramdam mo sa karamihan?", typePoints: { 4: 1 } },
    { text: "Emotional ka ba lalo na pag hindi ka naintindihan?", typePoints: { 4: 1 } },
    { text: "May moments ka ba na gusto mong mapag-isa?", typePoints: { 4: 1 } },
    { text: "Mas gusto mo maexpress ang feelings sa art/writing?", typePoints: { 4: 1 } },
  
    // Type 5: The Investigator
    { text: "Enjoyable ba sayo ang pag-aaral?", typePoints: { 5: 1 } },
    { text: "Gusto mong mag-research kahit walang assignment?", typePoints: { 5: 1 } },
    { text: "Tahimik ka ba pero madaming alam?", typePoints: { 5: 1 } },
    { text: "Mas gusto mong manood kaysa makipag-usap?", typePoints: { 5: 1 } },
    { text: "Na-eenjoy mong intindihin ang mga komplikado?", typePoints: { 5: 1 } },
  
    // Type 6: The Loyalist
    { text: "You always find security and worry everytime!", typePoints: { 6: 1 } },
    { text: "Gusto mo bang sure ka palagi sa decisions mo?", typePoints: { 6: 1 } },
    { text: "Mabilis kang kabahan pag walang plan?", typePoints: { 6: 1 } },
    { text: "Mahalaga sayo ang trust at loyalty?", typePoints: { 6: 1 } },
    { text: "May time ba na overthinker ka?", typePoints: { 6: 1 } },
  
    // Type 7: The Enthusiast
    { text: "Fun to be with?", typePoints: { 7: 1 } },
    { text: "Lagi kang may bagong gustong gawin?", typePoints: { 7: 1 } },
    { text: "Ayaw mo bang ma-bored o walang ganap?", typePoints: { 7: 1 } },
    { text: "Palagi kang excited sa new experiences?", typePoints: { 7: 1 } },
    { text: "Mas gusto mong tumawa kaysa magdrama?", typePoints: { 7: 1 } },
  
    // Type 8: The Challenger
    { text: "R U Sigma?", typePoints: { 8: 1 } },
    { text: "Strong ka ba emotionally kahit under pressure?", typePoints: { 8: 1 } },
    { text: "Ayaw mong kontrolin ka ng iba?", typePoints: { 8: 1 } },
    { text: "Leader ka ba kahit sa simpleng bagay?", typePoints: { 8: 1 } },
    { text: "Protective ka ba sa mga taong mahal mo?", typePoints: { 8: 1 } },
  
    // Type 9: The Peacemaker
    { text: "Gusto mo lagi peaceful at walang away?", typePoints: { 9: 1 } },
    { text: "Ayaw mo ng conflict, kahit ikaw pa ang tama?", typePoints: { 9: 1 } },
    { text: "Madali ka bang makisama kahit kanino?", typePoints: { 9: 1 } },
    { text: "Okay lang sayo mag-compromise para sa peace?", typePoints: { 9: 1 } },
    { text: "Mas gusto mong tahimik kesa ma-stress?", typePoints: { 9: 1 } }
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
        <p><strong>Question ${index + 1} of ${testQuestions.length}:</strong><br><h2>${question.text}</h2></p>
        <div class="btn-group">
            <button onclick="handleAnswer(4)">Strongly Agree</button>
            <button onclick="handleAnswer(3)">Agree</button>
            <button onclick="handleAnswer(2)">Neutral</button>
            <button onclick="handleAnswer(1)">Disagree</button>
            <button onclick="handleAnswer(0)">Strongly Disagree</button>
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

    testResContainer.innerHTML = `Your dominant Enneagram type is: <br>Type ${topType} – ${enneagramTypes[topType]}`;
}

showQuestion(currentQuestion);