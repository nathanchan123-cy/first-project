//DOM ELEMENTS
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalscoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            {text: "London", correct: false},
            {text: "Berlin", correct: false},
            {text: "Paris", correct: true},
            {text: "Madrid", correct: false},
        ],
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            {text: "Go", correct: false},
            {text: "Gd", correct: false},
            {text: "Au", correct: true},
            {text: "Ag", correct: false},
        ],
    },
    {
        question: "Which of these is not a programming language?",
        answers: [
            {text: "Java", correct: false},
            {text: "Python", correct: false},
            {text: "Banana", correct: true},
            {text: "JavaScript", correct: false},
        ],
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            {text: "Atlantic Ocean", correct: false},
            {text: "Indian Ocean", correct: false},
            {text: "Arctic Ocean", correct: false},
            {text: "Pacific Ocean", correct: true},

        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            {text: "Venus", correct: false},
            {text: "Mars", correct: true},
            {text: "Jupiter", correct: false},
            {text: "Saturn", correct: false},

        ]
    },
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false 
/* answersDisabled: if you click the right answer, then immediately click again, 
the score will increment and this prevents this bug */

totalQuestionsSpan.textContent = quizQuestions.length; /*.textContent: used to get or set raw
text content of html element; quizQuestions is the array, length is number of questions*/

maxScoreSpan.textContent = quizQuestions.length;

//event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);


function startQuiz(){
//resetting the variables
    currentQuestionIndex = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion(){
    //reset state as well;
    answersDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = ""; //innerHTML lets you change content like a header from js

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        //dataset is a button element that allows you to store custom data
        button.dataset.correct = answer.correct; 

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    });
}
//when you attach an event listener, it will by default get an argument called event
function selectAnswer(event){
    //optimization check
    if(answersDisabled) return;

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true"; //lowk you need to look up what === means

    Array.from(answersContainer.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        } else{
            button.classList.add("incorrect");
        }
    });

    if(isCorrect){
            score++;
            scoreSpan.textContent = score;
    }

    
    setTimeout(() => {
        currentQuestionIndex++;

        //this is checking if there are more questions/if quiz is over
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion();
        } else{
            showResults();
        }
    },1000)
}

function showResults(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalscoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100;

   if(percentage === 100){
    resultMessage.textContent = "nice";
   } else if(percentage >= 80){
    resultMessage.textContent = "B";
   } else if(percentage >= 60){
    resultMessage.textContent = "bruh cmon now";
   } else if(percentage >= 40){
    resultMessage.textContent = "If you don't improve you are going to the gas chamber";
   } else{
    resultMessage.textContent = "Are you stupid";
   }
}

function restartQuiz(){
    resultScreen.classList.remove("active");
    startQuiz();
}