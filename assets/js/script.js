// Variables
var startQuizDiv = document.getElementById("welcome");
var startQuizButton = document.getElementById("startbtn");
var quizTimer = document.getElementById("timer");
var quizBody = document.getElementById("quiz");
var questionsEl = document.getElementById("questions");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");

// High Score Variables
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
//button variables
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Quiz question object
var quizQuestions = [{
    question: "Inside which HTML element do we put the JavaScript?",
    choiceA: "div",
    choiceB: "js",
    choiceC: "script",
    choiceD: "JavaScript",
    correctAnswer: "c"},
   {
    question: "Using _______ statement is how you test for a specific condition?",
    choiceA: "Choose",
    choiceB: "If",
    choiceC: "Else",
    choiceD: "Select",
    correctAnswer: "b"},
    {
    question: "JavaScript entities start with _____and end with______.?",
    choiceA: "Ampersand, semicolon",
    choiceB: "semicolon, Ampersand",
    choiceC: "Colon, Semicolon",
    choiceD: "No entities are needed",
    correctAnswer: "a"},
    {
    question: "Which one of these HTML Drag and Drop API events signifies the drag event is over?",
    choiceA: "dragend",
    choiceB: "dragexit",
    choiceC: "dragleave",
    choiceD: "None of the above",
    correctAnswer: "a"},  
    {
    question: "What does the API 'DOM' stand for?",
    choiceA: "Direct Oriented Match",
    choiceB: "Discrete Open Model",
    choiceC: "Document Object Model",
    choiceD: "Digital Object Method",
    correctAnswer: "c"},
    {
    question: "Which of the following is the correct syntax to display an alert box using js?",
    choiceA: "alertbox('Test')",
    choiceB: "msg('Test')",
    choiceC: "Test: alert;",
    choiceD: "alert('Test')",
    correctAnswer: "d"},
    {
    question: "The unordered collection of properties, each of which has a name and a value is called?",
    choiceA: "String",
    choiceB: "Object",
    choiceC: "Both A and B",
    choiceD: "None of the above",
    correctAnswer: "b"},
    {
    question: "What is the output of the following: var grand_Total=eval('10*10+5');?",
    choiceA: "10*10+5",
    choiceB: "105 as an integer",
    choiceC: "105 as an integer value",
    choiceD: "The limit does not exist",
    correctAnswer: "c"},
    
    ];
// Other variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;
var correct;

// Cycles through the object quiz array to generate the questions and answers.
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Welcome to Quiz.
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}
// Results page
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}


// HighScore Board
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
    }
});

// Highscore list
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// Display high score page
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// Clear highscore
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// Replay Quiz
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// Checks answer responses
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display if answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display if answer is wrong.
    }else{
        showScore();
    }
}

// Starts the quiz!
startQuizButton.addEventListener("click",startQuiz);