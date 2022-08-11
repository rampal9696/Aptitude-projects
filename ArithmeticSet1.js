// CREATE A QUIZ CLASS
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}

// Create a question Class
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

// NOW DISPLAY THE QUESTIONS
function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // show options
        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

// GUESS ANSWER
function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
};

// SHOW QUIZ PROGRESS
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let XElement = document.getElementById("x");
    XElement.innerHTML =`${currentQuestionNumber} .`;
    // let YElement = document.getElementById("y");
    // YElement.innerHTML =`${quiz.questions.length}`;
    // let ProgressElement = document.getElementById("progress");
    // ProgressElement.innerHTML =
    //     `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
};

// SHOW SCORES
function showScores() {
    let quizEndHTML =
        `
        <div class="row result-sub">
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
            <div class="card result-card">
            <h1 class="span-2" style="margin-bottom:50px">Quiz Completed</h1>
             <h3 id='score' class='span-1'> Your scored: ${quiz.score} of ${quiz.questions.length}</h3>
              <div class="quiz-repeat" style="margin-top:50px;text-align:center">
                 <a href="../index.html">Take Quiz Again</a>
              </div>
            </div>
         </div>
       </div>
    
    `;

    // <div class="row">
    //     <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
    //         <div class="card">
    //         <h1 class="h1">Quiz Completed</h1>
    //          <h2 id='score'> Your scored: ${quiz.score} of ${quiz.questions.length}</h2>
    //           <div class="quiz-repeat">
    //              <a href="../index.html">Take Quiz Again</a>
    //           </div>
    //         </div>
    //     </div>
    // </div>
    let quizElement = document.getElementById("result");
    quizElement.innerHTML = quizEndHTML;
};

// create questions here
let questions = [
    new Question(
        "60 किमी/घण्टा की चाल से चल रही एक रेलगाड़ी एक खम्भे को 9 सेकण्ड में पार करती है । ट्रेन की लंबाई कितनी है ?",
         ["150 metres", "324 metres", "180 metres", "120 metres"], 
         "150 metres"
    ),
    new Question(
        "125 मीटर लंबी एक ट्रेन उसी दिशा में 5 किमी/घंटा की गति से चल रहे एक व्यक्ति को 10 सेकंड में पार कर जाती है। ट्रेन की गति है । ", 
        ["50 km/hr", "47 km/hr", "48 km/hr", "46 km/hr"], 
        "50 km/hr"
    ),
    new Question(
        "एक ट्रेन एक स्टेशन के प्लेटफॉर्म को 36 सेकंड में और प्लेटफॉर्म पर खड़े एक व्यक्ति को 20 सेकंड में पार करती है। यदि ट्रेन की गति 54 किमी/घंटा है, तो प्लेटफॉर्म की लंबाई क्या है ?", 
        ["120 m", "300 m", "320 m", "240"], 
        "240"
    ),
    new Question(
        "240 मीटर लंबी एक ट्रेन 24 सेकंड में एक पोल को पार करती है। 650 मीटर लंबे प्लेटफॉर्म को पार करने में उसे कितना समय लगेगा ?", 
        ["150 sec", "100 sec", "89 sec", "67 sec"],
        "89 sec"
    ),
    new Question(
        "दो ट्रेनें विपरीत दिशाओं में 60 किमी/घंटा और 90 किमी/घंटा की गति से चल रही हैं। इनकी लंबाई क्रमश: 1.10 किमी और 0.9 किमी है। धीमी ट्रेन द्वारा तेज ट्रेन को सेकंड में पार करने में लिया गया समय है :", 
        ["49 sec", "67 sec", "48 sec", "66 sec"], 
        "48"
    )
];

// INITIALIZE quiz
let quiz = new Quiz(questions);

// display questions
displayQuestion();


// Add A CountDown for the Quiz
let time = 10;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown() {
    let quizTimer = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `${min} : ${sec}`;
        }
    }, 1000);
}

startCountdown();