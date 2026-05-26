//detta styckehindrar folk från att utföra
//xss attacker genom att  ta bort tecken som <>
//samt att den gör text till små bokstäver och tar bort mellanslag

function sanitize(text) {
    return text
        .toLowerCase()
        .replace(/</g, "")
        .replace(/>/g, "")
        .trim(); 
}


//detta är en lista av frågor och svar
//varje fråga har själva frågan och svarsalternativ och det korrekta svaret  

const questions = [
    {
        questions: "Vad är derivatan till x^2?",
        answers:[
            {text: "2x", correct: true},
            {text: "x^2", correct: false},
            {text: "x", correct: false},
            {text: "2", correct: false}
        ]
    }, 

    {
       questions: "Vad är den primitiva funktionen till 3x^2?",
        answers:[
            {text: "x^3", correct: false},
            {text: "x^3/3", correct: false},
            {text: "x^3/2", correct: false},
            {text: "x^3/3 + C", correct: true}
        ] 
    }, 

    {
       questions: "Vad är derivatan till 10x^3?",
        answers:[
            {text: "30x^2", correct: true},
            {text: "10x^2", correct: false},
            {text: "10x^3", correct: false},
            {text: "30x^3", correct: false}
        ] 
    }, 

    {
       questions: "Vad är den primitiva funktionen till 5x^4?",
        answers:[
            {text: "x^5", correct: false},
            {text: "x^5/5", correct: false},
            {text: "x^5/4", correct: false},
            {text: "x^5/5 + C", correct: true}
        ] 
    }
];

//dessa hämtar html element från html filen så att man kan ändra på dem i javascripten

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

//dessa är variabler som håller koll på vilken fråga man är på och hur mnycket poäng man har.

let currentQuestionIndex = 0;
let score = 0;

//detta stycke startar quizet genom att återställa själva frågan man är på så att man hamnar på första 
//frågan och att poängen återställs, den ändrar även namnet på knappen i htmnl till  next och sedan
//visar första frågan. 


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

//denna visar den frågan man är på samt svaren men sedan rensas gamlasvar 
//och den hämtar den nya frågan och svar från listan reptetererwar

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.questions; 

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;}
        button.addEventListener("click", selectAnswer);
    })   
}

//återställer sidan för nästa fråga samt gömmer nästa knappen och tar bort gamla svarknappar

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


//denna funktion körs när man trycker på ett svar den kontrollerar om det var rätt eller fel
//och ändrar på färg och uppdaterar poängen samt visar vilket svar var fel

function selectAnswer(e) {
    const selectedBtn = e.target;

    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

//denna gör så att när quizet är klart så kan man se sina poäng och den gör 
// så att du kan starta om quizet

function showScore() {
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play again";
    nextButton.style.display = "block";
}

//denna tar hand om vad som händer när man går visare den ökar frågeindexet
//om frågor finns kvar visar den nästa fråga annars visar den poängen

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }}


    //detta äör en händelselyssnare för knappen nästa
    //om det finns fler frågor visas nästa fråga annars startas quizet om


nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

//startar quizet när sidan laddas

startQuiz();

